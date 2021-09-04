#!/usr/bin/env node
import React, { Suspense } from "react";
import { render } from "ink";
import App from "./ui";
import Fallback from "./components/fallback";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/error-fallback";


render(
	<ErrorBoundary FallbackComponent={ErrorFallback}>
		<Suspense fallback={<Fallback />}>
			<App />
		</Suspense>
	</ErrorBoundary>
);
