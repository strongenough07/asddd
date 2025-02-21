<template>
  <div class="bg-dark text-white min-h-screen flex flex-col relative" @click="clearSearch">
    <!-- Фиксиран хедър -->
    <header class="fixed top-0 left-0 w-full bg-extralight z-50 shadow-lg">
      <div class=" py-2 flex justify-between items-center">
        <div @click="$router.push('/')" class="flex items-center cursor-pointer relative">
          <nuxt-img 
    src="/logo.webp" 
    class="w-48 h-6 sm:h-6 md:h-7 lg:h-12 object-cover hidden md:block" 
    alt="Logo" 
    format="webp" 
    preload 
  />
  <nuxt-img 
    src="/logo2.png" 
    class="w-8 h-8 sm:block md:hidden lg:hidden object-cover ml-2" 
    alt="Logo" 
    format="webp" 
    preload 
  />
</div>
        <div>
        </div>
        <div class=" w-[200px] md:w-[400px]"> 
          
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Търсене..."
            class="w-[calc(100%-1rem)] text-sm md:text-base px-2 py-1 md:px-2.5 md:py-1.5 rounded-xl border border-gray-200/20 bg-extralight text-white focus:outline-none focus:ring-2 focus:ring-orange/80"
            @input="handleSearch"
          />
        <div  class="absolute top-14 right-22 max-w-[100%] bg-extralight rounded-lg shadow-md z-50 border border-zinc-200/20" >
          <ul v-if="searchQuery.length > 2 && searchResults?.results?.length > 0" class="max-h-60 overflow-y-auto">
            <li v-for="result in searchResults.results" :key="result.id" class="p-2 hover:bg-lightdark cursor-pointer" @click="handleResultClick(result)">
              {{ result.title }}
            </li>
          </ul>
          <div v-else-if="searchQuery.length > 2 && searchResults?.results?.length === 0" class="p-2 text-gray-400">
            Няма намерени резултати.
          </div>
        </div>
        </div>


     
      </div>
    </header>

    <!-- Основно съдържание с padding-top, за да не се припокрива с хедъра -->
    <main class="flex-1 pt-16 pb-16">
      <slot />
    </main>


  </div>
</template>

<script setup>
const searchQuery = ref('');
const { search , searchResults} = useSearch();
const router = useRouter();

const handleSearch = async () => {
  if (searchQuery.value.length > 2) {
    await search(searchQuery.value);
  }
};

const handleResultClick = (result) => {
  searchQuery.value = '';
  router.push(`/${result.slug || ''}`);
};

const clearSearch = () => {
    searchQuery.value = '';
}
</script>

<style scoped>
header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
