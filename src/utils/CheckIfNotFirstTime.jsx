import { useCallback, useEffect, useState } from 'react';

export default function CheckIfNotFirstTime() {
	const [notFirstTime, updateNotFirstTime] = useState(null);

	const setNotFirstTime = useCallback(() => {
		localStorage.setItem('notFirstTime', 'true');
		updateNotFirstTime(true);
	}, []);

	useEffect(() => {
		updateNotFirstTime(localStorage.getItem('notFirstTime'));
	}, []);

	return { notFirstTime, setNotFirstTime };
}
