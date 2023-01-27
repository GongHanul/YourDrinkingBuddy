#include "ESP8266.h"
#include <SoftwareSerial.h> 
#define SSID "MULTI_GUEST_2"
#define PASSWORD "guest1357"  
#define HOST_NAME "70.12.226.153"
#define HOST_PORT 12345 /* port*/
#define MY_NAME "PLAYER1"
#define LED 1 /* LED GPIO*/

SoftwareSerial esp(12, 13); /* RX:D2, TX:D3 */
ESP8266 wifi(esp, 9600);
char led[3]="";
char onff[3]="";
bool isConnected = false;

// 라즈베리 파이 송신 시, LED 켜지는 코드.
// INTERRUPT로 LED ON 보내는 코드로 수정 필요
char usage[]= "LED ON";

//joypad
/*
const int buttonPin2 = 2;
const int buttonPin3 = 3;
const int buttonPin4 = 4;
const int buttonPin5 = 5;

int X = analogRead(0);
int Y = analogRead(1);  
*/

void setup(void)
{
  pinMode(10, OUTPUT);
  /*joypad
  pinMode(buttonPin2, INPUT_PULLUP);
  pinMode(buttonPin3, INPUT_PULLUP);
  pinMode(buttonPin4, INPUT_PULLUP);
  pinMode(buttonPin5, INPUT_PULLUP);
  */
  
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

// 
void parseAndPrint(char *data)
{
  sscanf(data, "%s%s", &led, &onff);
  char buffer1[30];
  sprintf(buffer1, "led:%s on:%s", led,onff);
  Serial.println(buffer1);
}

uint8_t buffercpy[128] = {};

void loop(void)
{
  uint8_t buffer[128] = {};
  uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
  /* joypad
  int buttonValue2 = digitalRead(2);
  int buttonValue3 = digitalRead(3);
  int buttonValue4 = digitalRead(4);
  int buttonValue5 = digitalRead(5);
  */
  // rpi로부터 LED ON 받으면 LED ON
  if (!strcmp(led,"LED") && !strcmp(onff, "ON"))
  {
    digitalWrite(10, HIGH);
    delay(1000);
  }
  // rpi로부터 LED OFF 받으면 LED OFF
  if (!strcmp(led,"LED") && !strcmp(onff, "OFF"))
  {
    digitalWrite(10, LOW);
    delay(1000);
  }
  
  if (len > 0){
    Serial.print("Received:[");
    /*
    for (uint32_t i = 0; i < len-1; i++) {
      Serial.print((char)buffer[i]);
    }*/
    parseAndPrint(buffer);
    Serial.print("]\r\n");
  }
}