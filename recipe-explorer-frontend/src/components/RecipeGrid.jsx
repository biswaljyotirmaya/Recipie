import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onRecipeSelect }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
        <p className="text-gray-600">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard 
          key={index} 
          recipe={recipe} 
          onClick={() => onRecipeSelect(recipe)}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;