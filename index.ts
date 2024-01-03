import { components } from "@octokit/openapi-types";
import { OctokitResponse } from "@octokit/types";
import { findUp } from "find-up-simple";
import { readFile } from "fs/promises";
import { Octokit } from "octokit";
import { Manifest } from "pacote";

export async function nextVersion(path?: string) {
	try {
		const manifestPath = await findUp("node_modules/next/package.json", {
			cwd: path,
		});
		const manifest: Manifest = JSON.parse(
			await readFile(manifestPath!, { encoding: "utf8" }),
		);
		return manifest.version;
	} catch {
		throw new Error("Next not found in node_modules");
	}
}

export async function nextManifest(version?: string): Promise<Manifest> {
	try {
		const response = (await new Octokit().rest.repos.getContent({
			owner: "vercel",
			repo: "next.js",
			path: "package.json",
			ref: version ? `v${version}` : undefined,
		})) as OctokitResponse<components["schemas"]["content-file"]>;
		return JSON.parse(atob(response.data.content));
	} catch {
		throw new Error("Next download from GitHub failed");
	}
}

export default async function reactVersion(path?: string) {
	const next = await nextVersion(path);
	const react = (await nextManifest(next)).devDependencies?.["react-builtin"];
	if (react) return react.substring(react.indexOf("@") + 1);
	else throw new Error(`React not pinned in Next ${next}`);
}
