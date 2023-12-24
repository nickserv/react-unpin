import { readFile } from "fs/promises";
import { Octokit } from "octokit";

export default async function unpin() {
	const { version } = JSON.parse(
		await readFile("node_modules/next/package.json"),
	);
	const {
		data: { content },
	} = await new Octokit().rest.repos.getContent({
		owner: "vercel",
		repo: "next.js",
		path: "package.json",
		ref: `v${version}`,
	});
	const react = JSON.parse(atob(content)).devDependencies["react-builtin"];
	return react.substring(react.indexOf("@") + 1);
}
