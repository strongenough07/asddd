<template>
  <div class="bg-gray-900 text-white min-h-screen relative">
    
    <NuxtLayout  name="default" >

      <NuxtPage />


    </NuxtLayout>
    <footer class=" w-full bg-extralight text-white text-center py-2 md:py-6 lg:py-12">
      <div class="px-4 md:px-32 lg:px-44">
        <p>Всички филми и сериали са налични за гледане безплатно и без регистрация.

Филмите публикувани в сайта за гледане на филми онлайн, не се хостват на нашия сървър. Сайтът използва материали от други сайтове и не носи отговорност за съдържанието на публикуваните филми и сериали.</p>
      </div>
    </footer>
  </div>
   
</template>

<script setup>
useHead({
  title: 'NextFlicks - Гледайте Филми и Сериали Онлайн Безплатно',
  meta: [
    { name: 'description', content: 'Гледайте любимите си филми и сериали онлайн напълно безплатно с NextFlicks. Богата колекция от заглавия с високо качество и български субтитри.' },
    { name: 'keywords', content: 'филми, сериали, онлайн филми, безплатно гледане, български субтитри, филми онлайн, сериали онлайн, гледай филми, гледай сериали, nextflicks' },
    { property: 'og:title', content: 'NextFlicks - Гледайте Филми и Сериали Онлайн Безплатно' },
    { property: 'og:description', content: 'Гледайте любимите си филми и сериали онлайн напълно безплатно с NextFlicks. Богата колекция от заглавия с високо качество и български субтитри.' },
    { property: 'og:image', content: '/logo.webp' },
    { property: 'og:url', content: 'https://nextflicks.net' },
      { name: 'twitter:card', content: 'summary_large_image' },


  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png' },
     { rel: 'canonical', href: 'https://nextflicks.net' },
  ]
})
</script>

<style lang="css">
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0F1012;
}

</style>
