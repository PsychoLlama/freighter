<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/PsychoLlama/freighter@03c3474d12d5d7e4564ec4da729dcbfce41813de/assets/logo.png" alt="freighter logo" width="200" align="center" />
  <h1>Freighter</h1>
  <p>Monorepos without the hassle.</p>
</div>

## Project Status

:no_entry: UNMAINTAINED

Too much work, not enough reward. The downside of a lego-brick ecosystem is that nothing has cohesion. To properly build Freighter, it would require forking much of the ecosystem and combining it into a monolithic build system, which is far out of scope.

It was a fun experiment, but I'll settle for a bespoke build process in the future.

## Purpose

Freighter scaffolds and manages monorepo configurations. Here's what you get right out of the box:
- [Yarn Workspaces](https://yarnpkg.com/en/docs/workspaces)
- [Jest projects](https://jestjs.io/docs/en/configuration.html#projects-array-string-projectconfig)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Lerna](https://lernajs.io/)
- [Babel 7](https://babeljs.io/blog/2018/08/27/7.0.0)
- Code quality checks with precommit hooks
- A solid CI script in a single command

## Usage
Requirements: you've already got `yarn` and `git` installed.

Installation:
```bash
$ yarn global add @freighter/cli
```

Now you should have a new `freighter` command in the terminal. Try out the `init` command:

```bash
$ freighter init new-project
```

In about 15-30 seconds, you should have yourself a fancy, batteries-included monorepo :tada:

Here are the scripts you'll probably find useful:
- `yarn lint` runs ESLint on all the packages
- `yarn test` runs every test in the monorepo
- `yarn flow` type checks everything
- `yarn ci` run all 3 in CI mode

## Guarantees
None.

I built Freighter because it can take days to configure all the tooling that makes monorepos so enjoyable. I don't want to spend days. Frankly, I'd rather be building apps. So if Freighter ends up being more work than it's worth, I'll abandon it.

:dragon: You've been warned.

## Why the name?
Because freighters ship containers. npm packages are kinda like containers. Therefore, monorepos are freighters. `#science`

## Accelerating the project
If you like the idea of Freighter, give it a star :star:

It'll help me gauge interest in the project.
