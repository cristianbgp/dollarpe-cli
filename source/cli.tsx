#!/usr/bin/env node
import React, { Suspense } from "react";
import { render } from "ink";
import meow from "meow";
import App from "./ui";
import Fallback from "./components/Fallback";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";

// @ts-ignore
const cli = meow(`
	Usage
	  $ dollarpe

	Examples
	  $ dollarpe
	  tkambio:
			buy:  4.066
			sell: 4.105
		decamoney:
			buy:  4.0642
			sell: 4.1034
		kambista:
			buy:  4.06
			sell: 4.098
		roblex:
			buy:  4.055
			sell: 4.105
		rextie:
			buy:  4.052
			sell: 4.094
`);

render(
	<ErrorBoundary FallbackComponent={ErrorFallback}>
		<Suspense fallback={<Fallback />}>
			<App />
		</Suspense>
	</ErrorBoundary>
);
