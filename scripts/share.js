function share() {
  // http://twitter.com/share?url=yurukei-career.com&text=Twitterのシェアをするときの文章です&via=yurukei20&hashtags=ハッシュタグのテキスト
  let url = "http://twitter.com/share?"
  url += "&text=" +
    hour.innerHTML + "時間" +
    min.innerHTML + "分" +
    sec.innerHTML + "秒で、FE" +
    titles[state] + "のプレイアブルキャラ " +
    correctCount + "/" + answerData.length +
    " 人言えました！"
  url += "&hashtags=FEキャラクイズ"
  shareTwitter[0].href = url
  shareTwitter[1].href = url
}