import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ user }) {
	if (user?.isAnonymous) return <Outlet />;

	return user ? <Outlet /> : <Navigate to="/sign-in" />;
}
