#define SOUND A0

int vol = 0;
int count = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  vol = analogRead(SOUND);

  if(vol>50){
    count++;
    Serial.print("Voice: ");
    Serial.println(count);
    Serial.print("Mount: ");
    Serial.println(vol);
    delay(100);
  }
}
