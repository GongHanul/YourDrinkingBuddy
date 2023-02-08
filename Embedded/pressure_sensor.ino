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
#define PRESSURE A0

volatile unsigned long startTime = 0;
volatile unsigned long lastTime = -1;
volatile unsigned long now = 0;

volatile int max_val=0;

int score[100];
char sendData[100];

ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;

//json 담아주기.
void makeJson_realTime(int avalue) {
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  array.add("upload");

  JsonObject param1 = array.createNestedObject();
  param1["max"] = avalue;

  String output;
  serializeJson(doc, output);

  delay(100);
  socketIO.sendEVENT(output);
  delay(100);
  Serial.println(output);
}

void weight_game1(){
  max_val = 0;
  int final_pres_val = 150;
  while(now <= startTime + 60000){
    ESP.wdtDisable();
    int pres_sensor = analogRead(PRESSURE);
    int pres_val = map(pres_sensor, 0, 1024, 0, 255);
    if(max_val<pres_val){
      max_val = pres_val;
      Serial.println(max_val);
      if(max_val>final_pres_val){
        break;
      }
    }
    now = millis();
  }
  makeJson_realTime(max_val);
  Serial.println("Full of Weight Game End");
  ESP.wdtEnable(1000);

}

void weight_game2(){


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

            else if(msg == "[\"chat message\",\"WGT1\"]"){
              //Time count game setting
              // 눌렀을 때 시간이 json 배열에서 cnt_val에 담겨 전송
              Serial.println("Full of Weight Start");
              startTime = millis();
              now = startTime;
              lastTime = -1;
              //BTN count game start
              weight_game1();
            }

            else if(msg == "[\"chat message\",\"WGT2\"]"){
              //BTN count game for 5sec setting
              // 5초동안 누른 버튼 카운트가 json "count"에 담겨 전송
              Serial.println("Weight Matching Start");
              startTime = millis();
              now = startTime;
              cnt_val=0;
              lastTime=-1;
              //BTN count game start
              weight_game2();
            }
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

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);

  Serial.println();
  Serial.println();
  Serial.println();

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