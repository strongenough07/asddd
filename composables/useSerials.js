export function useSerials() {
  const seriesTotalPage = ref([]);
    const series = ref([]);
    const serial = ref({});
    const loading = ref(false);
    const error = ref(null);
  
    const fetchSerials = async (page = 1) => {
      loading.value = true;
      error.value = null;
      try {
        const response = await useFetchApi(`/api/serials/serials?page=${page}`);
        response && (seriesTotalPage.value = response.totalPages);
        if (response && response.serials) {
          series.value = response.serials.map(serial => ({
            slug: serial.slug,
            title: serial.title,
            poster: serial.poster,
            rating: serial.rating,
            year: serial.year,
            director: serial.director
          }));
        }
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };
    const fetchSerial = async slug => {
      loading.value = true;
      error.value = null;
      try {
        const response = await useFetchApi(`/api/serials/serial?slug=${slug}`);
        if (response && response.serial) {
          serial.value = response.serial;
        } else {
          serial.value = [];
        }
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };
  
    return {
      seriesTotalPage,
      serial,
      series,
      loading,
      error,
      fetchSerials,
      fetchSerial
    };
  }