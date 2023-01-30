# 최근 업데이트 2023.01.19 (목)

import threading
import socket
import sys, errno
import json

HOST = "70.12.246.22"
PORT = 12345

playernum=0
sema = threading.Semaphore(10)
th = []
game_mode= {'0':'BTN', '1': 'SND', '2': 'HRT', '3': 'WGT', '4': 'ETC'}
list = []
player_dict={}
def to_client(conn, addr):

    print(addr)
    print("%s connect" %(addr[0]))
    global playernum
    while True:
        confirm_msg = f'{addr[0]} connect with RPi'
        conn.send(confirm_msg.encode())
        # 새로운 ip에 playernum 지정
        if f'{addr[0]}' not in player_dict:
             player_dict[addr[0]] = playernum
            #  print(addr[0], playernum)
             playernum+=1
             
        # print(game_mode['BTN'])
        # Frontend에서 값을 받아 게임 id 값을 넣어준다.
        conn.send(game_mode['0'].encode())

        try:
            while True:
                data = conn.recv(6000)
                data = data.decode()
                # header / body 분리
                header = data[:3]
                body = data[3:]
                print("header type: ", data[0])
                print("message leng: ", 256 * data[1] + data[2])
                
                # json to dict
                di = eval(str(body))

                print("read-bodylen: ", len(data[3:]))
                print("body : ", di)
                reply = ""
                
                if data.decode() == "BTN":
                    reply = "1"
                    conn.send(reply.encode())

                elif data.decode() == "2":
                    reply = "HI!"
                    conn.send(reply.encode())

                else:
                    reply = "Unknown"
                    conn.send(reply.encode())
                        
        except IOError as e:
            print("%s exit" %addr[0])
            if e.errno == errno.EPIPE:
                print("%s exit" %addr[0])
            

# server socket init
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print("socket created")

# socket error
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# socket bind
try:
    server_socket.bind((HOST, PORT))
except:
    print("Bind failed")

server_socket.listen(1)
print("socket awaiting messages")

while True:
    (conn, addr) = server_socket.accept()
    print("connected")
    sema.acquire();sema.release()
    client = threading.Thread(target=to_client, args=(conn, addr))
    client.start()
    th.append(client)

for t in th:
    t.join()