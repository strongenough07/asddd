import { ref } from 'vue';
import useFetchApi from './useFetchApi';

export default function useRanting() {
    const averageRating = ref(0);

    const updateRating = async (slug, type, rating) => {
        try {
            const { averageRating: newAverageRating } = await useFetchApi('/api/rating', {
                method: 'POST',
                body: {
                    slug,
                    type,
                    rating
                }
            });
            averageRating.value = newAverageRating;
            return newAverageRating
        } catch (error) {
            console.error("Could not update rating", error)
            return 0
        }
    }
    const getAverageRating = async (slug) => {
        try {
            const { rating, subsRating, serialRating } = await useFetchApi(`/api/rating/getRating?slug=${slug}`, {
                method: 'GET',
            });
            
                return { rating, subsRating, serialRating }
           
        } catch (error) {
            console.error("Could not get average rating", error)
            return 0
        }
    }

    return {
        averageRating,
        updateRating,
        getAverageRating
    }
}

