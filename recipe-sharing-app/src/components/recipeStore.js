import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    // Trigger filtering automatically when term is updated
    get().filterRecipes();
  },

  setRecipes: (recipes) => {
    set({ recipes });
    get().filterRecipes(); // Keep filteredRecipes in sync
  },

  addRecipe: (recipe) => {
    set((state) => ({
      recipes: [...state.recipes, recipe]
    }));
    get().filterRecipes(); // Update filtered list
  },

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    })),
}));

export default useRecipeStore;