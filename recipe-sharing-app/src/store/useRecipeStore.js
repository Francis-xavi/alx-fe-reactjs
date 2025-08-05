import { create } from 'zustand';

const useRecipeStore = create((set) => ({
    recipes: [],
    addrecipe: (newrecipe) => set((state) => ({
        recipes: [...state.recipes, newrecipe]
    })),
    setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;