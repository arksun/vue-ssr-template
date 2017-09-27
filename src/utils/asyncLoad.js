// temp
/**
 * const srcs = {
      jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
      cx: 'https://scdn.cxense.com/cx.js',  // cX
      dtm: prod ? '//assets.adobedtm.com/146001d52b8325bae1cbfb036eb775fd04bcda33/satelliteLib-b36e30dd4fd450d257351413c6a894f12f721c3f.js'
        : '//assets.adobedtm.com/146001d52b8325bae1cbfb036eb775fd04bcda33/satelliteLib-b36e30dd4fd450d257351413c6a894f12f721c3f-staging.js',
      gpt: 'https://www.googletagservices.com/tag/js/gpt.js' // googletag
    }
 * 
 */

// po.st
const po_st = '.po.st/static/v4/post-widget.js#publisherKey=p6hlcbcv2m3gbgnqvjif'
export const srcs = {
  jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
  cx: 'https://scdn.cxense.com/cx.js',  // cX
  dtm: '/public/lib/dtm.js',
  //dtm: '//assets.adobedtm.com/146001d52b8325bae1cbfb036eb775fd04bcda33/satelliteLib-b36e30dd4fd450d257351413c6a894f12f721c3f.js',
  //dtm_staging: '//assets.adobedtm.com/146001d52b8325bae1cbfb036eb775fd04bcda33/satelliteLib-b36e30dd4fd450d257351413c6a894f12f721c3f-staging.js',
  //gpt: 'https://www.googletagservices.com/tag/js/gpt.js' // googletag
  ipost: 'http://i' + po_st,
  spost: 'https://s' + po_st,
}

let imgs = {}
export function loadImg(e) {
  if (imgs[e]) return imgs[e]
  let p = new Promise((resolve, reject) => {
    var img = document.createElement('img')
    img.src = e
    img.style.display = 'none'
    document.body.appendChild(img)
    resolve(e)
  })
  return imgs[e] = p
}

let styles = {}
function loadCss(e) {
  if (styles[e]) return styles[e]
  let p = new Promise((resolve, reject) => {
    var h = document.getElementsByTagName("head")[0],
        link = document.createElement("link");
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = e;
    h.appendChild(link);
    resolve( e )
  });
  return styles[e] = p
}

let scripts = {}
export function loadScript(e) {
  if (scripts[e])return scripts[e];
  let p = new Promise((resolve, reject) => {
    var r = false,
      h = document.getElementsByTagName("head")[0],
      s = document.createElement("script");
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState == "complete")) {
        r = true;
        resolve(e);
      }
    };
    s.onerror = s.onabort = reject;
    s.async = true;
    s.src = e
    h.appendChild(s);
  });
  scripts[e] = p
  return p
}

export function loadScripts(arr) {
  return arr.reduce((promise, items) => {
    return promise.then((result) => {
      return Promise.all(items.map((item) => { return loadScript(item) }))
    }).catch(console.error);
  }, Promise.resolve());
}