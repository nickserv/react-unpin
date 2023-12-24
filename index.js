import { readFile } from "fs/promises";
import { Octokit } from "octokit";

async function nextVersion() {
	try {
		return JSON.parse(await readFile("node_modules/next/package.json")).version;
	} catch {
		throw new Error("Next not found in node_modules");
	}
}

async function nextPackage(version) {
	try {
		const response = await new Octokit().rest.repos.getContent({
			owner: "vercel",
			repo: "next.js",
			path: "package.json",
			ref: `v${version}`,
		});
		return JSON.parse(atob(response.data.content));
	} catch {
		throw new Error("Next download from GitHub failed");
	}
}

export default async function reactVersion() {
	const next = await nextVersion();
	const react = (await nextPackage(next)).devDependencies["react-builtin"];
	if (react) return react.substring(react.indexOf("@") + 1);
	else throw new Error(`React not pinned in Next ${next}`);
}
