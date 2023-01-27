import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

# GPIO Setting
for i in range(2, 6):
    GPIO.setup(i, GPIO.OUT)

"""
# Test Code
for i in range(2, 6):
    GPIO.output(i, True)
    time.sleep(1)
    GPIO.output(i, False)
    time.sleep(1)
"""

class Dispenser:
    def __init__(self):
        print("constructor!")

    def __del__(self):
        print("destructor!")

    def MotorControl(self, idx, sec):
        GPIO.output(idx, True)
        print(f"GPIO {idx} ON")
        time.sleep(sec)
        GPIO.output(idx, False)
        print(f"GPIO {idx} OFF")

# Create Dispenser Object 
dispenser = Dispenser()

while True:
    idx, sec = map(int, input().split())
    dispenser.MotorControl(idx, sec)
