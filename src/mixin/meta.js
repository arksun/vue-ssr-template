// const _meta = {
//   property: ['og:title', 'og:image', 'og:url', 'og:type', 'og:description'],
//   name: ['description', 'twitter:description'],
// }
function getMeta (vm) {
  const { meta } = vm.$options
  if (meta) 
    return typeof meta === 'function' ? meta.call(vm) : meta
}

const mxServer = {
  created () {
    const meta = getMeta(this)
    if (meta) {
      meta.title = `${meta.title} | Site`
      this.$ssrContext.meta = meta
    }
  }
}

const mxClient = {
  updated () {
    const meta = getMeta(this)
    if (!meta) return;
    document.title = `${meta.title} | Site`
    let fragment
    // add metatags

    // Object.keys(_meta).forEach(k => {
    //   _meta[k].forEach(e => {
    //     let tag = document.head.querySelector(`meta[${k}="${e}"]`)
    //     if (tag) tag.setAttribute('content', meta[e])
    //     else {
    //       fragment = fragment || document.createDocumentFragment()
    //       tag = document.createElement('meta')
    //       tag[k] = e
    //       tag.content = meta[e]
    //       fragment.appendChild(tag)
    //     } 
    //   })
    // })
    
    // if (meta.canonical) {
    //   let tag = document.head.querySelector('link[rel="canonical"]')
    //   if (tag) tag.setAttribute('href', meta.canonical)
    //   else {
    //     fragment = fragment || document.createDocumentFragment()
    //     tag = document.createElement('link')
    //     tag['rel'] = 'canonical'
    //     tag['href'] = meta.canonical
    //     fragment.appendChild(tag)
    //   }
    // }

    fragment && document.getElementsByTagName('head')[0].appendChild(fragment);
  }
}

export default process.env.VUE_ENV === 'server' ? mxServer : mxClient
