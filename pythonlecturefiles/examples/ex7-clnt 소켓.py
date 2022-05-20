from socket import *

clntskt = socket(AF_INET, SOCK_STREAM)  # TCP , IPv4로 클라이언트 소켓 생성 
clntskt.connect(('127.0.0.1', 8080))    # 루프백 IP, 포트 번호 8080로 소켓 할당

message = input()                       # 메시지를 입력받음
clntskt.send(message.encode('utf-8'))   # 메시지를 서버에 전송