a = int(input())
b = int(input())
mx = b
mn = b
for i in range(a-1):
    t = int(input())
    if t>mx:
        mx = t
    if t<mn:
        mn = t
print(mx, mn)