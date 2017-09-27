import {
  fetchItem
} from '@a'
export default {
  FETCH_ITEM ({ commit }) {
    let j = null
    return fetchItem()
      .then(res => {
        if (res.status===200) commit('SET_ITEM', j=res.data)
        return j
      })
  },
}
