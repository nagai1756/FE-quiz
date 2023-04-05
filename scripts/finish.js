const openModal = d.getElementById("openModal")
const closeModal = d.getElementById("closeModal")
const modalBg = d.getElementById("modalBg")
const modalArea = d.getElementById("modalArea")
const result = document.getElementById("result")
const s = document.getElementById("share")
let modalHide = true
function finish() {
  let v = confirm("答えを見ますか？")
  if (v == true) {
    text.value = ""
    end = true
    put = false
    start = false
    clearInterval(intervalId)
    timer_el.disabled = true
    timer_stop()
    const lis = d.getElementsByTagName("li")
    for (let i = 0; i < lis.length; i++) {
      const imgs = lis[i].getElementsByTagName("img")
      const answer = d.getElementById(i)
      const dummy = imgs[0]
      if (answer.style.display == "none") {
        answer.style.display = ""
        answer.style.opacity = "0.6"
        dummy.style.display = "none"
        let a = d.createElement("a")
        lis[i].appendChild(a)
        a.innerHTML = answerData[i].name_ja
        a.href = answerData[i].name_ja_href
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', "noopener noreferrer")
      }
    }
    p.innerHTML = "お疲れ様！"
    text.disabled = true
    viewAnswer.innerHTML = "再挑戦"
    viewAnswer.onclick = retry
    document.getElementById('main').scrollTo(0, 0)
    modalArea.style.display = "block"
    result.innerHTML = "あなたは" +
      answerData.length + "人中" +
      correctCount + "人答えることができました！"
    s.style.display = "flex"
    window.onkeydown = function (event) {
      keyDownCode = event.which
      if (keyDownCode == 13) {
        modalArea.style.display = "none"
      }
    }
    modalBg.onclick = function () {
      modalArea.style.display = "none"
    }
    viewAnswer.blur()
    placeholder = "終了！"
    text.placeholder = placeholder
  }
}