let getNodes = (str) =>
  new DOMParser().parseFromString(str, 'text/html').body.firstChild

let isFull = false
function init() {
  let dom = document.getElementById('player')
  dom.src = url
  let player = new Plyr(dom, {
    autoplay: true,
  })

  if (parent !== self) {
    injectNext()
    injectSreen()
  }
  player.once('ended', () => {
    notifyParentChangeToNextPart()
  })

  player.on('enterfullscreen', () => {
    toggleFullscreen(false)
  })
}

function injectNext() {
  const dom = document.getElementById('plyr__next')
  const plEl = document.querySelector(
    '.plyr__controls__item.plyr__progress__container'
  )
  const pNode = document.querySelector('.plyr__controls')

  const nextNode = getNodes(dom.innerHTML)
  nextNode.addEventListener('click', () => {
    notifyParentChangeToNextPart()
  })
  pNode.insertBefore(nextNode, plEl)
}

function injectSreen() {
  const dom = document.getElementById('plyr__fullscreen')
  const plEl = document.querySelector('[data-plyr="fullscreen"]')
  const pNode = document.querySelector('.plyr__controls')

  const nextNode = getNodes(dom.innerHTML)
  nextNode.addEventListener('click', (e) => {
    toggleFullscreen()
  })
  pNode.insertBefore(nextNode, plEl)
}

function toggleFullscreen(bool) {
  if (typeof bool === 'boolean') {
    isFull = bool
  } else {
    isFull = !isFull
  }

  let use = document.querySelector('.plyr__fullscreen.plyr__custom use')
  if (isFull) {
    use.setAttribute('xlink:href', '#fullscreen-quit')
  } else {
    use.setAttribute('xlink:href', '#fullscreen')
  }

  notifyParentChangeScreenSize()
}

function notifyParentChangeToNextPart() {
  parent.postMessage({ code: 233, message: 'next part' },'*')
}

function notifyParentChangeScreenSize() {
  parent.postMessage({ code: 666, message: 'change size', isFull },'*')
}

let url = new URLSearchParams(location.search).get('url')

if (url) {
  let dom = document.querySelector('.empty')
  dom.remove()
  init()
}