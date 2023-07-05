"use strict";
const React = require("react");
const { Box, Text } = require("ink");
const fetch = require("isomorphic-fetch");
const Link = require("ink-link");
const { default: useSWR } = require("swr");
const { ErrorBoundary } = require("react-error-boundary");
const importJsx = require("import-jsx");

const ErrorFallback = importJsx("./error-fallback");
const Fallback = importJsx("./fallback");

function Item({ name, buy, sell, isFirst, pageUrl }) {
	return (
		<Box flexDirection="column">
			<Link url={pageUrl}>
				<Text color="red">{name}</Text>
			</Link>
			<Box flexDirection="column" marginLeft={2}>
				<Box justifyContent="flex-start">
					<Text color="blue">buy: </Text>
					<Text color={isFirst ? "green" : "white"}>{buy}</Text>
				</Box>
				<Box>
					<Text color="blue">sell: </Text>
					<Text color={isFirst ? "green" : "white"}>{sell}</Text>
				</Box>
			</Box>
		</Box>
	);
}

function fetcher(url) {
	return fetch(url).then((res) => res.json());
}

function Wrapper() {
	const { data } = useSWR("https://dollarpe-site.vercel.app/api", fetcher, {
		suspense: true,
	});

	return (
		<Box flexDirection="column">
			{(data || []).map(([name, { buy, sell, pageUrl }], index) => (
				<Item
					key={name}
					name={name}
					buy={buy}
					sell={sell}
					pageUrl={pageUrl}
					isFirst={index === 0}
				/>
			))}
		</Box>
	);
}

function App() {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<React.Suspense fallback={<Fallback />}>
				<Wrapper />
			</React.Suspense>
		</ErrorBoundary>
	);
}

module.exports = App;
