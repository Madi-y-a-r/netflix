import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
    movieId: string;
}


interface CurrentUser {
    favoriteIds: string[];
    [key: string]: any; 
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    
    const isFavorite = useMemo(() => {
        return (currentUser as CurrentUser)?.favoriteIds?.includes(movieId) ?? false;
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        if (!currentUser) {
            alert("You must be signed in to update favorites.");
            return;
        }
    
        try {
            let response;
    
            if (isFavorite) {
                response = await axios.delete('/api/favorite', { data: { movieId } });
            } else {
                response = await axios.post('/api/favorite', { data: { movieId } });
            }
    
            const updatedFavoriteIds = response?.data?.favoriteIds;
    
            mutate((prevUser: any) => ({
                ...prevUser,
                favoriteIds: updatedFavoriteIds,
            }), false);
    
            mutateFavorites();
        } catch (error) {
            console.error('Error toggling favorites:', error);
            alert('An error occurred while updating favorites. Please try again.');
        }
    }, [isFavorite, movieId, currentUser, mutate, mutateFavorites]);

    // Выбираем иконку в зависимости от состояния избранного
    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div onClick={toggleFavorites}
            className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
        >
            <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
        </div>
    );
};

export default FavoriteButton;
