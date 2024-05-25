import assert from "assert/strict";
import test from "node:test";
import reactVersion, { nextManifest, nextVersion } from "./index.js";

test("nextVersion", async () => {
	assert.equal(await nextVersion(), "14.0.4");
});

test("nextManifest", async () => {
	assert.notDeepEqual(await nextManifest(), {});
});

test("reactVersion", async () => {
	assert.match(await reactVersion(), /^18\.3\.0-canary-/);
});
