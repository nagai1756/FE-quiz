"use strict"
const d = document
const selector = d.getElementById("selector")
const main = d.getElementById("main")
const text = d.getElementById("text")
const p = d.getElementById("judge")
const correct = d.getElementById("correct")
const all = d.getElementById("all")
const viewAnswer = d.getElementById("viewAnswer")
const select = d.createElement("select")
const shareTwitter = d.getElementsByClassName("shareTwitter")
let placeholder = ""
let end = false
let hourValue = 0
let minValue = 0
let secValue = 0
let allValue = 0
let keyDownCode
let state = 0
let bufs = {}
let titles = []
let data = []
let num = 0
let answerData = []
let correctCount = 0
let put = false
let selectChange = false
window.onload = function () {
    titles.push("紋章の謎・暗黒竜と光の剣・新紋章の謎・新暗黒竜と光の剣")
    titles.push("Echos")
    titles.push("聖戦の系譜")
    titles.push("トラキア776")
    titles.push("封印の剣")
    titles.push("烈火の剣")
    titles.push("聖魔の光石")
    titles.push("蒼炎の軌跡・暁の女神")
    titles.push("覚醒")
    titles.push("IF")
    titles.push("幻影異聞録♯fe")
    titles.push("ヒーローズ")
    titles.push("風花雪月・無双")
    titles.push("エンゲージ")
    if (allValue >= titles.length) {
        allValue = titles.length
        titles.push("全シリーズ")
    }
    else titles.splice(allValue, 0, "全シリーズ")
    for (let i = 0; i < titles.length; i++) bufs[i] = []
    for (let i = 0; i < dataAll.length; i++) {
        switch (dataAll[i].title) {
            // case "ファイアーエムブレム 暗黒竜と光の剣":
            case "ファイアーエムブレム 新・暗黒竜と光の剣":
            // case "ファイアーエムブレム 紋章の謎":
            case "ファイアーエムブレム 新・紋章の謎": bufs[0].push(dataAll[i]); break
            case "ファイアーエムブレム 外伝": bufs[1].push(dataAll[i]); break
            case "ファイアーエムブレム 聖戦の系譜": bufs[2].push(dataAll[i]); break
            case "ファイアーエムブレム トラキア776": bufs[3].push(dataAll[i]); break
            case "ファイアーエムブレム 封印の剣": bufs[4].push(dataAll[i]); break
            case "ファイアーエムブレム 烈火の剣": bufs[5].push(dataAll[i]); break
            case "ファイアーエムブレム 聖魔の光石": bufs[6].push(dataAll[i]); break
            // case "ファイアーエムブレム 蒼炎の軌跡":
            case "ファイアーエムブレム 暁の女神": bufs[7].push(dataAll[i]); break
            case "ファイアーエムブレム 覚醒": bufs[8].push(dataAll[i]); break
            case "ファイアーエムブレム if": bufs[9].push(dataAll[i]); break
            case "ファイアーエムブレム 幻影異聞録♯FE Encore": bufs[10].push(dataAll[i]); break
            case "ファイアーエムブレム ヒーローズ": bufs[11].push(dataAll[i]); break
            case "ファイアーエムブレム 風花雪月":
            case "ファイアーエムブレム 無双 風花雪月": bufs[12].push(dataAll[i]); break
            case "ファイアーエムブレム エンゲージ": bufs[13].push(dataAll[i])
        }
        if ((dataAll[i].name_ja == "ラルゴ" && dataAll[i].title == "ファイアーエムブレム 蒼炎の軌跡") ||
            (dataAll[i].name_ja == "ダラハウ" && dataAll[i].title == "ファイアーエムブレム 蒼炎の軌跡")) bufs[7].push(dataAll[i])
    }
    for (let i = 0; i < titles.length - 1; i++) {
        if (i == allValue) data.push([])
        data.push(bufs[i])
    }
    makeCells()
    select.onchange = function () {
        text.focus()
        if (put) {
            const v = confirm("シリーズを変更しますか？回答内容は失われます。")
            if (v == true) {
                put = false
                start = false
                selectChange = true
                state = this.value
                retry()
            }
            else {
                select.value = state
            }
        }
        else {
            selectChange = true
            state = this.value
            retry()
        }
    }
    selector.appendChild(select)
    for (let i = 0; i < titles.length; i++) {
        const option = d.createElement("option")
        option.value = i
        option.innerHTML = titles[i]
        select.appendChild(option)
    }
}

window.onbeforeunload = function (event) {
    if (put || start) {
        event.preventDefault();
        event.returnValue = '';
        return
    }
}

text.onkeydown = function (event) {
    keyDownCode = event.which
    p.innerHTML = ""
    if (!started &&
        (
            (keyDownCode >= 65 && keyDownCode <= 90) ||
            (keyDownCode == 229 || keyDownCode == 13)
        )
    ) {
        placeholder = "回答を入力"
        text.placeholder = placeholder
        timer_start()
    }
    start = true
}

text.onkeyup = function (event) {
    if (13 == event.which && event.which == keyDownCode) {
        answer()
    }
}