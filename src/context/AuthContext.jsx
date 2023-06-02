import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };

		case 'LOGOUT':
			return { ...state, user: null };

		case 'AUTH_IS_READY':
			return { ...state, user: action.payload, authIsReady: true };

		default:
			return state;
	}
}

export function AuthContextProvider({ children }) {
	const auth = getAuth();
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		authIsReady: false,
	});

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			dispatch({ type: 'AUTH_IS_READY', payload: user });
		});
		unsub();
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}
