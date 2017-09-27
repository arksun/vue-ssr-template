export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}
export function fullPath (url) {
  return '/' + url.split('/').filter((e, i) => i>2).join('/')
}

export function camelize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// export function urlize (s) {
//   return s.toLowerCase().replace(/\s+/g, '-')
// }

// export function ellipsis (s, l=70) {
//   if (s.length >l)
//     return s = s.substr(0, l) + '...'
//   else return s
// }

export function uppercase (s) {
  return s.toUpperCase()
}


// export function timeAgo (time) {
//   const between = Date.now() / 1000 - Number(time)
//   if (between < 3600) {
//     return pluralize(~~(between / 60), ' minute')
//   } else if (between < 86400) {
//     return pluralize(~~(between / 3600), ' hour')
//   } else {
//     return pluralize(~~(between / 86400), ' day')
//   }
// }
// function pluralize (time, label) {
//   if (time === 1) {
//     return time + label
//   }
//   return time + label + 's'
// }