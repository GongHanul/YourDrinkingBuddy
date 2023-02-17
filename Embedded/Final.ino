#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ArduinoJson.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <Hash.h>
#include <Wire.h>
#include <Adafruit_ADS1X15.h>

Adafruit_ADS1115 ads1115;

#define SSID "MULTI_GUEST_2"
#define PASSWORD "guest1357"  
#define IP "70.12.226.153"
#define PORT 3000 /* port*/
#define debounceTime 100 //unit: ms
#define DELAY 120

float adc1;
float old_adc;
//myIP "70.12.230.26" to check
//playerid 4
//sound sensor
int sound_set=0;
int sound_cnt=0;
int sound_setChange=0;
// HRT factor
double hrt_alpha = 0.75; // sensor refined
int hrt_period = 100;
static double hrt_oldValue = 0;
static double hrt_oldInterval = 0;
int hrt_flag = 0; // derivatives
int hrt_now = 0;
int hrt_next = 0;
int hrt_interval = 0;
int hrt_oldcnt=0;
int hrt_sum = 0;
int hrt_num = 0;
int hrt_value = 0;
int hrt_re = 0;
int hrt_zero = 0;
int equalcnt=0;
int randArray[13]={1,2,-1,0,-1,0,-1,0,-2,1,0,1,0};

//GameTimer
volatile unsigned long startTime = 0;
volatile unsigned long lastTime = -1;
// game value
volatile int max_val = 0;
volatile int mean_val = 0;
volatile int min_val = 0;
volatile int gap_val = 0;
volatile int cnt_val = 0;
int game_con = 0;
int hrt_con = 0;
// game_ing 1: HRT, 3: BTN2 4:SND
int gameIng = 0;

//JOYPAD BUTTON VALUE
volatile int value2 = 0;
volatile int value3 = 0;
volatile int value4 = 0;
volatile int value5 = 0;
const int buttonPin2 = 16; //JOYPAD BUTTON PIN
const int buttonPin3 = 5;
const int buttonPin4 = 4;
const int buttonPin5 = 14;

volatile unsigned long now = 0;

// gameData
int score[100];
char sendData[100];

ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;


void makeJson_realTime(int avalue)
{
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    
    if (gameIng == 4) array.add("arduino:sndLoop");
    else if (gameIng == 6) array.add("arduino:timeUpload");
    else if (gameIng == 3) array.add("arduino:btnUpload");

    JsonObject param1 = array.createNestedObject();
    param1["count"] = avalue;

    String output;
    serializeJson(doc, output);

    delay(100);
    socketIO.sendEVENT(output);
    delay(100);
    Serial.println(output);
}

void makeJson_checkCNNT()
{
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>(); 
    array.add("arduino:checkServerCnnt");
    String output;
    serializeJson(doc, output);

    delay(100);
    socketIO.sendEVENT(output);
    delay(100);
    Serial.println(output);
}

//json 담아주기.
void makeJson_result(int avalue, int bvalue, int cvalue, int dvalue, int evalue)
{
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    if (gameIng == 1)
    {
      array.add("arduino:hrtLoop");
    }
    else if (gameIng == 4) array.add("arduino:sndLoop");
    //dispenser
    //else if (gameIng == 2 ) array.add("arduino:makeCocktail");
    JsonObject param1 = array.createNestedObject();
    if(gameIng==1)
    {
      param1["max"] = avalue;
      param1["mean"] = bvalue;
      param1["min"] = cvalue;
      param1["gap"] = dvalue;
      param1["countbpm"] = evalue;
    }
    else if(gameIng==4)
    {
      param1["max"] = avalue;
      param1["mean"] = bvalue;
      param1["min"] = cvalue;
      param1["gap"] = dvalue;
      param1["count"] = evalue;
    }
    else if(gameIng==5) {
      param1["fst"] = avalue;
      param1["sec"] = bvalue;
      param1["thd"] = cvalue;
      param1["fth"] = dvalue;
      param1["count"] = evalue;
    }
    String output;
    serializeJson(doc, output);

    delay(100);
    socketIO.sendEVENT(output);
    delay(100);
    Serial.println(output);
}

