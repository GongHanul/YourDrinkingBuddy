#include "ESP8266.h"
#include <SoftwareSerial.h>
#include <avr/interrupt.h>
#include <util/delay.h>
#define SSID "MULTI_GUEST_2"
#define PASSWORD "guest1357"  
#define HOST_NAME "70.12.226.153"
#define HOST_PORT 12345 /* port*/
#define MY_NAME "PLAYER1"
#define LED 10 /* LED GPIO*/
#define debounceTime 100 //unit: ms
#define delay 150

SoftwareSerial esp(12, 13); /* RX:D2, TX:D3 */
ESP8266 wifi(esp, 9600);
//char led[3]="";
//char onff[3]="";
bool isConnected = false;
char usage[]= "LED ON";

volatile int chat_value=0;
//JOYPAD BUTTON VALUE
volatile int value2 = 0;
volatile int value3 = 0;
volatile int value4 = 0;
volatile int value5 = 0;

//JOYPAD BUTTON PIN
const int buttonPin2 = 2;
const int buttonPin3 = 3;
const int buttonPin4 = 4;
const int buttonPin5 = 5;

void setup(void)
{
  //joypad
  pinMode(buttonPin2, INPUT_PULLUP);
  pinMode(buttonPin3, INPUT_PULLUP);
  pinMode(buttonPin4, INPUT_PULLUP);
  pinMode(buttonPin5, INPUT_PULLUP);
  
  //interrupt for joypad
  PCICR |= 0b00000100;  // turn on portD
  PCMSK2 |= 0b00111100; // turn on joy key pad pin)  

  //for debug when try to connect with rpi4
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

  //continuous try until connection complete
  if (isConnected == false){
    while(1){
      if(wifi.createTCP(HOST_NAME, HOST_PORT)) {
        Serial.print("create tcp ok\r\n");
        isConnected = true;
        //wifi.send(usage, strlen(usage));
        break;
      } else {
        Serial.print("create tcp err\r\n");
      }
    }
  }
}

//data parsing
/*
void parseAndPrint(char *data)
{
  sscanf(data, "%s%s", &led, &onff);
  char buffer1[30];
  sprintf(buffer1, "led:%s on:%s", led,onff);
  Serial.println(buffer1);
}
*/
void loop(void)
{
  //data receive from rpi4
  uint8_t buffer[128] = {};
  uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
  
  if (len > 0){
    Serial.print("Received:[");
    for (uint32_t i = 0; i < len-1; i++) {
      Serial.print((char)buffer[i]);
    }
    //parsing data from rpi4
    //parseAndPrint(buffer);
    Serial.print("]\r\n");
  }
  
  /*
  if (!strcmp(onff, "ON") && !strcmp(led, "LED"))
  {
    digitalWrite(LED, HIGH);
    delay(1000);
  }
  if (!strcmp(onff, "OFF") && !strcmp(led, "LED"))
  {
    digitalWrite(LED, LOW);
    delay(1000);
  }
  */
}

ISR(PCINT2_vect)
{ 
    _delay_ms(delay);
  // when joypad ↑ key pressed
  if(digitalRead(2)==LOW)
  {
    // static unsigned long lastTime =0;
    // unsigned long now = millis();
    // if((now-lastTime)>debounceTime){
    //   //wifi.send(usage, strlen(usage));
    //   value2++;
    // }
    // lastTime = now;
    value2++;
    Serial.print("Button2 Clicked: ");
    Serial.println(value2);
    wifi.send(usage, strlen(usage));
  }
  
  if(digitalRead(3)==LOW)
  {
    value3++;
    Serial.print("Button3 Clicked: ");
    Serial.println(value3);
  }
  if(digitalRead(4)==LOW)
  {
    value4++;
    Serial.print("Button4 Clicked: ");
    Serial.println(value4);
  }
  if(digitalRead(5)==LOW)
  {
    value5++;
    Serial.print("Button5 Clicked: ");
    Serial.println(value5);
  }
  
}