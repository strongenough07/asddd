
export function useMovies() {
  const totalPagesMovies = ref(0);
  const movie = ref({});
  const movies = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchMovies = async (page = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await useFetchApi(`/api/movies/movies?page=${page}`);
      console.log(response);
      response && (totalPagesMovies.value = response.totalPages);
      if (response && response.movie) {
        movies.value = response.movie.map(movie => ({
          slug: movie.slug,
          title: movie.title,
          poster: movie.poster,
          rating: movie.rating,
          year: movie.year,
        }));
      }
      
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const fetchMovie = async slug => {
    loading.value = true;
    error.value = null;
    try {
      const response = await useFetchApi(`/api/movies/movie?slug=${slug}`);
      if (response && response.movie) {
        movie.value = response.movie;
      } else {
        movie.value = null;
      }
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };


 
  return {
    totalPagesMovies,
    movie,
    movies,
    loading,
    error,
    fetchMovies,
    fetchMovie
  };
}
