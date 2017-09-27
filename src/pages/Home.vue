<template lang="slm">
.view.view-home
  .hello
    h1 Welcome to Your Vue.js App
</template>
<script>
//import { mapGetters } from 'vuex'
//import Comp from '@c/Comp.vue'

export default {
  name: 'page-home',
  //components: {  },
  data: () => ({
    
  }),
  computed: {
    // ...mapGetters({
      
    // })
  },
  meta () {
    return { title: 'VUE SSR TMPL' }
  },
  props: [],
  watch: {},
  beforeMount () {},
  mounted () {},
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
@import '../styl/__var'
</style>
