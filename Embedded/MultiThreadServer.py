import threading
import socket
import sys, errno

HOST = "70.12.226.153"
PORT = 12345

sema = threading.Semaphore(10)
th = []


def to_client(conn, addr):

    print(addr)
    print("%s connect" %(addr[0]))

    while True:
        confirm_msg = addr[0] + " connect with RPi"
        print(confirm_msg)
        conn.send(confirm_msg.encode())

        try:
            while True:
                data = conn.recv(6000)
                print("[%s send] %s" %(addr[0], data.decode()))

                reply = ""

                if data.decode() == "LED ON":
                    reply = "LED ON"
                    conn.send(reply.encode())

                elif data.decode() == "LED OFF":
                    reply = "LED OFF"
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
