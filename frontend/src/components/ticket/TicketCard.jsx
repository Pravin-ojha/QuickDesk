import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h3 className="text-lg font-semibold">{ticket.subject}</h3>
      <p className="text-gray-600">{ticket.description.substring(0, 100)}...</p>
      <p className="text-sm text-gray-500">Status: {ticket.status}</p>
      <p className="text-sm text-gray-500">Category: {ticket.category}</p>
      <Button onClick={() => navigate(`/tickets/${ticket.id}`)}>View Details</Button>
    </div>
  );
};

export default TicketCard;