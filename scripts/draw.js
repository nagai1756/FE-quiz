function makeCells() {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  text.placeholder = "入力でスタート"
  timer_el.disabled = true
  s.style.display = "none"
  let count = 0
  text.value = ""
  put = false
  end = false
  selectChange = false
  answerData = []
  correct.innerHTML = "0"
  num = 0
  if (state == allValue) {
    for (let state1 = 0; state1 < data.length; state1++) {
      for (let i = 0; i < data[state1].length; i++) {
        answerData.push(data[state1][i])
        num++
      }
    }
  }
  else {
    for (let i = 0; i < data[state].length; i++) {
      answerData.push(data[state][i])
      num++
    }
  }
  all.innerHTML = num
  hour.innerHTML = 0
  min.innerHTML = 0
  sec.innerHTML = 0
  for (let state1 = 0; state1 < data.length; state1++) {
    const ul = d.createElement("ul")
    if (state == allValue || state == state1) {
      for (let i = 0; i < data[state1].length; i++) {
        const li = d.createElement("li")
        const img_dummy = d.createElement("img")
        const img_answer = d.createElement("img")
        const span = d.createElement("span")
        img_dummy.src = "https://i.pinimg.com/originals/39/5d/f9/395df95f312fc4b36dc374fe16b796bf.jpg"
        img_dummy.classList.add("cell")
        img_answer.id = count
        img_answer.src = data[state1][i].img_src
        img_answer.style.display = "none"
        img_answer.classList.add("cell")
        span.innerHTML = count + 1
        span.style.marginRight = "5px"
        li.appendChild(img_dummy)
        li.appendChild(img_answer)
        li.appendChild(span)
        ul.appendChild(li)
        main.appendChild(ul)
        count++
      }
    }
    if (state != allValue && state1 == state) {
      return
    }
  }
  text.focus()
}