import threading

def func1():            #함수 1 정의
    for i in range(5):
        print('func 1')
    
def func2():            #함수 2 정의
    for i in range(5):
        print('func 2')
    
print('쓰레드 하나로 실행 시')
func1()
func2()

print('쓰레드 두 개로 실행 시')
thread1 = threading.Thread(target = func1)
thread2 = threading.Thread(target = func2)
thread1.start()
thread2.start()