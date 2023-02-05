int sensorPin = 3;
double alpha = 0.75;
int period = 100;
volatile unsigned long now = 0;
volatile unsigned long startTime = 0;
volatile unsigned long lastTime = -1;

void setup ()
{
  Serial.begin (9600);
}
int len = 1;
static double oldValue = 0;
int hrt_flag = 0, hrt_last = 0, hrt_now = 0;
int hrt_num = 0, hrt_sum = 0;
int wait_time = 5;
void loop ()
{
  now = startTime;

  if(len>0){
    // 5s 동안 대기상태
    setting_bpm(wait_time);
    while(now <= startTime+wait_time+10000){
      start_bpm();
      // Serial.println(hrt_num);
      if(hrt_num>0){
        double hrt_mean = hrt_sum/hrt_num;
        int bpm = (60000)/hrt_mean;
        Serial.print("BPM: ");
        Serial.println(bpm);
      }
      else if(now >= 1000) Serial.println("Check sensor");
      delay(period);
    }
  }
  len = -1;

  
  // while(now <= startTime+15000){
  //   int rawValue = analogRead (sensorPin);
  //   double value = alpha * oldValue + (1 - alpha) * rawValue;
  //   if(hrt_flag == 1 && (value-oldValue)<=0){
  //     // Serial.println("check");
  //     hrt_now = millis();
  //     int interval = hrt_now - hrt_last;
  //     if(interval > 350){
  //       if(interval < 1300){
  //         hrt_num++;
  //         hrt_sum += interval;
  //       }
  //     }
  //     hrt_last = hrt_now;
  //   }

  //   if(value-oldValue > 0) hrt_flag = 1;
  //   else hrt_flag = -1;

  //   Serial.println (value);
  //   oldValue = value;
  //   now = millis();
  //   delay (period);
  // }
  // Serial.println(hrt_num);
  // if(hrt_num>0){
  //   double hrt_mean = hrt_sum/hrt_num;
  //   int bpm = (60000)/hrt_mean;
  //   Serial.print("BPM: ");
  //   Serial.println(bpm);
  // }
  // else Serial.println("Check sensor");
  // }
  // len = -1;
}
void start_bpm(){
  int rawValue = analogRead (sensorPin);
  double value = alpha * oldValue + (1 - alpha) * rawValue;
  if(hrt_flag == 1 && (value-oldValue)<=0){
    // Serial.println("check");
    hrt_now = millis();
    int interval = hrt_now - hrt_last;
    if(interval > 350){
      if(interval < 1300){
        hrt_num++;
        hrt_sum += interval;
      }
    }
    hrt_last = hrt_now;
  }

  if(value-oldValue > 0) hrt_flag = 1;
  else hrt_flag = -1;

  Serial.println (value);
  oldValue = value;
  now = millis();
}

void setting_bpm(int wt){
  int rawValue = analogRead(sensorPin);
  double value = alpha * oldValue + (1 - alpha) * rawValue;
  while(now <= startTime+(wt*1000)){
    Serial.println("before 5s");
    oldValue = value;
    delay(period);
    now = millis();
  }
}
