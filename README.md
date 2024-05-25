# `react-unpin`

> Unpin your framework's React version to install it locally

This helps to avoid breaking changes between
[React Canaries](https://react.dev/community/versioning-policy#canary-channel)
used by your framework and other tools, such as when using Server Components in
tests, docs, or monorepo packages.

<!-- prettier-ignore-start -->
> [!NOTE]
> This is unnecessary with newer versions of Next (since `14.3.0-canary.45` and
> `15.0.0-rc.0`), which have started using `peerDependencies` to keep the React
> version consistent.
<!-- prettier-ignore-end -->

## [API Docs](https://tsdocs.dev/docs/react-unpin)

## Usage

```
unpin [path]
```

```
react-unpin [path]
```

By default, `unpin` and `react-unpin` will print the React version pinned in the
current directory's package. You can optionally provide a single path to check a
different directory's package. The React version pinned by Server Component
frameworks typically starts with `18.3.0-canary-` or `19.0.0-canary-`.

### Zero Install

```
npx react-unpin@latest
```

```
yarn dlx react-unpin
```

```
pnpm dlx react-unpin
```

```
bun x react-unpin
```

### Local Install

Installing `react-unpin` locally isn't necessary unless you want to use it in a
library or script.

```
npm install react-unpin
```

```
yarn add react-unpin
```

```
pnpm add react-unpin
```

```
bun add react-unpin
```

## Caveats

- Only Next app router is supported currently since Next has the strongest
  support for Server Components and its pages router doesn't pin React.
  [#9](https://github.com/nickmccurdy/react-unpin/issues/9)
  [#10](https://github.com/nickmccurdy/react-unpin/issues/10)
- A `node_modules` directory is required to resolve local Next installations,
  therefore Yarn PnP is unsupported.
  [#2](https://github.com/nickmccurdy/react-unpin/issues/2)
- Internet access is required to read Next's source code since its package
  manifests exclude pinned React versions.
  [#11](https://github.com/nickmccurdy/react-unpin/issues/11)
