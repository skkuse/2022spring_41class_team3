from socket import *
import threading
import sys

clntskts = []
clntnames = {}

def clnt_recv(clntskt) :
    while(1):
        msg = clntskt.recv(100).decode('utf-8')
        if msg == 'disconnect' :
            clntskts.remove(clntskt)
            for skt in clntskts :
                skt.send((clntnames[clntskt] + '님이 나가셨습니다.').encode('utf-8'))
            print(clntnames[clntskt] + '님이 나가셨습니다.')
            break
        
        for skt in clntskts :
            skt.send(msg.encode('utf-8'))
        print(msg)

servskt = socket(AF_INET, SOCK_STREAM)
servskt.bind(('', 8080))
servskt.listen(1)

while(1) :
    clntskt, addr = servskt.accept()
    clntname = clntskt.recv(100).decode('utf-8')
    for skt in clntskts :
        skt.send((clntname + '님이 접속하셨습니다.').encode('utf-8'))
    print(clntname + '님이 접속하셨습니다.')
    clntskts.append(clntskt)
    clntnames[clntskt] = clntname
    thread = threading.Thread(target = clnt_recv, args = (clntskt,))
    thread.start()