import time
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome import service as fs
from selenium.webdriver.common.action_chains import ActionChains
import json
import jaconv
start_time = time.perf_counter_ns()
CHROMEDRIVER = "/Users/pankuri/opt/anaconda3/lib/python3.10/site-packages/chromedriver_binary/chromedriver"
chrome_service = fs.Service(executable_path=CHROMEDRIVER)
browser = webdriver.Chrome(service=chrome_service)
browser.get('https://puarts.com/?pid=1749')
div = browser.find_elements(
    By.CLASS_NAME, "articleL")
div2 = div[1].find_element(By.TAG_NAME, "div")
div3 = div2.find_element(By.TAG_NAME, "div")
table = div3.find_element(By.TAG_NAME, "table")
list = table.find_element(By.CLASS_NAME, "list")
listHTML = list.text
f = open("elements.txt", "r")
elements = f.read()
elements = ""
if elements == listHTML:
    print("変更点はありません")
else:
    trs = list.find_elements(By.TAG_NAME, "tr")
    data = []
    for i in range(len(trs)):
        buf = {}
        tds = trs[i].find_elements(By.TAG_NAME, "td")
        td_name_ja = tds[0]
        td_title = tds[2]
        td_playable = tds[5]
        td_name_ja_a = td_name_ja.find_element(By.TAG_NAME, "a")
        if(td_playable.text == "yes"):
            td_title_a = td_title.find_element(By.TAG_NAME, "a").text
            if td_title_a == "ファイアーエムブレム 紋章の謎":
                td_title_a = "ファイアーエムブレム 新・紋章の謎"
            elif td_title_a == "ファイアーエムブレム 暗黒竜と光の剣":
                td_title_a == "ファイアーエムブレム 新・暗黒竜と光の剣"
            try:
                img = td_name_ja_a.find_element(By.TAG_NAME, "img")
                ActionChains(browser).move_to_element(td_name_ja).perform()
                img_src = img.get_attribute("src")
                title = td_title_a.replace("ファイアーエムブレム ", "")
                if title == "新・紋章の謎" or title == "新・暗黒竜と光の剣" or title == "紋章の謎" or title == "暗黒竜と光の剣":
                    title = "紋章の謎・暗黒竜と光の剣・新紋章の謎・新暗黒竜と光の剣"
                elif title == "if":
                    title = "IF"
                elif title == "幻影異聞録♯FE Encore":
                    title = "幻影異聞録♯fe"
                elif title == "聖魔の光石" or title == "暁の女神":
                    title = "聖魔の光石・暁の女神"
                elif title == "風花雪月" or title == "無双 風花雪月":
                    title = "風花雪月・無双"
                elif title == "外伝":
                    title = "風花雪月・無双"
                with open(f"../images/{title}_{td_name_ja_a.text}.png", mode="wb")as wf:
                    wf.write(img.screenshot_as_png)
            except:
                img_src = 'https://pics.prcm.jp/e71658ade5a7f/51021649/jpeg/51021649_480x480.jpeg'
                print(i, td_title_a.replace("ファイアーエムブレム ", "") +
                      "の"+td_name_ja_a.text+"の画像")
                continue
            try:
                td_name_ja_a_href = td_name_ja_a.get_attribute("href")
            except:
                td_name_ja_a_href = ''
                print(td_name_ja_a.text, i, "aのhrefが取得できませんでした")
            buf['name_ja1'] = td_name_ja_a.text
            buf['name_ja2'] = jaconv.kata2hira(td_name_ja_a.text)
            buf["name_ja_href"] = td_name_ja_a_href
            buf['img_src'] = img_src
            buf['title'] = td_title_a
            buf['playable'] = td_playable.text
            data.append(buf)
        if i != 0 and i % 100 == 0:
            print(f"{i}個終了")
    with open('FE_Characters.json', 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    # os.rename("FE_Characters.json", "FE_Characters1.js")
    browser.quit()
    end_time = time.perf_counter_ns()
    print(f'{(end_time-start_time)/1000000000} s', end="")
    f = open("elements.txt", "w")
    f.write(listHTML)
    print("\007")