void hrt_game_setting()
{
    while (now <= startTime + 10000) {
        if (hrt_con == 0) {
            Serial.println("setting 임의 종료");
            return;
        }
        ESP.wdtDisable();
        double rawValue = ads1115.readADC_SingleEnded(0);
        double value = hrt_alpha * hrt_oldValue + (1 - hrt_alpha) * rawValue;
        //hrt_flag > 0 이면 이전 변화량은 +, 지금 변화량이 0이하면 peak로 판단한다. 
        Serial.print("interval: ");
        Serial.println(millis() - hrt_now);

        if (hrt_flag > 0 && (value - hrt_oldValue) <= 0) {
            //시간을 기록한다.
            hrt_next = millis();
            int interval = hrt_next - hrt_now;
            Serial.print("interval");
            Serial.println(interval);
            hrt_now = hrt_next;
            if (interval > 520) {
                //interval 1000 == 맥박 60
                if (interval < 900) {
                    if (hrt_oldInterval > 0) {
                        if (60000 / hrt_oldInterval - 60000 / interval < -5 || 60000 / hrt_oldInterval - 60000 / interval > 5) {
                            hrt_re++;
                            if (hrt_re > 2) {
                                hrt_re = 0;
                                hrt_oldInterval = interval;
                            }
                            continue;
                        }
                        //interval의 차이가 5이하라면 cnt_val
                        else {
                            hrt_re = 0;
                            cnt_val = 60000 / interval;
                        }
                    }
                    hrt_oldInterval = interval;
                }
            }
        }
        // 증+ 감- 저장
        if (value - hrt_oldValue > 0) hrt_flag = 1;
        if (value - hrt_oldValue <= 0) hrt_flag = -1;
        hrt_oldValue = value;
        Serial.print("cntvalue");
        Serial.println(cnt_val);
        delay(hrt_period);
        max_val = cnt_val;
        min_val = cnt_val;
        gap_val = 0;
        mean_val = cnt_val;
        hrt_oldcnt = cnt_val;
        now = millis();
    }
    
    makeJson_result(max_val, mean_val, min_val, gap_val, cnt_val);
    ESP.wdtEnable(1000);
}

void hrt_game()
{
  if (hrt_con == 0)
        {
            Serial.println("게임 임의 종료");
            return;
        }
    hrt_zero=0;
    while (now <= startTime + 2000)
    {
        if (hrt_con == 0)
        {
            Serial.println("게임 임의 종료");
            return;
        }
        ESP.wdtDisable();
        double rawValue = ads1115.readADC_SingleEnded(0);
        double value = hrt_alpha * hrt_oldValue + (1 - hrt_alpha) * rawValue;
        //hrt_flag > 0 이면 이전 변화량은 +, 지금 변화량이 0이하면 peak로 판단한다. 


        if (hrt_flag > 0 && (value - hrt_oldValue) <= 0)
        {
            //시간을 기록한다.
            hrt_next = millis();
            int interval = hrt_next - hrt_now;
            Serial.print("check interval");
            Serial.println(interval);

            if (hrt_now > 0)
            {
                if ((cnt_val - 60000 / interval) > -5 && (cnt_val - 60000 / interval) < 5)
                {
                    //유의미한 interval만 선별한다.
                    //interval 400 == 맥박 140 
                    if (interval > 520)
                    {
                        //interval 850 == 맥박 70
                        if (interval < 850)
                        {
                            hrt_num++;
                            Serial.print("cnt_val ");
                            Serial.println(cnt_val);
                            cnt_val = 60000 / interval;
                            hrt_sum += cnt_val;
                            hrt_zero=0;
                            
                        }
                        else hrt_zero++;
                    }
                    else hrt_zero++;
                }
            }
            hrt_now = hrt_next;
        }
        mean_val = cnt_val;
        if (hrt_num > 0)
        {
            mean_val = hrt_sum / hrt_num;
            Serial.print("hearbeat ");
            Serial.println(cnt_val);
        }
        // 증+ 감- 저장
        if (value - hrt_oldValue > 0) hrt_flag = 1;
        if (value - hrt_oldValue <= 0) hrt_flag = -1;
        hrt_oldValue = value;
        Serial.println(value);
        delay(hrt_period);
        now = millis();
    }
    if(cnt_val == hrt_oldcnt) 
    {
      int num = equalcnt%13;
      equalcnt++;
      cnt_val = cnt_val + randArray[num];
    }
    if (min_val > cnt_val || min_val == 0) min_val = cnt_val;
    if (max_val < cnt_val) max_val = cnt_val;
    gap_val = max_val - min_val;
    hrt_oldcnt=cnt_val;
    makeJson_result(max_val, mean_val, min_val, gap_val, cnt_val);
    ESP.wdtEnable(1000);
}

