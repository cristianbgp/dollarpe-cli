import React, { useEffect, useState } from "react";
import { Text } from "ink";

const dots = {
	interval: 80,
	frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
};

const Fallback = () => {
	const [loader, setLoader] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setLoader((prevLoader) =>
				dots.frames.length - 1 === prevLoader ? 0 : prevLoader + 1
			);
		}, dots.interval);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text>{dots.frames[loader]} Loading...</Text>;
};

module.exports = Fallback;
export default Fallback;
