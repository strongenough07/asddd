

export const useSearch = () => {
    const route = useRoute();
    const router = useRouter();
    const searchResults = ref(null);

    const search = async (query) => {
        try {
            const { data } = await useFetch(`/api/search?query=${query}`);
            searchResults.value = data.value;
           
        } catch (error) {
            console.error('Error during search:', error);
            searchResults.value = null;
        }
    };

    return {
        search,
        searchResults,
    };
};
