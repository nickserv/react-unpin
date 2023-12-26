import { components } from "@octokit/openapi-types";
import { OctokitResponse } from "@octokit/types";
import { readFile } from "fs/promises";
import { Octokit } from "octokit";
import { Manifest } from "pacote";

async function nextVersion() {
	try {
		const manifest: Manifest = JSON.parse(
			await readFile("node_modules/next/package.json", { encoding: "utf8" }),
		);
		return manifest.version;
	} catch {
		throw new Error("Next not found in node_modules");
	}
}

async function nextManifest(version: string): Promise<Manifest> {
	try {
		const response = (await new Octokit().rest.repos.getContent({
			owner: "vercel",
			repo: "next.js",
			path: "package.json",
			ref: `v${version}`,
		})) as OctokitResponse<components["schemas"]["content-file"]>;
		return JSON.parse(atob(response.data.content));
	} catch {
		throw new Error("Next download from GitHub failed");
	}
}

export default async function reactVersion() {
	const next = await nextVersion();
	const react = (await nextManifest(next)).devDependencies?.["react-builtin"];
	if (react) return react.substring(react.indexOf("@") + 1);
	else throw new Error(`React not pinned in Next ${next}`);
}
