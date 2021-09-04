'use strict';
const React = require("react");
const { Box, Text } = require("ink");

function ErrorFallback() {
	return (
		<Box flexDirection="column">
			<Text color="red">Something went wrong ⚠️</Text>
			<Text color="red">Try again later</Text>
		</Box>
	);
}

module.exports = ErrorFallback;
