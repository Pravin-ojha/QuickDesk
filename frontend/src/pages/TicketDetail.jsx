import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketById, addComment, voteTicket } from '../services/ticketService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicketById(id);
        setTicket(data);
      } catch (err) {
        setError('Failed to load ticket');
      }
    };
    fetchTicket();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      setError('Comment is required');
      return;
    }
    try {
      await addComment(id, comment);
      const updatedTicket = await getTicketById(id);
      setTicket(updatedTicket);
      setComment('');
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  const handleVote = async (voteType) => {
    try {
      await voteTicket(id, voteType);
      const updatedTicket = await getTicketById(id);
      setTicket(updatedTicket);
    } catch (err) {
      setError('Failed to vote');
    }
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{ticket.subject}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="text-gray-700 mb-2">{ticket.description}</p>
      <p className="text-sm text-gray-500 mb-2">Status: {ticket.status}</p>
      <p className="text-sm text-gray-500 mb-4">Category: {ticket.category}</p>
      {ticket.attachment && (
        <a href={ticket.attachment} className="text-blue-600 underline mb-4 block">
          View Attachment
        </a>
      )}
      <div className="flex space-x-2 mb-4">
        <Button onClick={() => handleVote('upvote')}>Upvote ({ticket.upvotes || 0})</Button>
        <Button onClick={() => handleVote('downvote')}>Downvote ({ticket.downvotes || 0})</Button>
      </div>
      <h3 className="text-lg font-semibold mb-2">Conversation</h3>
      <div className="mb-4">
        {ticket.comments.map((comment) => (
          <div key={comment.id} className="p-2 border-b">
            <p className="text-gray-700">{comment.content}</p>
            <p className="text-sm text-gray-500">By {comment.user} at {new Date(comment.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleAddComment}>
        <Input
          label="Add Comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <Button type="submit">Submit Comment</Button>
      </form>
    </div>
  );
};

export default TicketDetail;