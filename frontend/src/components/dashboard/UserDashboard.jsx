import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import TicketList from '../ticket/TicketList';
import TicketForm from '../ticket/TicketForm';
import Button from '../common/Button';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <Button onClick={logout}>Logout</Button>
      </div>
      {user.role === 'user' && <TicketForm />}
      <TicketList />
    </div>
  );
};

export default UserDashboard;