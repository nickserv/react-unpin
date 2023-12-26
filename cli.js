#!/usr/bin/env node
import unpin from "./index.js";

try {
	console.log(await unpin());
} catch (error) {
	if (error) console.error(error.toString());
	process.exitCode = 1;
}
