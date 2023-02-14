#include "ESP8266.h"
#include <SoftwareSerial.h> 
#define SSID "MULTI_GUEST_2"
#define PASSWORD "guest1357"  
#define HOST_NAME "70.12.226.153"
#define HOST_PORT 12345 /* port*/
#define MY_NAME "PLAYER1"
#define LED 11 /* LED GPIO*/
#define debounceTime 100

SoftwareSerial esp(12, 13); /* RX:D2, TX:D3 */
ESP8266 wifi(esp, 9600);
extern volatile unsigned long timer0_millis; // initialize millis

bool isConnected = false;
char usage[]= "2";

const int BTN2 = 2;
const int BTN3 = 3;
volatile int value2 = 0;
volatile int value3 = 0;

void setup(void)
{
  pinMode(LED, OUTPUT);
  pinMode(BTN2, INPUT_PULLUP);
  pinMode(BTN3, INPUT_PULLUP);

  Serial.begin(9600);
  Serial.print("setup begin\r\n");

  Serial.print("FW Version:");
  Serial.println(wifi.getVersion().c_str());

  if(wifi.setOprToStation()){
    Serial.print("to station ok\r\n");
  } else {
    Serial.print("to station err\r\n");
  }

  if (wifi.joinAP(SSID, PASSWORD)) {
    Serial.print("Join AP success\r\n");
    Serial.print("IP: ");
    Serial.println(wifi.getLocalIP().c_str());
  } else {
    Serial.print("Join AP failure\r\n");
  }

  if (wifi.disableMUX()) {
    Serial.print("single ok\r\n");
  } else {
    Serial.print("single err\r\n");
  }

  Serial.print("setup end\r\n");

  if (isConnected == false){
    while(1){
      if(wifi.createTCP(HOST_NAME, HOST_PORT)) {
        Serial.print("create tcp ok\r\n");
        isConnected = true;
        wifi.send(usage, strlen(usage));
        break;
      } else {
        Serial.print("create tcp err\r\n");
      }
    }
  }
}

void loop(void)
{

  uint8_t buffer[128] = {};
  uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
  String str1 = "";
  if (len > 0){
    Serial.print("Received:[");
    for (uint32_t i = 0; i < len; i++) {
      Serial.print((char)buffer[i]);
      str1.concat((char)buffer[i]);
    }
    //parsing data from rpi4
    //parseAndPrint(buffer);
    Serial.print("]\r\n");

  }

  // thread 확인용 - 버튼 계속 누르고 있으면 값이 보내집니다.
  // char ans3[] = "Check";
  // Serial.println("Start");
  // if(digitalRead(2) == LOW){
  //   Serial.println("OK");
  //   wifi.send(ans3, strlen(ans3));
  // }
  // delay(1000);
  // Serial.println("END");


  Serial.println(str1);

  char ans1[] = "0";
  char ans2[] = "Check"
  if(str1.compareTo("BTN 1") == 0){
      Serial.println("OK");
      timer0_millis = 0;
    while(1){
      static unsigned long lastTime = 0;
      unsigned long now = millis();
      if(now > 10000) break;
      // Serial.println(now);
      if(digitalRead(2) == LOW){
        if((now-lastTime)>debounceTime){
          value2++;
          ans1[0] += 1;
          Serial.print("Button2 Clicked: ");
          Serial.println(value2);
          // Serial.println(ans1);
          wifi.send(ans1, strlen(ans1));
          if(value2>10){
            digitalWrite(LED, HIGH);
          }
        }
        lastTime = now;
      }
      else if(digitalRead(3) == LOW){
        if((now-lastTime)>debounceTime){
          value3++;
          wifi.send(ans2, strlen(ans2));
        }
        lastTime = now;
      }
    }
    Serial.print("BTN2: ");
    Serial.println(value2);
    Serial.print("BTN3: ");
    Serial.println(value3);
  }
  buffer[128] = {};
  

}
