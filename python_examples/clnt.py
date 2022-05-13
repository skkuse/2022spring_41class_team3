from socket import *
import threading
import sys

def chatting_recv(clntskt):
    while(1):
        msg = clntskt.recv(100).decode('utf-8')
        print(msg)

def chatting_send(clntskt):
    while(1):
        msg = input()
        if msg == 'x' :
            clntskt.send('disconnect'.encode())
            clntskt.close()
            chatting = False
            print('서버와의 연결이 종료되었습니다.')
            sys.exit()
        else :
            clntskt.send((name + ' : ' + msg).encode('utf-8'))

print('채팅에서 사용할 이름을 입력해 주세요.')
name = input()

clntskt = socket(AF_INET, SOCK_STREAM)
clntskt.connect(('127.0.0.1', 8080))
clntskt.send(name.encode('utf-8'))

print('채팅 서버에 연결 완료되었습니다.')
print('채팅을 종료하시려면 \'x\'를 입력해주세요.')

thread1 = threading.Thread(target = chatting_recv, args = (clntskt,))
thread2 = threading.Thread(target = chatting_send, args = (clntskt,))

thread1.start()
thread2.start()
