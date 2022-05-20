def func1(a, b):        # 함수 정의
    return a+b

c = 10
d = 20
print(func1(d, c))

def isprime(a):
    i = 2
    while i < a :
        if a%i == 0 :
            return False
        i = i + 1
    return True

for i in range(2, 10):
    print('is ', i , ' prime? : ', isprime(i))