import { Utensils } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <Utensils className="h-8 w-8 text-primary-600" />
          <h1 className="text-2xl font-serif font-bold text-gray-900">Recipe Explorer</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;