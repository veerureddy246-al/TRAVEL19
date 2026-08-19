import re

def check(f):
    text = open(f, encoding='utf-8').read()
    text = re.sub(r'//.*', '', text)
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)
    text = re.sub(r'\'(?:\\.|[^\\\'])*\'', "''", text)
    text = re.sub(r'\"(?:\\.|[^\\\"])*\"', '""', text)
    text = re.sub(r'\`(?:\\.|[^\\\`])*\`', '``', text)
    stack = []
    lines = text.split('\n')
    for i, line in enumerate(lines):
        for j, c in enumerate(line):
            if c in '{[(': 
                stack.append((c, i+1))
            elif c in '}])':
                if not stack:
                    print(f'Extra {c} at line {i+1}')
                    return
                top = stack.pop()
                if (c == '}' and top[0] != '{') or (c == ']' and top[0] != '[') or (c == ')' and top[0] != '('):
                    print(f'{f}: Mismatched {c} at line {i+1}. Expected closing for {top[0]} from line {top[1]}')
                    return
    if stack:
        print(f'{f}: Unclosed:', stack[-1])
    else:
        print(f'{f}: OK')

check('js/main.js')
check('js/services.js')
