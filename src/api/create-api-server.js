import LRU from 'lru-cache'
import { cache } from '@config'

export function createAPI () {
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    api = process.__API__ = {
      pref: ''
    }
    api.onServer = true
    api.cachedItems = LRU(cache)
  }
  return api
}
