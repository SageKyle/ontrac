import { useEffect, useState } from 'react';

export default function CheckIfNotFirstTime() {
	const [notFirstTime, setNotFirstTime] = useState(true);

	useEffect(() => {
		setNotFirstTime(false);
	}, []);

	return { notFirstTime, setNotFirstTime };
}
