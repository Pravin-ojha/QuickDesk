import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import { createTicket, getCategories } from '../../services/ticketService';

const TicketForm = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !description || !category) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('description', description);
    formData.append('categoryId', category);
    if (attachment) formData.append('attachment', attachment);

    try {
      await createTicket(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Input
        label="Subject"
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
          Attachment (Optional)
        </label>
        <input
          id="attachment"
          type="file"
          onChange={(e) => setAttachment(e.target.files[0])}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <Button type="submit">Submit Ticket</Button>
    </form>
  );
};

export default TicketForm;