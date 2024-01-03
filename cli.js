#!/usr/bin/env node
import unpin from "./index.js";

console.log(await unpin(process.argv[2]));
