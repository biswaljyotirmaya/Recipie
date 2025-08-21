import { useState, useEffect } from 'react';
import { recipeAPI } from './services/api';
import Header from './components/Header';
import RecipeGrid from './components/RecipeGrid';
import SearchFilters from './components/SearchFilters';
import RecipeModal from './components/RecipeModal';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalPages: 1,
    totalElements: 0
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    fetchRecipes();
    fetchCuisines();
  }, [filters, pagination.page]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeAPI.searchRecipes({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      });

      const data = response.data;
      setRecipes(data.content || []);
      setPagination(prev => ({
        ...prev,
        totalPages: data.totalPages || 1,
        totalElements: data.totalElements || 0
      }));
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCuisines = async () => {
    try {
      const response = await recipeAPI.getAllCuisines();
      setCuisines(response.data || []);
    } catch (err) {
      console.error('Error fetching cuisines:', err);
    }
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecipeSelect = async (recipe) => {
    try {
      setSelectedRecipe(recipe);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching recipe details:', err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-4">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-rose-600 mb-3">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Try Again 🔄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-serif font-bold text-amber-900 mb-3">
            🍳 Discover Amazing Recipes
          </h1>
          <p className="text-amber-700 text-lg">
            Browse through our collection of delicious recipes from around the world 🌎
          </p>
        </div>

        <SearchFilters
          onSearch={handleSearch}
          cuisines={cuisines}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
              <p className="text-amber-700 font-medium">
                📊 Showing {recipes.length} of {pagination.totalElements} recipes
              </p>
              {pagination.totalElements > 0 && (
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
              )}
            </div>

            <RecipeGrid
              recipes={recipes}
              onRecipeSelect={handleRecipeSelect}
            />

            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex space-x-3 bg-white p-2 rounded-2xl shadow-lg">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-5 py-3 rounded-xl border border-amber-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-50 transition-all duration-300 flex items-center"
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-5 py-3 rounded-xl border font-semibold transition-all duration-300 ${pagination.page === pageNum
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-lg'
                            : 'border-amber-200 hover:bg-amber-50 text-amber-700'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-5 py-3 rounded-xl border border-amber-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-50 transition-all duration-300 flex items-center"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {isModalOpen && selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={closeModal}
        />
      )}

      {!loading && recipes.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-amber-800 mb-2">No recipes found</h3>
          <p className="text-amber-600">Try adjusting your search filters or try different keywords</p>
        </div>
      )}
    </div>
  );
}

export default App;