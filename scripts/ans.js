function answer() {
  if (text.value == "") {
    p.innerHTML = "未入力"
    return
  }
  let judge = false
  const lis = d.getElementsByTagName("li")
  for (let i = 0; i < answerData.length; i++) {
    if ((answerData[i].name_ja == text.value) ||
      (answerData[i].name_ja2 == text.value) ||
      (answerData[i].name_ja3 == text.value) ||
      (answerData[i].name_ja4 == text.value) ||
      (answerData[i].name_ja5 == text.value) ||
      (answerData[i].name_ja6 == text.value) ||
      (answerData[i].name_ja7 == text.value) ||
      (answerData[i].name_ja8 == text.value) ||
      (answerData[i].name_ja == "リュール男" && text.value == "リュ―ル男") ||
      (answerData[i].name_ja == "リュール女" && text.value == "リュ―ル女") ||
      (answerData[i].name_ja == "スタルーク" && text.value == "スタル―ク") ||
      (answerData[i].name_ja == "リュール男" && text.value == "りゅ―る男") ||
      (answerData[i].name_ja == "リュール女" && text.value == "りゅ―る女") ||
      (answerData[i].name_ja == "スタルーク" && text.value == "すたる―く") ||
      (answerData[i].name_ja == "リュール男" && text.value == "りゅ―る") ||
      (answerData[i].name_ja == "リュール女" && text.value == "りゅ―る") ||
      (answerData[i].name_ja == "スタルーク" && text.value == "すたる―く")) {
      judge = true
      const img = d.getElementById(i)
      if (img.style.display == "none") {
        if (!mute) {
          const audio = document.getElementById('correctAudio')
          audio.currentTime = 0
          audio.volume = volume.value
          audio.play()
        }
        img.style.display = ""
        const imgs = lis[i].getElementsByTagName("img")
        const dummy = imgs[0]
        dummy.style.display = "none"
        put = true
        console.log(i, answerData[i].name_ja)
        const a = d.createElement("a")
        lis[i].appendChild(a)
        document.getElementById('main').scrollBy(0,
          document.getElementById(i).getBoundingClientRect().y -
          document.getElementById('main').getBoundingClientRect().y - 15
        )
        a.innerHTML = answerData[i].name_ja
        a.href = answerData[i].name_ja_href
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', "noopener noreferrer")
        correctCount++
        correct.innerHTML = correctCount
        p.innerHTML = "正解!"
      }
      else if (img.style.display == "") {
        p.innerHTML = "回答済み"
        return
      }
    }
  }
  if (!judge) {
    p.innerHTML = "該当なし"
    if (!mute) {
      const audio = document.getElementById('falseAudio')
      audio.currentTime = 0
      audio.volume = volume.value * 0.5
      audio.play()
    }
  }
  else text.value = ""
  if (correctCount == num) {
    p.innerHTML = "全問正解！"
    text.disabled = true
    viewAnswer.disabled = true
    timer_el.disabled = true
    retry_button.disabled = false
    timer_stop()
  }
}