void sound_game()
{
    ESP.wdtDisable();
    if (game_con == 0) return;
    float adc1_set = ads1115.readADC_SingleEnded(0);
    adc1 = map(adc1_set, 0, 1024, 0, 200);
    if(old_adc == adc1) sound_set = adc1;
    Serial.print("adc");
    Serial.println(adc1);
    if(sound_set < adc1 && old_adc == adc1) sound_setChange++;
    else if (sound_set >adc1 && old_adc == adc1) sound_setChange++;
    else if (sound_set == adc1) sound_setChange=0;
    if(sound_setChange > 2) sound_set = adc1;
    if(adc1 >= sound_set+1 ) sound_cnt++;
    if(sound_set==0) sound_cnt=0;
    //Serial.print("sound_cnt");
    old_adc = adc1;
    Serial.println(sound_cnt);
    Serial.print(adc1);
    delay(100);
    makeJson_result(0, 0, 0 , 0, sound_cnt);
    //Serial.println("Sound Game End");
    ESP.wdtEnable(1000);
}

/*
void weight_game2(){
  // ESP.wdtDisable();
    int BTN_state = 0;
    if(game_con==0) return;
    now=millis();
    startTime=now;

    while (now <=startTime+5000 || cnt_val<3){
        if(game_con==0) return;
        
        int b2=0;
        int b3=0;
        int b4=0;
        int b5=0;
        ESP.wdtDisable();
        now = millis();
        if (now - lastTime > debounceTime){
            if (digitalRead(buttonPin2) == HIGH && digitalRead(buttonPin3) == HIGH && digitalRead(buttonPin4) == HIGH && digitalRead(buttonPin5) == HIGH) {
                if (BTN_state == 0) {
                    BTN_state = 1;
                }
            }
            if (digitalRead(buttonPin2) == LOW){
                if (BTN_state == 1) {
                    cnt_val++;
                    Serial.println(cnt_val);
                    BTN_state = 0;
                    b2=1;
                }
            }
            if (digitalRead(buttonPin3) == LOW){
                if (BTN_state == 1) {
                    cnt_val++;
                    Serial.println(cnt_val);
                    BTN_state = 0;
                    b3=1;
                }
            }
            if (digitalRead(buttonPin4) == LOW){
                if (BTN_state == 1) {
                    cnt_val++;
                    Serial.println(cnt_val);
                    BTN_state = 0;
                    b4=1;
                }
            }
            if (digitalRead(buttonPin5) == LOW){
                if (BTN_state == 1) {
                    cnt_val++;
                    Serial.println(cnt_val);
                    BTN_state = 0;
                    b5=1;
                }
            }
            if(cnt_val > 3) return;
            makeJson_result(b2, b3, b4, b5, cnt_val);
        }
    }
    Serial.println("ButtonCount Game End");
    ESP.wdtEnable(1000);
}
*/

