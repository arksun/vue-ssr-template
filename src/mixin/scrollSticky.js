import { evListen } from '@u/window'

const mx = {
  methods: {
    _scrollSticky () {
      const self = this
      if (self.ticking) return;

      !self.ticking && window.requestAnimationFrame(() => {
        if (!self._bScrollStickyItem && self._itemTop - window.scrollY <= 20) {
          self._bScrollStickyItem = true
        } else if (self._bScrollStickyItem && self._itemTop - window.scrollY > 20) {
          self._bScrollStickyItem = false
        }
        self.ticking = false
      })
      self.ticking = true
    }
  },
  mounted () {
    if (this.md.mobile) evListen('scroll', this._scrollSticky)
  },
  beforeDestroy () {
    if (this.md.mobile) evListen('scroll', this._scrollSticky, false)
  }
}

export default mx