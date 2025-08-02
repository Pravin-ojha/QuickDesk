import React, { useState, useEffect } from 'react';
import { getCategories, createCategory } from '../../services/ticketService';
import Input from '../common/Input';
import Button from '../common/Button';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) {
      setError('Category name is required');
      return;
    }
    try {
      const newCat = await createCategory(newCategory);
      setCategories([...categories, newCat]);
      setNewCategory('');
    } catch (err) {
      setError('Failed to add category');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAddCategory} className="mb-4">
        <Input
          label="New Category"
          id="newCategory"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <Button type="submit">Add Category</Button>
      </form>
      <ul className="list-disc pl-5">
        {categories.map((cat) => (
          <li key={cat.id} className="text-gray-700">{cat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;