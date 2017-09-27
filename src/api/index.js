import axios from 'axios'
import { createAPI } from 'create-api'
import { pref } from '@config'

const api = createAPI()

function _get(key, uri, data) {
  const io = api.onServer ? axios.create({ auth: api.auth }) : axios
  if (data) return Promise.resolve({ status: 200, data })
  if (api.onServer && api.cachedItems.has(key) && !api.preview)
    return Promise.resolve(api.cachedItems.get(key))
  if (api.onServer) console.log(`[Server][${key}]`,)
  //else console.log(`[Client][${key}] ${uri}`)
  return io.get(uri).then(resp => {
    if (api.onServer && !api.preview && resp.status)
      if (resp.status === 200) api.cachedItems.set(key, resp)
    return resp
  }).catch(e => {
    if (e.response) console.error('[API1] ', { code: e.response.status, rqst: uri })
    else if (e.request) console.error('[API2] ', e.request)
    else console.error('[API3] ', e.message)
    return e.response
  })
}

// fakeData
//import dHome from './sample/home'
export function fetchItem () {
  const key = 'item'
  const uri = ''
  //return _get(key, uri, dHome)
  return _get(key, uri)
}