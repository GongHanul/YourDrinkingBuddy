#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ArduinoJson.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <Hash.h>

#define SSID "MULTI_GUEST_2"
#define PASSWORD "guest1357"  
#define IP "70.12.246.24"
#define PORT 3000 /* port*/

#define debounceTime 100 //unit: ms
#define DELAY 120
#define SOUND A0
#define HRTBEAT A3

//sound sensor
volatile int sound_val=0;

// HRT factor
double hrt_alpha = 0.75; // sensor refined
int hrt_period = 100;
static double hrt_oldValue = 0;
int hrt_flag=0; // derivatives
int hrt_now =0;
int hrt_next=0;
int hrt_interval = 0;
int hrt_sum=0;
int hrt_num=0;

//GameTimer
volatile unsigned long startTime = 0;
volatile unsigned long lastTime = -1;
// game value
volatile int max_val=0;
volatile int mean_val=0;
volatile int min_val=0;
volatile int gap_val=0;
volatile int cnt_val=0;

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

//json 담아주기.
void makeJson_realTime(int avalue, int bvalue, int cvalue, int dvalue, int evalue) {
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  array.add("upload");

  JsonObject param1 = array.createNestedObject();
  param1["max"] = avalue;
  param1["mean"] = bvalue;
  param1["min"] = cvalue;
  param1["gap"] = dvalue;
  param1["count"] = evalue;

  String output;
  serializeJson(doc, output);

  delay(100);
  socketIO.sendEVENT(output);
  delay(100);
  Serial.println(output);
}

// void sound_game(uint64_t startTime){
//   ESP.wdtDisable();
//   while(now <= startTime + 5000){
//     Serial.print("Sound Value: ");
//     Serial.println(sound_val);
//     Serial.print("Max Value: ");
//     Serial.println(max_val);
//     sound_val = analogRead(SOUND);
//     if(sound_val>10){
//       Serial.println(sound_val);
//       if(max_val < sound_val) max_val=sound_val;
//     }
//     now = millis();
//   }
//   Serial.println(max_val);
//   makeJson_realTime(max_val, mean_val, min_val, gap_val, cnt_val);
//   Serial.println("Sound Game End");
//   ESP.wdtEnable(1000);
// }

// timecount 60초 안에 아무 버튼이나 눌렀을때 time 값이 rpi로 전달된다.
void joypad_game1() {
  // ESP.wdtDisable();
  while(now <= startTime + 65000){
    ESP.wdtDisable();
    if(digitalRead(buttonPin2)==LOW || digitalRead(buttonPin3)==LOW || digitalRead(buttonPin4)==LOW || digitalRead(buttonPin5)==LOW){
      cnt_val = millis() - startTime;
      Serial.println(cnt_val);
      break;
    }
    now = millis();
  }
  makeJson_realTime(max_val, mean_val, min_val, gap_val, cnt_val);
  Serial.println("Count Game End");
  ESP.wdtEnable(1000);
}

//BtnCount game
void joypad_game2() {
  // ESP.wdtDisable();
  int BTN_state = 0;
  while(now <= startTime + 10000)
  {
    ESP.wdtDisable();
    now = millis();
    if(now - lastTime > debounceTime)
    {
      if(digitalRead(buttonPin2)==HIGH && digitalRead(buttonPin3)==HIGH && digitalRead(buttonPin4)==HIGH && digitalRead(buttonPin5)==HIGH){
        if(BTN_state == 0){
          BTN_state = 1;
        }
      }
      if(digitalRead(buttonPin2)==LOW || digitalRead(buttonPin3)==LOW || digitalRead(buttonPin4)==LOW || digitalRead(buttonPin5)==LOW)
      {
        if(BTN_state == 1){
          cnt_val++;
          Serial.println(cnt_val);
          makeJson_realTime(max_val, mean_val, min_val, gap_val, cnt_val);
          BTN_state = 0;
        }
      }
      lastTime = now;
    }
  }
  Serial.println("ButtonCount Game End");
  ESP.wdtEnable(1000);
}



void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
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

            if(msg == "[\"chat message\",\"1\"]"){
              Serial.println("chatmessage '1' arrived");
            }

            else if(msg == "[\"chat message\",\"BTN1\"]"){
              //Time count game setting
              // 눌렀을 때 시간이 json 배열에서 cnt_val에 담겨 전송
              Serial.println("Time Count Start");
              startTime = millis();
              now = startTime;
              cnt_val = 0;
              lastTime = -1;
              //BTN count game start
              joypad_game1();
            }

            else if(msg == "[\"chat message\",\"BTN2\"]"){
              //BTN count game for 5sec setting
              // 5초동안 누른 버튼 카운트가 json "count"에 담겨 전송
              Serial.println("Button Count Start");
              startTime = millis();
              now=startTime;
              cnt_val=0;
              lastTime=-1;
              //BTN count game start
              joypad_game2();
            }
            //  else if(msg == "[\"chat message\",\"SND\"]"){
            //   //sound 게임 세팅
            //   Serial.println("Sound Game Start");
            //   startTime = millis();
            //   now=startTime;
            //   max_val=0;
            //   //sound 게임 시작
            //   sound_game();
            // }

            // ESP.restart();

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
void setup() {
    
    //joypad
    pinMode(buttonPin2, INPUT_PULLUP);
    pinMode(buttonPin3, INPUT_PULLUP);
    pinMode(buttonPin4, INPUT_PULLUP);
    pinMode(buttonPin5, INPUT_PULLUP);

    Serial.begin(115200);
    //Serial.begin(9600);

    Serial.setDebugOutput(true);

    Serial.println();
    Serial.println();
    Serial.println();

    // 여기에 넣으면 계속 시작됨..
    // ESP.wdtDisable();

      for(uint8_t t = 4; t > 0; t--) {
          Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
          Serial.flush();
          delay(1000);
      }
    // disable AP
    if(WiFi.getMode() & WIFI_AP) {
        WiFi.softAPdisconnect(true);
    }

    WiFiMulti.addAP(SSID, PASSWORD);

    //WiFi.disconnect();
    while(WiFiMulti.run() != WL_CONNECTED) {
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

unsigned long messageTimestamp = 0;
void loop() {
    socketIO.loop();
}