<template>
  <div class="container mx-auto px-4  flex flex-col ">
    <div class="flex justify-between items-center mb-4 ">
      <button disabled class="bg-extralight text-white px-2 py-0.5 md:px-2 md:py-1 text-sm md:text-base   rounded-xl disabled">Филтрирай</button>

      <div class="flex space-x-4">

        <button v-for="(tab, index) in tabs" :key="index"
          :class="['px-2 py-0.5 md:px-2 md:py-1  rounded-xl text-sm md:text-base ', activeTab === tab ? 'bg-orange text-black' : 'bg-extralight text-white']"
          @click="activeTab = tab">
          {{ tab === 'Movies' ? 'Филми' : (tab === 'Series' ? 'Сериали' : tab) }}
        </button>

      </div>


    </div>

    <div>
      <div v-if="activeTab === 'Movies'" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">

        <div v-for="(movie, index) in movies" :key="index"
          class="cursor-pointer bg-extralight rounded-lg overflow-hidden h-auto" @click="navigateTo(`/${movie.slug}`)">
          <div class="m-1 mb-1 w-auto px-1 mx-auto ">
            <nuxt-img :src="movie.poster" alt="Movie Poster" class="" />

          </div>
          <div class="p-2">
            <h3 class="text-lg font-bold mb-2">{{ movie.title }}</h3>
            <div class="flex  justify-between">
              <div class="flex flex-row space-x-2">

                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 32 32">
                  <path fill="#f5c518"
                    d="M19.078 12.786v.005c-.099-.063-.302-.094-.557-.094v6.422c.359 0 .583-.083.667-.224c.083-.135.125-.536.125-1.177v-3.823c0-.438-.005-.719-.042-.839c-.031-.13-.089-.219-.188-.271zM29.885 0H2.161A2.3 2.3 0 0 0 0 2.13v27.708c.078 1.167.948 2.057 2.073 2.156q.031.006.063.005h27.792a2.303 2.303 0 0 0 2.073-2.281V2.28a2.3 2.3 0 0 0-2.115-2.281zM6.391 20.833H3.849v-9.818h2.542zm8.718 0h-2.214v-6.63l-.896 6.625h-1.583l-.932-6.479l-.01 6.479H7.255v-9.813h3.286c.115.693.214 1.396.307 2.099l.359 2.49l.594-4.589h3.307zm6.636-2.906c0 .87-.057 1.458-.141 1.76a1.27 1.27 0 0 1-.432.693a1.63 1.63 0 0 1-.76.354c-.297.057-.76.099-1.359.099l-.005-.005h-3.073v-9.813h1.901c1.219 0 1.932.063 2.359.167c.432.12.766.302.995.563c.219.24.365.536.417.859q.1.47.099 1.87zm6.594.63c0 .599-.063 1.021-.12 1.323c-.083.297-.26.536-.542.755c-.302.224-.641.323-1.042.323c-.292 0-.667-.083-.906-.182a2.2 2.2 0 0 1-.688-.573l-.151.63h-2.292v-9.818l-.026-.005h2.401v3.198q.296-.351.677-.531a2.6 2.6 0 0 1 .922-.172c.302 0 .599.047.88.156c.229.094.427.245.583.438c.12.167.198.359.24.563c.036.182.057.573.057 1.156v2.74zm-2.901-3.619c-.156 0-.255.057-.297.161c-.042.109-.078.385-.078.833v2.594c0 .432.036.714.078.833a.31.31 0 0 0 .302.177c.156 0 .359-.063.401-.188q.056-.194.057-.896l.042-.005v-2.521c0-.401-.021-.677-.078-.802c-.063-.135-.26-.188-.422-.188z" />
                </svg>
                <p class="text-md ">{{ movie.rating }}</p>
              </div>
              <p class="text-md">{{ movie.year }}</p>

            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'Series'" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 ">
        <div v-for="(serie, index) in series" :key="index"
          class="cursor-pointer bg-extralight rounded-lg overflow-hidden" @click="navigateTo(`/${serie.slug}`)">
          <div class="m-1 mb-1 w-auto px-1 mx-auto ">
            <nuxt-img :src="serie.poster" alt="Series Poster" class="" />
          </div>
          <div class="p-2">
            <h3 class="text-lg font-bold mb-2">{{ serie.title }}</h3>
            <div class="flex  justify-between">
              <div class="flex flex-row space-x-2">

                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 32 32">
                  <path fill="#f5c518"
                    d="M19.078 12.786v.005c-.099-.063-.302-.094-.557-.094v6.422c.359 0 .583-.083.667-.224c.083-.135.125-.536.125-1.177v-3.823c0-.438-.005-.719-.042-.839c-.031-.13-.089-.219-.188-.271zM29.885 0H2.161A2.3 2.3 0 0 0 0 2.13v27.708c.078 1.167.948 2.057 2.073 2.156q.031.006.063.005h27.792a2.303 2.303 0 0 0 2.073-2.281V2.28a2.3 2.3 0 0 0-2.115-2.281zM6.391 20.833H3.849v-9.818h2.542zm8.718 0h-2.214v-6.63l-.896 6.625h-1.583l-.932-6.479l-.01 6.479H7.255v-9.813h3.286c.115.693.214 1.396.307 2.099l.359 2.49l.594-4.589h3.307zm6.636-2.906c0 .87-.057 1.458-.141 1.76a1.27 1.27 0 0 1-.432.693a1.63 1.63 0 0 1-.76.354c-.297.057-.76.099-1.359.099l-.005-.005h-3.073v-9.813h1.901c1.219 0 1.932.063 2.359.167c.432.12.766.302.995.563c.219.24.365.536.417.859q.1.47.099 1.87zm6.594.63c0 .599-.063 1.021-.12 1.323c-.083.297-.26.536-.542.755c-.302.224-.641.323-1.042.323c-.292 0-.667-.083-.906-.182a2.2 2.2 0 0 1-.688-.573l-.151.63h-2.292v-9.818l-.026-.005h2.401v3.198q.296-.351.677-.531a2.6 2.6 0 0 1 .922-.172c.302 0 .599.047.88.156c.229.094.427.245.583.438c.12.167.198.359.24.563c.036.182.057.573.057 1.156v2.74zm-2.901-3.619c-.156 0-.255.057-.297.161c-.042.109-.078.385-.078.833v2.594c0 .432.036.714.078.833a.31.31 0 0 0 .302.177c.156 0 .359-.063.401-.188q.056-.194.057-.896l.042-.005v-2.521c0-.401-.021-.677-.078-.802c-.063-.135-.26-.188-.422-.188z" />
                </svg>
                <p class="text-md ">{{ serie.rating }}</p>
              </div>
              <p class="text-md">{{ serie.year }}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center mt-4 " v-if="activeTab === 'Movies'">
      <button :disabled="currentPage === 1" @click="currentPage--"
        class="px-2 py-0.5 md:px-2 md:py-1 mx-1 text-sm md:text-base bg-orange text-white rounded-lg disabled:bg-amber-700">
        Предишна
      </button>
      <span class="mx-2 text-white text-sm md:text-base"> {{ currentPage }} от {{ totalMoviePages }}</span >
      <button :disabled="currentPage === totalMoviePages || movies.length < 12" @click="currentPage++"
        class="px-2 py-0.5 md:px-2 md:py-1 mx-1 text-sm md:text-base bg-orange text-white rounded-lg disabled:opacity-50">
        Следваща
      </button>
    </div>
    <div class="flex items-center justify-center mt-4" v-if="activeTab === 'Series'">
      <button :disabled="currentSeriesPage === 1" @click="currentSeriesPage--"
        class="px-2 py-0.5 md:px-2 md:py-1 mx-1 text-sm md:text-base bg-orange text-white rounded disabled:opacity-50">
        Предишна
      </button>
      <span class="mx-2 text-white text-sm md:text-base"> {{ currentSeriesPage }} от {{ totalSeriesPages }}</span >
      <button :disabled="currentSeriesPage === totalSeriesPages || series.length < 12" @click="currentSeriesPage++"
        class="px-2 py-0.5 md:px-2 md:py-1 mx-1 text-sm md:text-base bg-amber-700 text-white rounded disabled:opacity-50">
        Следваща
      </button>
    </div>

  </div>
</template>

<script setup>

const { movies, fetchMovies, totalPagesMovies } = useMovies();
const { series, fetchSerials, seriesTotalPage } = useSerials();
const tabs = ['Movies', 'Series'];
const activeTab = ref('Movies');

const currentPage = ref(1);
const currentSeriesPage = ref(1);

const totalMoviePages = ref(1);
const totalSeriesPages = ref(1);


watch(currentPage, async (newCurrentPage) => {
  await fetchMovies(newCurrentPage);
});

watch(currentSeriesPage, async (newCurrentSeriesPage) => {
  await fetchSerials(newCurrentSeriesPage);
});

onMounted(async () => {
  await fetchSerials(currentSeriesPage.value);
  await fetchMovies(currentPage.value);
  totalMoviePages.value = totalPagesMovies.value;
  totalSeriesPages.value = seriesTotalPage.value;
});

</script>

<style scoped>
button {
  transition: background-color 0.3s;
}
</style>
