# Freighter
> Monorepos without the hassle

:construction: Danger: unstable hobby project :construction:

Freighter scaffolds and manages monorepo configurations. Here's what you get right out of the box:
- [Yarn Workspaces](https://yarnpkg.com/en/docs/workspaces)
- [Jest projects](https://jestjs.io/docs/en/configuration.html#projects-array-string-projectconfig)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Flow](https://flow.org/)
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

## Guarantees
For now, none. I built this project because I was tired of configuring monorepos for personal projects (I just really like monorepos, okay?)

If Freighter ends up requiring more continuous effort than it's worth, I'll probably abandon it.

:dragon: You've been warned.

## Why the name?
Because freighters ship containers. npm packages are kinda like containers. Therefore, monorepos are freighters. #science

## Accelerating the project
If you think Freighter is cool and you wish it was farther along, star the project. It'll help me gauge interest.
