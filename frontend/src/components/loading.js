import React, { useState, useEffect } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';

function Loading({ loading, setLoading }) {

	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!loading) return;
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 100 && loading) {
					setLoading(false);
					return 0;
				}
				const diff = Math.random() * 50;
				return Math.min(oldProgress + diff, 100);
			});
		}, 200);

		return () => {
			clearInterval(timer);
		};
	}, [loading]);

	return (
		<LinearProgress variant="determinate" value={progress} />
	)

}
export default Loading;