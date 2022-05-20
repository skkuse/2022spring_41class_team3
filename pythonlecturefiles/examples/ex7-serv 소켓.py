from socket import *

servsock = socket(AF_INET, SOCK_STREAM) # TCP , IPv4로 소켓 생성 
servsock.bind(('', 8080))               # 현재 ip, 포트 번호 8080로 소켓 할당
servsock.listen(1)                      # 소켓이 연결가능한 상태로 만듬

clntskt, addr = servsock.accept()               # 클라이언트와 연결 후 클라이언트 소켓, 클라이언트 주소를 저장
message = clntskt.recv(100).decode('utf-8')     # 클라이언트로부터 메시지를 입력받음

print(message)