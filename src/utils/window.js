// do not support IE
export function evListen (ev, fn, add=true) {
  if (!window) return 
  if (add) {
    window.addEventListener(ev, fn, true)
  } else {
    window.removeEventListener(ev, fn);
  }
}

// borrow from element-ui
export function scrollBarWidth() {
  const outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}
// state = 1 means popuped, 0 means close
export function popupMgmt(state) {
  const wScrollBar = scrollBarWidth()
  if (typeof document === 'undefined') return
  const body = document.body
  const app = document.getElementById('app')
  if (state) {
    body.style.overflow = 'hidden'
    app.style.paddingRight = wScrollBar + 'px'
  } else {
    body.style.overflow = 'auto'
    app.style.paddingRight = 0
  }
}
/**
 * @param x
 * @param y
 * @param dom
 */
export function smoothScroll(x, y, dom=window) {
  let isRoot = dom===window
  let cY = isRoot ? window.scrollY : dom.scrollTop
  let cX = isRoot ? window.scrollX : dom.scrollLeft
  const dY = (cY-y)/30  //complete in .5s
  const dX = (cX-x)/30
  setTimeout(function(){
    requestAnimationFrame(fnScroll)
  }, 0)

  function fnScroll(){
    if(Math.abs(cY-y)>0.1 || Math.abs(cX-x)>0.1){
      cY-=dY
      cX-=dX
      if(isRoot) {
        dom.scrollTo(cX, cY)
      } else {
        dom.scrollTop = cY
        dom.scrollLeft = cX
      }
      requestAnimationFrame(fnScroll)
    }
  }
}

// https://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling
export function bScrolledIntoView(el) {
  //console.log(el)
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;
  // if (elemTop >= window.innerHeight) return 0 // underneath
  // else if (elemTop >= 0 && elemBottom <= window.innerHeight) return 1 // visible
  // else return 2 // overhead
  var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight
  return isVisible;
}