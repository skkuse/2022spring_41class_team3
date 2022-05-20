a = ['a', 'b', 'c', 'd']
b = 0

print('while문')
while b<5:         
    print(b)
    b = b+1

print('for문')
for i in a:        
    print(i)

print('range 사용, [0, 4) 범위')
for i in range(4):
    print(i*i)
    
print('range 사용, [3, 5) 범위')
for i in range(3,5):
    print(i*i*i)