import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome import service as fs
from selenium.webdriver.common.action_chains import ActionChains
import json
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
f = open("elements2.txt", "r")
elements = f.read()
if elements == listHTML:
    print("変更点はありません")
else:
    trs = list.find_elements(By.TAG_NAME, "tr")
    tds = trs[0].find_elements(By.TAG_NAME, "td")
    td_title = tds[2]
    td_title_a = td_title.find_element(By.TAG_NAME, "a")
    title_text = td_title_a.text
    title = title_text
    data = []
    buf1 = []
    print(f"{len(trs)}個のデータを取得します。")
    for i in range(len(trs)):
        buf = {}
        tds = trs[i].find_elements(By.TAG_NAME, "td")
        td_name_ja = tds[0]
        td_name_en = tds[1]
        td_title = tds[2]
        td_sex = tds[3]
        td_birthday = tds[4]
        td_playable = tds[5]
        td_installed = tds[6]
        td_actor = tds[7]
        td_tag = tds[8]
        td_name_ja_a = td_name_ja.find_element(By.TAG_NAME, "a")
        ActionChains(browser).move_to_element(td_name_ja).perform()
        try:
            td_name_ja_a_href = td_name_ja_a.get_attribute("href")
        except:
            td_name_ja_a_href = ''
            print(td_name_ja_a.text, i, "aのhref")
        try:
            img = td_name_ja_a.find_element(By.TAG_NAME, "img")
            img_src = img.get_attribute("src")
        except:
            img_src = 'https://pics.prcm.jp/e71658ade5a7f/51021649/jpeg/51021649_480x480.jpeg'
            print(td_name_ja_a.text, i, "画像")
        td_title_a = td_title.find_element(By.TAG_NAME, "a")
        title_text = td_title_a.text
        if title != title_text:
            title = title_text
            data.append(buf1)
            buf1 = []
        try:
            td_title_a_href = td_title_a.get_attribute("href")
        except:
            td_title_a_href = ''
            print(td_name_ja_a.text, i, "titleのhref")
        try:
            td_actor_a = td_actor.find_element(By.TAG_NAME, "a")
            actor_text = td_actor_a.text
        except:
            actor_text = ''
            print(td_name_ja_a.text, i, "声優")
        try:
            td_actor_a_href = td_actor_a.get_attribute("href")
        except:
            td_actor_a_href = ''
            print(td_name_ja_a.text, i, "actorのhref")
        buf['name_ja'] = td_name_ja_a.text
        buf['name_ja_href'] = td_name_ja_a_href
        buf['name_en'] = td_name_en.text
        buf['img_src'] = img_src
        buf['title'] = title_text
        buf['title_href'] = td_title_a_href
        buf['sex'] = td_sex.text
        buf['birthday'] = td_birthday.text
        buf['playable'] = td_playable.text
        buf['installed'] = td_installed.text
        buf['actor'] = actor_text
        buf['actor_href'] = td_actor_a_href
        buf1.append(buf)
        if i != 0 and i % 100 == 0:
            print(f"{i}個終了")
    with open('FEDataAllArrays.json', 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    browser.quit()
    end_time = time.perf_counter_ns()
    print(f'{(end_time-start_time)/1000000000} s', end="")
    f = open("elements2.txt", "w")
    f.write(listHTML)
    print("\007")
