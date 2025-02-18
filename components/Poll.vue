<template>
  <div class="mt-4 flex flex-col items-center">
    <div v-if="isLoading" class="flex justify-center items-center py-4">
      <!-- Loading indicator can be added here if needed -->
    </div>
    <div class="flex flex-col gap-4 w-full" v-else-if="!voted">
      <div class="bg-extralight rounded-lg p-6 shadow-lg border border-gray-700">
        <h3 class="text-md font-semibold mb-2 text-gray-200">Кой филм бихте искали да гледате в бъдеще?</h3 >
        <div class="flex flex-col gap-3" v-for="poll in polls" :key="poll.id">
          <div class="flex flex-col items-center justify-between">
            <label class="flex items-center p-3 rounded-md transition-colors cursor-pointer">
              <input type="radio" :name="`future_movie`" :value="poll.id" v-model="selectedMovie"
                class="mr-3 h-4 w-4 text-red-500" :disabled="voted">
              <span class="text-gray-300 hover:text-orange">{{ poll.poll.films[0] }}</span>
            </label>
            <button @click="showTrailer(poll.trailerUrl)"
              class="px-2 py-1 bg-orange hover:bg-amber-700 text-white rounded-md transition-colors">
              Watch Trailer
            </button>
            <hr class="m-2 w-full border border-gray-700">

          </div>
        </div>
        <button
          class="w-full bg-orange hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg mt-6 transition-colors duration-200 transform hover:scale-105"
          @click="handleVote" :disabled="voted">
          {{ voted ? 'Voted!' : 'Cast Your Vote' }}
        </button>
      </div>
    </div>
    <div v-else class="mt-4 flex flex-col items-center">
      <p class="text-gray-200">Вие гласувахте за: {{ votedMovie }}</p>
      <div class="mt-4 w-full">
        <div v-for="poll in polls" :key="poll.id" class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-400">{{ poll.poll.films[0] }}</span>
            <span class="text-sm text-gray-400">
              {{ poll.votes }} гласа
            </span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
            <div class="bg-orange h-2.5 rounded-full" :style="{ width: calculatePercentage(poll.votes) }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trailer Modal -->
    <div v-if="showTrailerModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-extralight p-4 rounded-lg w-[80vw] h-[80vh] relative">
        <button @click="closeTrailer" class="absolute top-2 right-2 text-gray-300 hover:text-white">
          <span class="text-3xl">&times;</span>
        </button>
        <div class="w-full h-full">
          <iframe :src="formattedTrailerUrl" class="w-full h-full" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePoll } from '../composables/usePoll';
import { votedApi } from '../composables/usePoll';

const { voted, vote } = usePoll('future_movie_poll'); // Pass a single poll ID for usePoll
const selectedMovie = ref(null); // Use a string to store a single selection
const votedMovie = ref(null);
const isLoading = ref(true);
const polls = ref([]);
const showTrailerModal = ref(false);
const currentTrailerUrl = ref('');

const formattedTrailerUrl = computed(() => {
  if (!currentTrailerUrl.value) return '';
  const videoId = currentTrailerUrl.value.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : currentTrailerUrl.value;
});

const totalVotes = computed(() => {
  return polls.value.reduce((sum, poll) => sum + poll.votes, 0);
});

const calculatePercentage = (votes) => {
    if (totalVotes.value === 0) {
        return '0%';
    }
  return `${(votes / totalVotes.value) * 100}%`;
};

onMounted(async () => {
  try {
    const response = await fetch('/api/poll');
    const data = await response.json();
    polls.value = data.body;
  } catch (error) {
    console.error("Error fetching polls:", error);
  }

  const storedData = localStorage.getItem('poll_future_movie_poll_voted'); // Use a consistent key
  if (storedData) {
    const { selected } = JSON.parse(storedData);
    votedMovie.value = selected;
    //  voted.value = true; // keep commented out
  }
  isLoading.value = false;
});

const handleVote = () => {
  if (selectedMovie.value) {
    const selectedPoll = polls.value.find(poll => poll.id === selectedMovie.value);
    if (selectedPoll) {
      votedMovie.value = selectedPoll.poll.films[0];
      vote(selectedPoll.poll.films[0]);
      votedApi(selectedPoll); // Pass the entire poll object
       // increment votes
      selectedPoll.votes++;
    }
    
  }
};

const showTrailer = (trailerUrl) => {
  currentTrailerUrl.value = trailerUrl;
  showTrailerModal.value = true;
};

const closeTrailer = () => {
  showTrailerModal.value = false;
  currentTrailerUrl.value = '';
};
</script>
