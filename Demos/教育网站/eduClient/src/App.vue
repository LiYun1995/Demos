<template>
  <div id="app">
  	<headerComponent></headerComponent>
  		<router-view/>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
import headerComponent from '@/components/headerComponent'; 
import footerComponent from '@/components/footerComponent'; 
export default {
  name: 'App',
  components:{
  	headerComponent,footerComponent
  }
}
</script>

<style>
</style>
