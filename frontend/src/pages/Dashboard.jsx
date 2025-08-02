import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserDashboard from '../components/dashboard/UserDashboard';
import CategoryManagement from '../components/admin/CategoryManagement';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      {user.role === 'admin' ? <CategoryManagement /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;