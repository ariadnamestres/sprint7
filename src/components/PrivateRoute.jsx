import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { status } = useSelector((state) => state.auth);

  if (status !== 'authenticated') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute