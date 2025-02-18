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
  title: 'NextFlicks',
  meta: [
    { name: 'description', content: 'Nextflicks is a movie and series streaming platform.' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
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
