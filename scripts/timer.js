const hour = document.getElementById("hour")
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const timer_el = document.getElementById("timer")
let intervalId
let start = false
let start_time
let started = false
let diff
let hourNum
let minNum
let secNum
function timer_start() {
    start_time = new Date()
    hourValue = parseInt(hour.innerHTML)
    minValue = parseInt(min.innerHTML)
    secValue = parseInt(sec.innerHTML)
    timer_el.disabled = false
    started = true
    start = true
    let start1 = false
    intervalId = setInterval(function () {
        const now = new Date();
        diff = (now.getTime() - start_time.getTime()) / 1000
        hourNum = hourValue + Math.floor((secValue + diff) / 3600) % 60
        minNum = minValue + Math.floor((secValue + diff) / 60) % 60
        secNum = (Math.floor(secValue + diff)) % 60
        // console.log(hour.innerHTML, min.innerHTML, sec.innerHTML)
        if (start1) {
            hour.innerHTML = hourNum
            min.innerHTML = minNum
            sec.innerHTML = secNum
        }
        else if (hourNum == 0 && minNum == 0 && secNum == 0) {
            hour.innerHTML = "-"
            min.innerHTML = "-"
            sec.innerHTML = "-"
        }
        else start1 = true
    }, 1)
}
function timer_stop() {
    if (end) {
        started = false
        start = false
        return
    }
    if (!start) {
        started = false
        clearInterval(intervalId)
        timer_el.disabled = true
        if (hour.innerHTML == "-" || min.innerHTML == "-" || sec.innerHTML == "-") {
            hour.innerHTML = 0
            min.innerHTML = 0
            sec.innerHTML = 0
        }
        return
    }
    if (!selectChange) {
        const v = confirm("タイマーを停止しますか？(タイマーは継続中)")
        if (v == true) {
            placeholder = "タイマー停止中"
            text.placeholder = placeholder
            text.focus()
            text.value = ""
            started = false
            clearInterval(intervalId)
            timer_el.disabled = true
            const now = new Date();
            diff = (now.getTime() - start_time.getTime()) / 1000
            hourNum = hourValue + Math.floor((secValue + diff) / 3600) % 60
            minNum = minValue + Math.floor((secValue + diff) / 60) % 60
            secNum = (Math.floor(secValue + diff)) % 60
            hour.innerHTML = hourNum
            min.innerHTML = minNum
            sec.innerHTML = secNum
        }
        else {
            started = false
            clearInterval(intervalId)
            timer_el.disabled = true
            hour.innerHTML = 0
            min.innerHTML = 0
            sec.innerHTML = 0
        }
    }
    else {
        started = false
        clearInterval(intervalId)
        timer_el.disabled = true
        hour.innerHTML = 0
        min.innerHTML = 0
        sec.innerHTML = 0
    }
    if (hour.innerHTML == "-" || min.innerHTML == "-" || sec.innerHTML == "-") {
        hour.innerHTML = 0
        min.innerHTML = 0
        sec.innerHTML = 0
    }
}