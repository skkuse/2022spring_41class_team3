a = []  # 리스트 생성
b = {}  # 딕셔너리 생성

c = ['a', 3]
d = {'a':1, 'b':3}

print(a, b)
print(c, d)

c.remove(3)          # 리스트의 함수 remove
d['c'] = 5          # 딕셔너리 추가

print(c, d)

d.pop('b')          # 딕셔너리 삭제

print(d)