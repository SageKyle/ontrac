// import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function CheckIfNotFirstTime() {
	const queryClient = useQueryClient();
	// get
	const queryResult = useQuery({
		queryKey: ['notFirstTime'],
		queryFn: checkLs,
	});

	// set
	const setQuery = useMutation({
		mutationFn: addLs,
		onSuccess: () => {
			queryClient.invalidateQueries(['notFirstTime']);
		},
	});

	const notFirstTime = queryResult.data,
		isPending = queryResult.isFetching,
		setNotFirstTime = setQuery.mutate;

	return { notFirstTime, setNotFirstTime, isPending };
}

// check local storage
function checkLs() {
	return localStorage.getItem('notFirstTime');
}

// set local storage
function addLs() {
	return localStorage.setItem('notFirstTime', 'true');
}
