def isprime(a):
    if(a < 2):
        return False
    i = 2
    while i < a :
        if a%i == 0 :
            return False
        i = i + 1
    return True

a = int(input())

ans = 0
for i in range(a+1):
    if(isprime(i)):
        ans += i

print(ans)