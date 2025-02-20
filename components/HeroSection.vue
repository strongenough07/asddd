<template>
  <div class=" m-2.5 relative h-[600px] bg-dark hidden md:block">
    <!-- Background image -->
    <div class="absolute inset-0 ">
      <img
        src="/public/movie1.webp"
        alt="Luxury home"
        class="rounded-lg w-full h-full object-cover "
      />
    </div>

    <!-- Content overlay -->
    <div class="relative h-full w-1/2 flex flex-col justify-end px-4 sm:px-6 lg:px-8 select-none">
      <h1 class="text-wrap text-4xl sm:text-5xl lg:text-6xl font-bold text-orange mb-4 ">
        Най-новите филми и сериали 
      </h1>
      <p class="text-lg sm:text-xl text-white max-w-3xl mb-2">
        AI генерирани субтитри</p>
        <p class="text-lg sm:text-xl text-white max-w-3xl mb-2">
          внимателно проверени от редактори </p>
          <p class="text-lg sm:text-xl text-white max-w-3xl mb-8">
            достигнати до теб за уникално филмово изживяване. </p>
          
    
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const movies = [
  {
    title: 'Inception',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
  },
  {
    title: 'The Matrix',
    description:
      'A computer hacker learns about the true nature of his reality and his role in the war against its controllers.',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg',
    genres: ['Action', 'Sci-Fi'],
  },
  {
    title: 'Avatar',
    description:
      'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following orders and protecting the world he feels is his home.',
    poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzEzXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg',
    genres: ['Action', 'Adventure', 'Fantasy'],
  },
];

const currentMovieIndex = ref(0);
let interval;

onMounted(() => {
  // interval = setInterval(() => {
  //   currentMovieIndex.value =
  //     (currentMovieIndex.value + 1) % movies.length;
  // }, 5000); // Смяна на филма на всеки 5 секунди
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
/* Примерни стилове за по-добър вид */
main {
  min-height: 100vh;
}
</style>
