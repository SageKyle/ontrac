import { Navigate, Outlet } from 'react-router-dom';

export default function LoginRoute({ user }) {
	return !user ? <Outlet /> : <Navigate to="/" />;
}
