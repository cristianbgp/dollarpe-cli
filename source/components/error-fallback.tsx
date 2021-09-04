import React from "react";
import { Box, Text } from "ink";

const ErrorFallback = () => {
	return (
		<Box flexDirection="column">
			<Text color="red">Something went wrong ⚠️</Text>
			<Text color="red">Try again later</Text>
		</Box>
	);
};

// module.exports = ErrorFallback;
export default ErrorFallback;
