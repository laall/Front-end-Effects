// TODO：请补充代码
function startGame() {
  $('img').show('slow')
  $('img').hide('slow')
}
let currentImg
let locked = false
let score = 0
$('.img-box').click(function (e) {
  if (locked) {
    return
  }
  if (!currentImg) {
    currentImg = e.target
    $(e.target.children[0]).show()
    return
  }
  if (e.target.children[0].src !== currentImg.children[0].src) {
    locked = true
    score -= 2
    $('#score').text(score)
    $(e.target.children[0]).show(() => {
      $(e.target.children[0]).hide()
      $(currentImg.children[0]).hide()
      locked = false
      currentImg = null
    })
    return
  } else {
    locked = true
    score += 2
    $('#score').text(score)
    $(e.target.children[0]).show(() => {
      $(e.target.children[0]).hide()
      $(currentImg.children[0]).hide()
      $(e.target).css('background', 'none')
      $(currentImg).css('background', 'none')

      locked = false
      currentImg = null
    })
  }
})