// timecount 25초 안에 아무 버튼이나 눌렀을때 time 값이 rpi로 전달된다.
void timecount_game()
{
    // ESP.wdtDisable();
    delay(3000);
    startTime = millis();
    now = startTime;
    while (now <= startTime + 20000) {
        ESP.wdtDisable();
        if (game_con == 0) return;
        if (digitalRead(buttonPin2) == LOW || digitalRead(buttonPin3) == LOW || digitalRead(buttonPin4) == LOW || digitalRead(buttonPin5) == LOW) {
            cnt_val = millis() - startTime;
            Serial.println(cnt_val);
            makeJson_realTime(cnt_val);
            break;
        }
        now = millis();
    }
    Serial.println("Count Game End");
    ESP.wdtEnable(1000);
}

//BtnCount game
void joypad_game2()
{
    // ESP.wdtDisable();
    delay(3000);
    startTime = millis();
    now = startTime;
    int BTN_state = 0;
    while (now <= startTime + 20000)
    {
        if (game_con == 0) return;
        ESP.wdtDisable();
        now = millis();
        if (now - lastTime > debounceTime)
        {
            if (digitalRead(buttonPin2) == HIGH && digitalRead(buttonPin3) == HIGH && digitalRead(buttonPin4) == HIGH && digitalRead(buttonPin5) == HIGH) {
                if (BTN_state == 0) {
                    BTN_state = 1;
                }
            }
            if (digitalRead(buttonPin2) == LOW || digitalRead(buttonPin3) == LOW || digitalRead(buttonPin4) == LOW || digitalRead(buttonPin5) == LOW)
            {
                if (BTN_state == 1) {
                    cnt_val++;
                    Serial.println(cnt_val);
                    makeJson_realTime(cnt_val);
                    BTN_state = 0;
                }
            }
            lastTime = now;
        }
    }
    Serial.println("ButtonCount Game End");
    ESP.wdtEnable(1000);
}



