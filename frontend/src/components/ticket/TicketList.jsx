import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import { getTickets } from '../../services/ticketService';
import Input from '../common/Input';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({ status: '', category: '', search: '' });
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets({ ...filters, page });
        setTickets(data.tickets);
      } catch (err) {
        setError('Failed to load tickets');
      }
    };
    fetchTickets();
  }, [filters, page]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tickets</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 flex space-x-4">
        <Input
          label="Search"
          id="search"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {/* Assume categories fetched dynamically */}
        </select>
      </div>
      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        <Button onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</Button>
        <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default TicketList;