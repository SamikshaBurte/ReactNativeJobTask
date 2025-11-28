import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculatePrice } from '../utils/calculations';

const AppContext = createContext();
const SAVED_STORAGE_KEY = 'rnJobTaskSavedItems';

export const AppProvider = ({ children }) => {
    const [feedItems, setFeedItems] = useState([]); // Master list of all items
    const [savedItems, setSavedItems] = useState([]); // Favorites list (Persistence target)
    const [isLoading, setIsLoading] = useState(true); // Loading indicator for initial fetch

    const loadSavedItems = useCallback(async () => {
        try {
            const storedItems = await AsyncStorage.getItem(SAVED_STORAGE_KEY);
            if (storedItems) {
                setSavedItems(JSON.parse(storedItems));
            }
        } catch (error) {
            console.error("Persistence Load Error:", error);
        }
    }, []);

    const fetchMeals = useCallback(async () => {
        if (feedItems.length > 0) {
            setIsLoading(false);
            return; 
        }
        
        try {
            const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=c'; 
            const response = await fetch(API_URL);
            const data = await response.json();
            
            if (data.meals) {
                const processedMeals = data.meals.map(meal => ({
                    id: meal.idMeal,
                    title: meal.strMeal,
                    description: meal.strInstructions,
                    imageUrl: meal.strMealThumb,
                    priceDetails: calculatePrice(meal.strMeal, meal.strInstructions) 
                }));
                setFeedItems(processedMeals);
            }
        } catch (error) {
            console.error("API Fetch Error:", error);
        } finally {
            setIsLoading(false);
        }
    }, [feedItems.length]);
    
    useEffect(() => {
        loadSavedItems();
        fetchMeals();
    }, [loadSavedItems, fetchMeals]);

    useEffect(() => {
        const saveItems = async () => {
             try {
                await AsyncStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedItems));
            } catch (error) {
                console.error("Persistence Save Error:", error);
            }
        };
        saveItems();
    }, [savedItems]);


    const toggleFavorite = (item) => {
        setSavedItems(prevSaved => {
            const exists = prevSaved.some(i => i.id === item.id);
            if (exists) {
                return prevSaved.filter(i => i.id !== item.id);
            } else {
                return [...prevSaved, item];
            }
        });
    };

    const removeItemFromFeed = (id) => {
        setFeedItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <AppContext.Provider 
            value={{
                feedItems,
                savedItems,
                isLoading,
                toggleFavorite,
                removeItemFromFeed,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};