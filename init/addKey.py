import json
import jaconv
with open("../FE_Characters.json", "r") as f:
    File1 = json.load(f)
with open("./FEDataAll.json", "r") as f:
    File2 = json.load(f)
for i in range(len(File1)):
    File1[i]['name_ja2'] = jaconv.kata2hira(File1[i]['name_ja'])
    File1[i]['name_ja3'] = ""
    File1[i]['name_ja4'] = ""
    File1[i]['name_ja5'] = ""
    File1[i]['name_ja6'] = ""
    File1[i]['name_ja7'] = ""
    File1[i]['name_ja8'] = ""
    if File1[i]['name_ja'] == "リュール男" or File1[i]['name_ja'] == "リュール女":
        File1[i]['name_ja3'] = "リュール"
        File1[i]['name_ja4'] = jaconv.kata2hira(File1[i]['name_ja3'])
    elif File1[i]['name_ja'] == "クリス男" or File1[i]['name_ja'] == "クリス女":
        File1[i]['name_ja3'] = "クリス"
        File1[i]['name_ja4'] = jaconv.kata2hira(File1[i]['name_ja3'])
    elif File1[i]['name_ja'] == "カムイ男" or File1[i]['name_ja'] == "カムイ女":
        File1[i]['name_ja3'] = "カムイ"
        File1[i]['name_ja4'] = jaconv.kata2hira(File1[i]['name_ja3'])
    elif File1[i]['name_ja'] == "ルフレ男" or File1[i]['name_ja'] == "ルフレ女":
        File1[i]['name_ja3'] = "ルフレ"
        File1[i]['name_ja4'] = jaconv.kata2hira(File1[i]['name_ja3'])
    elif File1[i]['name_ja'] == "カンナ男" or File1[i]['name_ja'] == "カンナ女":
        File1[i]['name_ja3'] = "カンナ"
        File1[i]['name_ja4'] = jaconv.kata2hira(File1[i]['name_ja3'])
    elif File1[i]['name_ja'] == "マーク男" or File1[i]['name_ja'] == "マーク女":
        File1[i]['name_ja3'] = "マーク"
        File1[i]['name_ja4'] = jaconv.kata2hira(File1[i]['name_ja3'])
    elif File1[i]['name_ja'] == "シェズ男" or File1[i]['name_ja'] == "シェズ女":
        File1[i]['name_ja3'] = "シェズ"
        File1[i]['name_ja4'] = jaconv.kata2hira(File1[i]['name_ja3'])
    elif File1[i]['name_ja'] == "蒼井樹":
        File1[i]["name_ja2"] = "あおいいつき"
        File1[i]["name_ja3"] = "アオイイツキ"
    elif File1[i]['name_ja'] == "織部つばさ":
        File1[i]["name_ja2"] = "おりべつばさ"
        File1[i]["name_ja3"] = "おりべつばさ"
    elif File1[i]['name_ja'] == "赤城斗馬":
        File1[i]["name_ja2"] = "あかぎとうま"
        File1[i]["name_ja3"] = "アカギトウマ"
    elif File1[i]['name_ja'] == "黒乃霧亜":
        File1[i]["name_ja2"] = "くろのきりあ"
        File1[i]["name_ja3"] = "クロノキリア"
    elif File1[i]['name_ja'] == "弓弦エレオノーラ":
        File1[i]["name_ja2"] = "ゆみづるえれおのーら"
        File1[i]["name_ja3"] = "ユミヅルエレオノーラ"
        File1[i]['name_ja4'] = "ゆみづるエレオノーラ"
    elif File1[i]['name_ja'] == "源まもり":
        File1[i]["name_ja2"] = "みなもとまもり"
        File1[i]["name_ja3"] = "ミナモトマモリ"
    elif File1[i]['name_ja'] == "剣弥代":
        File1[i]["name_ja2"] = "つるぎやしろ"
        File1[i]["name_ja3"] = "ツルギヤシロ"
    elif File1[i]['name_ja'] == "漆黒の騎士":
        File1[i]["name_ja2"] = "しっこくのきし"
        File1[i]["name_ja3"] = "シッコクノキシ"
    for k in range(len(File2)):
        if(File1[i]['name_ja'] == File2[k]['name_ja']):
            File1[i]['name_ja5'] = File2[k]['name_en'].lower()
            break
with open('../FE_Characters.json', "w") as f:
    json.dump(File1, f, indent=2, ensure_ascii=False)
