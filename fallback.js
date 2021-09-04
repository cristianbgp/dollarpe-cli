'use strict';
const React = require("react");
const { Text } = require("ink");

const dots = {
	interval: 80,
	frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
};

const Fallback = () => {
	const [loader, setLoader] = React.useState(0);

	React.useEffect(() => {
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
