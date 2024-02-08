import os

root = 'images/bokehme'
txt = ''
for name in sorted(os.listdir(root)):
    if '.jpg' not in name:
        continue
    txt += name[:-4] + ','
print(txt)