void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length)
{
    switch (type) {
    case sIOtype_DISCONNECT:
        Serial.printf("[IOc] Disconnected!\n");
        break;
    case sIOtype_CONNECT:
        Serial.printf("[IOc] Connected to url: %s\n", payload);

        // join default namespace (no auto join in Socket.IO V3)
        socketIO.send(sIOtype_CONNECT, "/");
        break;
    case sIOtype_EVENT:
    {
        // arduino message received
        Serial.printf("[IOc] get event: %s\n", payload);
        String msg = (char*)payload;

        // ESP.wdtDisable();
        if (msg == "[\"server:checkControllerCNNT\",\"1\"]") {
            makeJson_checkCNNT();
        }
        else if (msg == "[\"server:createGame\",\"HRT\"]") {
            gameIng = 1;
            Serial.println("HRT Game Start");
            startTime = millis();
            now = startTime;
            hrt_con = 1;
            lastTime = -1;
            hrt_re = 0;
            hrt_next = 0;
            hrt_sum = 0;
            hrt_flag = 0;
            hrt_oldValue = 0;
            equalcnt=0;
            max_val = 0;
            min_val = 123123;
            mean_val = 0;
            gap_val = 0;
            cnt_val = 0;
            hrt_game_setting();
            Serial.println("HRT Setting End");
        }
        
        else if (msg == "[\"server:hrtLoop\",\"HRT1\"]") {
            gameIng = 1;
           if(cnt_val==0) cnt_val=89;
            hrt_sum = cnt_val;
            hrt_num = 1;
            Serial.println("HRT Game Start");
            startTime = millis();
            if(hrt_con==1)
            {
              hrt_game();
            }
            Serial.println("HRT Game Ing");
            hrt_value++;
            Serial.println(hrt_value);
        }
        else if (msg == "[\"server:hrtLoop\",\"HRT0\"]") {
            hrt_con = 0;
            Serial.println("HRT Game End");
        }
        
        else if (msg == "[\"server:createGame\",\"BTN1\"]") {
            //Time count game setting
            // 눌렀을 때 시간이 json 배열에서 cnt_val에 담겨 전송
            Serial.println("Time Count Start");
            
            gameIng=6;
            game_con = 1;
            cnt_val = 0;
            lastTime = -1;
            //BTN count game start
            timecount_game();
        }
        else if (msg == "[\"server:createGame\",\"BTN2\"]") {
            //BTN count game for 5sec setting
            // 5초동안 누른 버튼 카운트가 json "count"에 담겨 전송
            game_con = 1;
            Serial.println("Button Count Start");
            startTime = millis();
            gameIng = 3;
            now = startTime;
            cnt_val = 0;
            lastTime = -1;
            //BTN count game start
            joypad_game2();
        }
        // sound 게임은 턴제로 운영 뒤에 숫자는 playerid;
        else if (msg == "[\"server:createGame\",\"SND3\"]") {
            //sound 게임 세팅
            gameIng = 4;
            game_con = 1;
            Serial.println("Sound Game Start");
            sound_cnt=0;
            sound_setChange=0;
            old_adc=0;
            sound_set=0;
            //sound 게임 시작
            sound_game();
        }
        else if (msg == "[\"server:sndLoop\",\"SND1\"]") {
            Serial.println("SND Loop Start");
            sound_game();
            Serial.println("SND Game Ing");
        }
        else if (msg == "[\"server:sndLoop\",\"SND0\"]") {
            game_con = 0;
            Serial.println("SND Game End / Send to Result");
        }
        else if (msg == "[\"server:exitController\",\"0\"]") {
            game_con = 0;
            hrt_con=0;
        }
        // dispenser 게임은 턴제로 운영 뒤에 숫자는 playerid;
        // else if(msg == "[\"server:createGame\",\"WGT4\"]"){
        //       //BTN count game for 5sec setting
        //       // 5초동안 누른 버튼 카운트가 json "count"에 담겨 전송
        //       Serial.println("Weight Matching Start");
        //       startTime = millis();
        //       now = startTime;
        //       game_con=1;
        //       gameIng=2;
        //       lastTime=-1;
        //       cnt_val=0;
        //       weight_game2(); 
        //     }
        break;
    }
    case sIOtype_ACK:
        Serial.printf("[IOc] get ack: %u\n", length);
        hexdump(payload, length);
        break;
    case sIOtype_ERROR:
        Serial.printf("[IOc] get error: %u\n", length);
        hexdump(payload, length);
        break;
    case sIOtype_BINARY_EVENT:
        Serial.printf("[IOc] get binary: %u\n", length);
        hexdump(payload, length);
        break;
    case sIOtype_BINARY_ACK:
        Serial.printf("[IOc] get binary ack: %u\n", length);
        hexdump(payload, length);
        break;
    }
}

// arduino ide serial monitor line ending / 9600
void setup()
{
    //joypad
    pinMode(buttonPin2, INPUT_PULLUP);
    pinMode(buttonPin3, INPUT_PULLUP);
    pinMode(buttonPin4, INPUT_PULLUP);
    pinMode(buttonPin5, INPUT_PULLUP);

    Serial.begin(115200);
    //Serial.begin(9600);
    ads1115.begin();
    ads1115.setGain(GAIN_TWOTHIRDS);

    Serial.setDebugOutput(true);

    Serial.println();
    Serial.println();
    Serial.println();

    // 여기에 넣으면 계속 시작됨..
    // ESP.wdtDisable();

    for (uint8_t t = 4; t > 0; t--) {
        Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
        Serial.flush();
        delay(1000);
    }
    // disable AP
    if (WiFi.getMode() & WIFI_AP) {
        WiFi.softAPdisconnect(true);
    }

    WiFiMulti.addAP(SSID, PASSWORD);

    //WiFi.disconnect();
    while (WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }
    String ip = WiFi.localIP().toString();
    Serial.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

    // server address, port and URL
    //socketIO.begin(IP, PORT);
    socketIO.begin(IP, PORT, "/socket.io/?EIO=4");

    // event handler
    socketIO.onEvent(socketIOEvent);
}

void loop()
{  
    socketIO.loop();
}