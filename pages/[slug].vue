<template>
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
  </div>
  <div class="bg-dark text-white min-h-screen px-4 lg:px-0" v-else>
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto] ">
      <div>
        <div class="flex flex-col md:flex-row gap-6 p-4 md:p-8 items-center ">
          <div class="flex flex-col">
            <div class="w-full mx-auto max-w-[250px] max-h-[400px] lg:max-w-[300px] lg:max-h-[450px] rounded-lg   group">
              <img :src="`/api/images/${movieData.poster}`" :alt="movieData.title" width="300"
                height="400" class="w-full h-full object-center rounded-lg" />

            </div>
            <button @click="showTrailer = true"
              class="text-black bg-orange px-2 py-1 rounded-lg m-2 md:px-4 md:py-2 text-sm md:text-base">
              Гледай Трейлър
            </button>
          </div>
          <div class="flex-1">
            <h1 class="text-xl md:text-2xl font-bold mb-2 md:mb-4 ">{{ movieData.title }}</h1>
            <p class="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">{{ movieData.tagline }}</p>

            <button @click="showDetails = !showDetails"
              class="w-full py-2 px-4 bg-extralight rounded-lg text-left md:hidden mb-4 text-sm ">
              {{ showDetails ? 'Скрий Детайлите' : 'Покажи Детайлите' }}
            </button>

            <div :class="{ 'hidden md:grid': !showDetails }"
              class="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-4 text-sm">
              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Режисьор:</div>
                <div>{{ movieData.director }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Актьорски състав:</div>
                <div>{{ movieData.cast }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Сценарист:</div>
                <div>{{ movieData.writer }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Продуцент:</div>
                <div>{{ movieData.producer }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Редактор:</div>
                <div>{{ movieData.editor }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Кинематография:</div>
                <div>{{ movieData.cinematography }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Жанр:</div>
                <div>{{ movieData.genre }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Дата на издаване:</div>
                <div>{{ movieData.releaseDate }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Държава:</div>
                <div>{{ movieData.country }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Година:</div>
                <div>{{ movieData.year }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Продължителност:</div>
                <div>{{ movieData.duration }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Език:</div>
                <div>{{ movieData.translation }}</div>
              </div>

              <div class="flex flex-col md:flex-row gap-2">
                <div class="font-semibold">Рейтинг:</div>
                <div>{{ movieData.rating }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-4 py-2">
          <div class="mb-8 relative h-[300px] md:h-[600px] bg-gray-800 rounded-lg overflow-hidden max-w-full">
            <iframe :src="movieData.videoUrl" allowfullscreen ="allow-same-origin allow-scripts allow-popups allow-presentation allowfullscreen"></iframe>
          </div>
          <div v-if="movieData.streamingUrl && movieData.streamingUrl.episodes" class="mb-8">
            <h3 class="text-xl font-semibold mb-4">Избери Епизод</h3>
            <div class="flex flex-wrap gap-4">
              <button v-for="(episodeUrl, index) in movieData.streamingUrl.episodes" :key="index"
                @click="movieData.videoUrl = episodeUrl"
                class="px-2 py-0.5  text-black  rounded-md hover:bg-orange transition-colors duration-200"
                :class="{ 'bg-amber-700 text-white': episodeUrl === movieData.videoUrl, 'bg-orange': episodeUrl !== movieData.videoUrl }">
                Епизод {{ index + 1 }}
              </button>
            </div>
          </div>
          <div class="space-y-4">
            <div class="mb-6 max-w-[300px]">
              <h3 class="text-base md:text-lg font-semibold mb-4">Оценки</h3>
              <div class="flex flex-col gap-4">
                <div>
                  <div class="flex justify-between mb-2 text-sm md:text-base">
                    <span>Качество на Филма</span>
                    <span>{{ averageMovieRating }}/5</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-orange h-2.5 rounded-full" :style="`width: ${(averageMovieRating / 5) * 100}%`"></div>
                  </div>
                  <div class="flex gap-2 mt-2">
                    <button v-for="rating in 5" :key="rating" @click="rateMovie(rating)"
                      class="p-2 hover:bg-gray-100 rounded"
                      :class="{ 'text-yellow-500': rating <= movieRating, 'pointer-events-none': movieRated }"
                      :disabled="movieRated">
                      <span v-if="rating <= movieRating">★</span>
                      <span v-else>☆</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-2 text-sm md:text-base">
                    <span>Качество на Субтитрите</span>
                    <span>{{ averageSubtitleRating }}/5</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-orange h-2.5 rounded-full" :style="`width: ${(averageSubtitleRating / 5) * 100}%`">
                    </div>
                  </div>
                  <div class="flex gap-2 mt-2">
                    <button v-for="rating in 5" :key="rating" @click="rateSubtitle(rating)"
                      class="p-2 hover:bg-gray-100 rounded"
                      :class="{ 'text-yellow-500': rating <= subtitleRating, 'pointer-events-none': subtitleRated }"
                      :disabled="subtitleRated">
                      <span v-if="rating <= subtitleRating">★</span>
                      <span v-else>☆</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class=" py-2 px-4">
        <sideBar />
      </div>
    </div>

    <div v-if="showTrailer" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="relative w-full md:w-[80vw] h-[50vh] md:h-[80vh]">
        <button @click="showTrailer = false" class="absolute -top-10 right-0 text-white text-xl">&times; Close</button>
        <iframe :src="getYoutubeEmbedUrl(movieData.trailerUrl)" class="w-full h-full" allowfullscreen frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
const showTrailer = ref(false);
const showDetails = ref(false);
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const { updateRating, getAverageRating } = useRanting();

const movieRating = ref(0);
const subtitleRating = ref(0);
const movieRated = ref(false);
const subtitleRated = ref(false);
const averageMovieRating = ref(0);
const averageSubtitleRating = ref(0);

const localStorageMovieKey = `movie_rated_${slug}`;
const localStorageSubtitleKey = `subtitle_rated_${slug}`;


const getAverageRatingas = async () => {
  try {
    const { rating: movieAverageRating, subsRating: subtitleAverageRating } = await getAverageRating(slug);
    averageMovieRating.value = movieAverageRating;
    averageSubtitleRating.value = subtitleAverageRating;


  } catch (error) {
    console.error('Error fetching average rating:', error);
  }
}
onMounted(() => {
  const storedMovieRated = localStorage.getItem(localStorageMovieKey);
  const storedSubtitleRated = localStorage.getItem(localStorageSubtitleKey);
  const storedSerialRated = localStorage.getItem(`serial_rated_${slug}`);
  const storedSerialSubRated = localStorage.getItem(`serial_sub_rated_${slug}`);

  if (storedMovieRated) {
    movieRated.value = true;
  }
  if (storedSubtitleRated) {
    subtitleRated.value = true;
  }
  if (storedSerialRated) {
    movieRated.value = true; // Reuse movieRated for serial rating
  }
  if (storedSerialSubRated) {
    subtitleRated.value = true; // Reuse subtitleRated for serial sub rating
  }

  const storedMovieRating = localStorage.getItem(`movie_rating_${slug}`);
  const storedSubtitleRating = localStorage.getItem(`subtitle_rating_${slug}`);
  const storedSerialRating = localStorage.getItem(`serial_rating_${slug}`);
  const storedSerialSubRating = localStorage.getItem(`serial_sub_rating_${slug}`);

  if (storedMovieRating) {
    movieRating.value = parseInt(storedMovieRating);
  }
  if (storedSubtitleRating) {
    subtitleRating.value = parseInt(storedSubtitleRating);
  }
  if (storedSerialRating) {
    movieRating.value = parseInt(storedSerialRating); // Reuse movieRating for serial
  }
  if (storedSerialSubRating) {
    subtitleRating.value = parseInt(storedSerialSubRating); // Reuse subtitleRating for serial sub
  }

  getAverageRatingas();
});

const rateMovie = async (rating) => {
  if (!movieRated.value) {
    movieRating.value = rating;
    const newAverageRating = await updateRating(slug, 'movie', rating);
    averageMovieRating.value = newAverageRating;
    movieRated.value = true;
    localStorage.setItem(localStorageMovieKey, 'true');
    localStorage.setItem(`movie_rating_${slug}`, rating);
  }
}
const rateSubtitle = async (rating) => {
  if (!subtitleRated.value) {
    subtitleRating.value = rating;
    const newAverageRating = await updateRating(slug, 'subtitle', rating);
    averageSubtitleRating.value = newAverageRating;
    subtitleRated.value = true;
    localStorage.setItem(localStorageSubtitleKey, 'true');
    localStorage.setItem(`subtitle_rating_${slug}`, rating);
  }
}

const { movie, fetchMovie } = useMovies();
const { serial, fetchSerial } = useSerials();

const getYoutubeEmbedUrl = (url) => {
  if (!url) {
    return '';
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url; // Return the original URL if no match (or handle differently)
};

onBeforeMount(async () => {
  try {
    await Promise.all([fetchMovie(slug), fetchSerial(slug)]);
  } catch (error) {
    console.error("Failed to fetch movie or serial:", error);
  } finally {

  }
});

const movieData = computed(() => {

  return movie.value || serial.value || {};
});

watch(movieData, (newMovieData) => {
  isLoading.value = true;

  if (Object.keys(newMovieData).length === 0) {
    router.push('/');
  } else {
    isLoading.value = false;
  }
});

useHead(() => ({
  title: movieData.value.title ? `${movieData.value.title} - Гледай Онлайн Филми и Сериали | NextFlicks` : 'Гледай Онлайн Филми и Сериали | NextFlicks',
  meta: [
    {
      name: 'description',
      content: movieData.value.tagline ? `${movieData.value.title} (${movieData.value.year}) - ${movieData.value.tagline}. Гледайте онлайн на NextFlicks с български субтитри.` : `Гледайте ${movieData.value.title} (${movieData.value.year}) онлайн с български субтитри. Богат избор от филми и сериали.`,
    },
    {
      property: 'og:title',
      content: movieData.value.title ? `${movieData.value.title} - Гледай Онлайн | NextFlicks` : 'Гледай Онлайн Филми и Сериали | NextFlicks',
    },
    {
      property: 'og:description',
      content: movieData.value.tagline ? `${movieData.value.title} (${movieData.value.year}) - ${movieData.value.tagline}. Гледайте онлайн на NextFlicks с български субтитри.` : `Гледайте ${movieData.value.title} (${movieData.value.year}) онлайн с български субтитри. Богат избор от филми и сериали.`,
    },
    {
      property: 'og:image',
      content: movieData.value.poster || '/default-poster.jpg',
    },
    {
      property: 'og:url',
      content: `https://nextflicks.net/${movieData.value.slug}`
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'keywords',
      content: movieData.value.title ? `${movieData.value.title}, филми, сериали, онлайн филми, безплатно гледане, български субтитри, филми онлайн, сериали онлайн, гледай филми, гледай сериали, nextflicks, ${movieData.value.genre}, ${movieData.value.director}` : 'филми, сериали, онлайн филми, безплатно гледане, български субтитри, филми онлайн, сериали онлайн, гледай филми, гледай сериали, nextflicks'
    }
  ],
}));

</script>
<style scoped>
iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>