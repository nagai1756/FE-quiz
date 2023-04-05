function retry() {
  if (selectChange && put) {
    const v = confirm("シリーズを変更しますか？正答数がリセットされます")
    if (v) {
      func()
    }
  }
  else if (end) {
    const v = confirm("再挑戦しますか？正答数がリセットされます")
    if (v) {
      func()
    }
  }
  else func()
}
function func() {
  put = false
  hourValue = 0
  minValue = 0
  secValue = 0
  correctCount = 0
  p.innerHTML = ""
  text.value = ""
  text.disabled = false
  viewAnswer.disabled = false
  timer_el.disabled = false
  viewAnswer.innerHTML = "答えを見る"
  viewAnswer.onclick = finish
  timer_stop()
  makeCells()
}