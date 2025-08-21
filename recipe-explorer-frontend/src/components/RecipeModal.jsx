import { X, Clock, Star, Users } from 'lucide-react';
import { useEffect } from 'react';

const RecipeModal = ({ recipe, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const formatTime = (minutes) => {
    if (!minutes) return 'N/A';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" 
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 rounded-full p-2 transition-colors shadow-md"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
          <div className="p-6">
            <h2 className="font-serif font-bold text-3xl text-gray-800 mb-4">
              {recipe.title || 'Untitled Recipe'}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              {recipe.cuisine && (
                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">
                  {recipe.cuisine}
                </span>
              )}
              {recipe.rating && (
                <span className="flex items-center bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full">
                  <Star className="h-4 w-4 text-amber-500 fill-current mr-1.5" />
                  {recipe.rating.toFixed(1)}
                </span>
              )}
              {recipe.totalTime && (
                <span className="flex items-center bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full">
                  <Clock className="h-4 w-4 mr-1.5" />
                  {formatTime(recipe.totalTime)}
                </span>
              )}
              {recipe.servings && (
                <span className="flex items-center bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full">
                  <Users className="h-4 w-4 mr-1.5" />
                  {recipe.servings} servings
                </span>
              )}
              {recipe.calories && (
                <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full">
                  {Math.round(recipe.calories)} cal
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif font-bold text-xl mb-4 text-gray-800 border-b pb-2">Ingredients</h3>
                <ul className="space-y-3">
                  {recipe.ingredients?.length ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">Ingredients not available</li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl mb-4 text-gray-800 border-b pb-2">Instructions</h3>
                <ol className="space-y-4">
                  {recipe.instructions?.length ? (
                    recipe.instructions.map((step, index) => (
                      <li key={index} className="flex">
                        <span className="bg-primary-100 text-primary-700 font-medium rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{step}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">Instructions not available</li>
                  )}
                </ol>
              </div>
            </div>

            {recipe.description && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-serif font-bold text-xl mb-3 text-gray-800">Description</h3>
                <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;