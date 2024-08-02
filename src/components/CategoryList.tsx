import React from 'react';

interface CategoryListProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onSelectCategory }) => {
  return (
    <div>
      {categories.map(category => (
        <button key={category} onClick={() => onSelectCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
