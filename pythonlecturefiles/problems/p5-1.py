a = int(input())
sort = []

for i in range(a):
    t = int(input())
    sort.append(t)

for j in range(a-1):
    for i in range(a-1):
        if(sort[i] > sort[i+1]):
            tmp = sort[i]
            sort[i] = sort[i+1]
            sort[i+1] = tmp

print(sort)