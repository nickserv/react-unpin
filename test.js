import assert from "assert/strict";
import test from "node:test";
import reactVersion, { nextManifest, nextVersion } from "./index.js";

test("nextVersion", async () => {
	assert.equal(await nextVersion(), "15.0.0-rc.0");
});

test("nextManifest", async () => {
	assert.notDeepEqual(await nextManifest(), {});
});

test("reactVersion", async () => {
	assert.match(await reactVersion(), /^19\.0\.0-rc-/);
});
