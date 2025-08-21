import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchFilters = ({ onSearch, cuisines }) => {
  const [filters, setFilters] = useState({
    title: '',
    cuisine: '',
    minRating: '',
    maxRating: '',
    maxTotalTime: '',
    maxCalories: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      title: '',
      cuisine: '',
      minRating: '',
      maxRating: '',
      maxTotalTime: '',
      maxCalories: ''
    });
    onSearch({});
  };

  return (
    <div className="card p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Search by title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={filters.title}
                onChange={handleInputChange}
                placeholder="Search recipes..."
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
              Cuisine
            </label>
            <select
              id="cuisine"
              name="cuisine"
              value={filters.cuisine}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">All cuisines</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Rating
            </label>
            <input
              type="number"
              id="minRating"
              name="minRating"
              min="0"
              max="5"
              step="0.1"
              value={filters.minRating}
              onChange={handleInputChange}
              placeholder="0.0"
              className="input-field"
            />
          </div>
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="maxRating" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Rating
              </label>
              <input
                type="number"
                id="maxRating"
                name="maxRating"
                min="0"
                max="5"
                step="0.1"
                value={filters.maxRating}
                onChange={handleInputChange}
                placeholder="5.0"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="maxTotalTime" className="block text-sm font-medium text-gray-700 mb-1">
                Max Preparation Time (mins)
              </label>
              <input
                type="number"
                id="maxTotalTime"
                name="maxTotalTime"
                min="0"
                value={filters.maxTotalTime}
                onChange={handleInputChange}
                placeholder="e.g., 60"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="maxCalories" className="block text-sm font-medium text-gray-700 mb-1">
                Max Calories
              </label>
              <input
                type="number"
                id="maxCalories"
                name="maxCalories"
                min="0"
                value={filters.maxCalories}
                onChange={handleInputChange}
                placeholder="e.g., 500"
                className="input-field"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <Filter className="h-4 w-4 mr-1" />
            {isExpanded ? 'Fewer filters' : 'More filters'}
          </button>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary"
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;