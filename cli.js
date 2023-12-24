#!/usr/bin/env node
import unpin from "./index.js";

try {
	console.log(await unpin());
} catch {
	console.error("Error: Next or React version not found");
	process.exitCode = 1;
}
