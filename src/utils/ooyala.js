
const ooyalaBasePath = '//player.ooyala.com/static/v4/production/'
const ooyalaPlayerSkin = ooyalaBasePath + 'skin-plugin/skin.json'
let scripts = {}

function loadCss(e) {
  if (scripts[e]) {
    return scripts[e];
  }
  
  let p = new Promise((resolve, reject) => {
    var h = document.getElementsByTagName("head")[0],
        link = document.createElement("link");
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = e;
    h.appendChild(link);
    resolve( e )
  });
  
  scripts[e] = p
  return p
}

function loadScript(e) {
  if (scripts[e]) {
    return scripts[e];
  }

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

function loadScripts(arr) {
  return arr.reduce((promise, items) => {
    return promise.then((result) => {
      return Promise.all(items.map((item) => { return loadScript(item) }))
    }).catch(console.error);
  }, Promise.resolve());
}

function loadPlayer() {
  return new Promise((resolve, reject) => {
    if (!window.OO) {
      //load ooyala scripts
      const playerCss = ooyalaBasePath + 'skin-plugin/html5-skin.min.css'
      loadCss(playerCss)
      loadScripts(
        [
          [ ooyalaBasePath + 'core.min.js' ],
          [
            ooyalaBasePath + 'video-plugin/main_html5.min.js',
            ooyalaBasePath + 'video-plugin/bit_wrapper.min.js',
            ooyalaBasePath + 'video-plugin/osmf_flash.min.js',
            ooyalaBasePath + 'skin-plugin/html5-skin.min.js'
          ]
        ]
      ).then(() => {
        
        if (window.OO) {
          resolve(window.OO)
        } else {
          reject()
        }
        
      })
    } else {
      resolve(window.OO)
    }
  })
}

export function initOoyalaVideo( videoContainerId, assetId, ooyalaPCode, ooyalaPlayerBrandingId, options ) {
  return loadPlayer().then((OO) => {
    if (!window.ooyalaPlayer) window.ooyalaPlayer={}
    if (!options) options={}
  
    console.log('initOoyalaVideo', videoContainerId, assetId, ooyalaPCode, ooyalaPlayerBrandingId)
    
    OO.ready(function() {
      window.ooyalaPlayer[ videoContainerId ] = OO.Player.create(videoContainerId, assetId, {
        'autoplay': options.autoplay||false,
        'pcode': ooyalaPCode,
        'platform': 'html5',
        'playerBrandingId': ooyalaPlayerBrandingId,
        'initialTime': options.initialTime || 0,
        'skin': {
          'config': ooyalaPlayerSkin,
          'inline': {
            'startScreen': {
              'showTitle': false,
              'showDescription': false
            },
            'responsive': {
              'aspectRatio': '56.25'
            },
            'controlBar': {
              'logo': {
                'imageResource': { 'url': '' }
              },
              'scrubberBar': {
                'backgroundColor': '#fff',
                'bufferedColor': '#c52626',
                'playedColor': '#ff0000',
                'scrubberHandleColor': '#ff0000',
                'scrubberHandleBorderColor': '#ff0000'
              }
            }
          }
        },
        onCreate: function (player) {
          console.log('playerCreated', videoContainerId, assetId, player)
          if (options.onCreate) {
            options.onCreate.apply(this, [player, videoContainerId, assetId])
          }
        }
      })
    })
  
  })
}
