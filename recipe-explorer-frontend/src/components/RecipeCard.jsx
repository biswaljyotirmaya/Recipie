import { Clock, Star, Users, Flame } from 'lucide-react';

const RecipeCard = ({ recipe, onClick }) => {
    const formatTime = (minutes) => {
        if (!minutes) return 'N/A';
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };

    return (
        <div
            className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 cursor-pointer 
                 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 h-full flex flex-col"
            onClick={onClick}
        >
            <div className="flex justify-between items-start mb-4">
                {recipe.cuisine && (
                    <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-semibold">
                        {recipe.cuisine}
                    </span>
                )}
                {recipe.rating && (
                    <div className="flex items-center bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1.5 rounded-full">
                        <Star className="h-4 w-4 fill-amber-500 mr-1.5" />
                        <span className="text-sm font-bold">{recipe.rating.toFixed(1)}</span>
                    </div>
                )}
            </div>

            <h3 className="font-serif font-bold text-xl text-gray-800 mb-5 line-clamp-2 group-hover:text-primary-600 transition-colors flex-grow">
                {recipe.title || 'Untitled Recipe'}
            </h3>

            <div className="grid grid-cols-3 gap-3 mt-auto">
                {recipe.totalTime && (
                    <div className="flex flex-col items-center p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 group-hover:shadow-sm transition-shadow">
                        <div className="bg-amber-100 p-2 rounded-full mb-2">
                            <Clock className="h-5 w-5 text-amber-700" />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{formatTime(recipe.totalTime)}</span>
                    </div>
                )}

                {recipe.servings && (
                    <div className="flex flex-col items-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 group-hover:shadow-sm transition-shadow">
                        <div className="bg-blue-100 p-2 rounded-full mb-2">
                            <Users className="h-5 w-5 text-blue-700" />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{recipe.servings}</span>
                    </div>
                )}

                {recipe.calories && (
                    <div className="flex flex-col items-center p-3 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100 group-hover:shadow-sm transition-shadow">
                        <div className="bg-red-100 p-2 rounded-full mb-2">
                            <Flame className="h-5 w-5 text-red-700" />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{Math.round(recipe.calories)}</span>
                    </div>
                )}
            </div>

            <div className="mt-5 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </div>
    );
};

export default RecipeCard;