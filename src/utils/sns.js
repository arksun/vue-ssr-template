// get our 
const snsApp = {
  fb: {
    appId: 0, //DP
  },
  tw: {
    appId: 0,
  },
  instagram: {
    appId: 0
  }
}

module.exports = {
  fb (opts) { //share dialog, need appId
    if(!opts) {
      console.log('empty share information')
      return
    }
    const pre = 'https://www.facebook.com/dialog/feed'
    const obj = {
      app_id: snsApp.fb.appId,
      redirect_uri: opts.redirect,
      picture: opts.img,
      name: opts.title,
      link: opts.link,
      description: opts.desc,
      display: 'popup',
      show_error: 'yes',
    }
    return `${pre}?${qs.stringify(obj)}`
  },
  tw (opts) {
    const pre = 'https://twitter.com/share?text={0}&via=RINGS.TV&url={1}'
    const obj = {
      text: opts.desc,
      via: 'RINGS.TV',
      url: opts.redirect
    }
    return `${pre}?${qs.stringify(obj)}`
  },
  wx (opts) {

  },
  instagram (opts) {

  }
}