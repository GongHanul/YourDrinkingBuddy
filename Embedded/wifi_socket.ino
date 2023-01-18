#include "ESP8266.h"

#include <SoftwareSerial.h> 

#define SSID "MULTI_GUEST_2"
#define PASSWORD "guest1357"
#define HOST_NAME "70.12.226.153"
#define HOST_PORT 12345 /* port*/
#define MY_NAME "PLAYER1"
#define LED 1 /* LED GPIO*/

SoftwareSerial esp(2, 3); /* RX:D2, TX:D3 */
ESP8266 wifi(esp, 9600);
char usage[]= "2";

void setup(void)
{
  pinMode(LED, OUTPUT);
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

  if(wifi.createTCP(HOST_NAME, HOST_PORT)){
    Serial.print("create tcp ok\r\n");
    wifi.send(usage, strlen(usage));
  }
  else{
    Serial.print("create tcp err\r\n");
  }
}
  bool isConnected = false;
  
char sayso[]= "nice";

void loop(void)
{

  uint8_t buffer[128] = {0};
  uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
  wifi.send(sayso, strlen(sayso));

  if (len > 0){
    Serial.print("Received:[");
    for (uint32_t i = 0; i < len-1; i++) {
      Serial.print((char)buffer[i]);
    }
    Serial.print("]\r\n");
    char cmd = buffer[0];
    int ledStatus = digitalRead(LED);
   }

}