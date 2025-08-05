import { create } from 'zustand';

const useRecipeStore = create((set) => ({
    recipes: [],
    addRecipe: (recipe) => set((state) => ({ recipes: [...state.recipes, recipe] })),
    deleteRecipe: (id) => set((state) => ({ recipes: state.recipes.filter(recipe => recipe.id !== id)  })),
    updateRecipe: (updatedRecipe) => set((state) => ({ recipes: state.recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe) }))    
}));

export default useRecipeStore;