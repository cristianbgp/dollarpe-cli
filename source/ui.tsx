import React from "react";
import { Box, Text } from "ink";
import useSWR from "swr";
import fetch from "isomorphic-fetch";
import Link from "ink-link";

type ItemTypes = {
	name: string;
	buy: number;
	sell: number;
	isFirst: boolean;
};

interface PageUrlsTypes {
  [key: string]: string;
  roblex: string;
  rextie: string;
  tkambio: string;
  decamoney: string;
  kambista: string;
}

const pageUrls: PageUrlsTypes = {
	roblex: "https://roblex.pe/",
	rextie: "https://www.rextie.com/",
	tkambio: "https://tkambio.com/",
	decamoney: "https://decamoney.com/",
	kambista: "https://kambista.com/",
};

const Item = ({ name, buy, sell, isFirst }: ItemTypes) => (
	<Box flexDirection="column">
		<Link url={pageUrls[name]}>
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const App = () => {
	const { data } = useSWR<[string, { buy: number; sell: number }][]>(
		"https://dollarpe-site.vercel.app/api",
		fetcher,
		{ suspense: true }
	);

	return (
		<Box flexDirection="column">
			{data?.map(([name, { buy, sell }], index) => (
				<Item
					key={name}
					name={name}
					buy={buy}
					sell={sell}
					isFirst={index === 0}
				/>
			))}
		</Box>
	);
};

module.exports = App;
export default App;
