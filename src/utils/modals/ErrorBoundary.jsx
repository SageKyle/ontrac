import { useState } from 'react';

export default function ErrorBoundaryWrapper(WrappedComponent) {
	return function ErrorBoundary(props) {
		const [error, setError] = useState(null);

		if (error) {
			return <div>An error occurred: {error.toString()}</div>;
		}

		try {
			return <WrappedComponent {...props} />;
		} catch (err) {
			setError(err);
		}
	};
}
