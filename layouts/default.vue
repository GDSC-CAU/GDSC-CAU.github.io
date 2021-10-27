<template>
  <div class="absol">
    <Header class="fixed" />
    <Nuxt />
    <Footer />
  </div>
</template>

<style>
  @import url(../assets/css/fonts.css);
  .poppins{
    font-family: 'Poppins', 'Spoqa Han Sans', 'Inter';
  }
  .absol{
    position: relative;
  }
  .fixed{
    position: fixed;
  }
</style>

<script>
export default {
  
}
</script>