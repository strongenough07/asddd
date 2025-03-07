import { ref, onMounted } from 'vue';
const vote = ref(false);

export function usePoll(pollId) {
  const voted = ref(false);
  const storageKey = `poll_${pollId}_voted`;
  const selectedMovie = ref(null);

  const vote = (movie) => {
    voted.value = true;
    selectedMovie.value = movie;
    const timestamp = new Date().getTime();
    localStorage.setItem(storageKey, JSON.stringify({ timestamp, selected: movie }));
  };


  const checkVoted = () => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      const { timestamp, selected } = JSON.parse(storedData);
      const now = new Date().getTime();
      const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
      if (now - timestamp < oneWeek) {
        voted.value = true;
        selectedMovie.value = selected;
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  };

  onMounted(checkVoted);

  return {
    voted,
    vote,
    selectedMovie,
    votedApi,
  };
}

export const votedApi = async (movie) => {
  try {
    await fetch(`/api/poll/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movie }),
    });
  } catch (error) {
    console.error('Failed to vote:', error);
  }
};
