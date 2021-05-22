<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    this.$dbCon.on('logout', async u => {
      console.log('App logout')
      this.$global.username = null
      this.$router.push({ path: '/' })
    })
    this.$dbCon.on('login', async u => {
      this.$global.username = u.user.name
      this.$router.push({ path: '/todos' })
    })
  }
}
</script>
