import json
with open('FE_Characters.json') as f:
    File1 = json.load(f)
with open('FEDataAll.json') as f:
    File2 = json.load(f)
for i in range(len(File2)):
    exist = False
    for k in range(len(File1)):
        if File2[i]['name_ja'] == File1[k]['name_ja']:
            exist = True
            break
    if exist == False:
        print(File2[i]['title'].replace(
            "ファイアーエムブレム ", ""), File2[i]['name_ja'])
