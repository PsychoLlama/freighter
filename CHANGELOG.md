# Changelog
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Note: Only changes past `0.6.0` are documented.

## [Unreleased]
Changed:
- Bump all dependencies.
- Remove `git add` from precommit hook.
- Move prettier, jest, and eslint configs into `package.json`.
- Nest all `test` npm scripts under the `test:` namespace.

## [0.6.0]: 2020-05-15
Changed:
- Target node v10 as oldest compile target.
- Bump all dependencies (includes prettier v2).

## [0.5.0]: 2019-08-30
Changed:
- Allow `any` types in tests.

Added:
- Default TypeScript template extensible by packages.

## [0.4.0]: 2019-08-03
Changed:
- Rename `workspaces/` to `packages/`.

Added:
- TypeScript support.

Removed:
- Flow support ([yey! :tada:](https://i.kym-cdn.com/entries/icons/mobile/000/022/134/elmo.jpg)).

## [0.3.4]: 2019-03-08
Changed:
- Bump all dependencies.

## [0.3.3]: 2019-01-03
Fixed:
- Rename babel template file to avoid automatic execution (internal only).

## [0.3.2]: 2019-01-03
Fixed:
- Dynamically set Flow version while installing type definitions.

## [0.3.1]: 2019-01-01
Fixed:
- Reference error while scaffolding a new repository.

## [0.3.0]: 2019-01-01
Added:
- Support for Babel 7.

Changed:
- Set compile target to node v6.10.

Fixed:
- Pin Flow version when installing type definitions.

## [0.2.8]: 2018-11-09
Changed:
- Bump all dependencies.

## [0.2.7]: 2018-10-21
Changed:
- Bumped `dispute` dependency for automatic help page generation.

## [0.2.6]: 2018-10-16
Fixed:
- Specify correct freighter versions when bootstrapping a project.

Changed:
- Upgraded husky. The precommit hook moved from `pkg.scripts.precommit` to `pkg.husky.hooks.pre-commit`.
- Migrated to [dispute](https://github.com/PsychoLlama/dispute/). Some CLI behaviors may have changed.
- `freighter-scripts ci` allows linting and unit tests to finish before reporting the result.

Added:
- `--fix` option for `freighter-scripts lint`.
- `--watch` option for `freighter-scripts test`.

## [0.2.5]: 2018-09-10

## [0.2.4]: 2018-09-10
Fixed:
- Exit successfully during lint if no workspaces have been created yet.
- Exit successfully during unit tests if no workspaces have been created yet.

## [0.2.3]: 2018-09-09
Changed:
- `@freighter/cli`: Exit non-zero after printing help with no arguments.
- `@freighter/scripts`: Exit non-zero after printing help with no arguments.

Fixed:
- Lint the Jest config assuming it runs in a node environment.
- Inherit environment variables when running unit tests.

## [0.2.2]: 2018-09-09
Added:
- MIT license.
- `gitignore` template.
- Jest config template.
- Prettier config template.

## [0.2.1]: 2018-09-04
Changed:
- Publishing strategy uses lerna (internal-facing only).

## [0.2.0]: 2018-09-04
Fixed:
- Flow type inference between package siblings.
- Accidentally published relative link to an internal package.
- Added missing `flow-bin` dependency.

## [0.1.0]: 2018-09-04
Added:
- CLI tool to scaffold monorepos.
- Shareable ESLint config for monorepos.
- Shareable Jest preset for monorepos using Jest projects.
- Templates for Flow, prettier, and a `workspaces/README` file.
- Linting script tied to `npm run lint`.
- Testing script tied to `npm run test`
- CI test suite tied to `npm run ci`

[Unreleased]: https://github.com/PsychoLlama/freighter/compare/v0.6.0...HEAD
[0.6.0]: https://github.com/PsychoLlama/freighter/compare/v0.5.0..v0.6.0
[0.5.0]: https://github.com/PsychoLlama/freighter/compare/v0.4.0..v0.5.0
[0.4.0]: https://github.com/PsychoLlama/freighter/compare/v0.3.4..v0.4.0
[0.3.4]: https://github.com/PsychoLlama/freighter/compare/v0.3.3..v0.3.4
[0.3.3]: https://github.com/PsychoLlama/freighter/compare/v0.3.2..v0.3.3
[0.3.2]: https://github.com/PsychoLlama/freighter/compare/v0.3.1..v0.3.2
[0.3.1]: https://github.com/PsychoLlama/freighter/compare/v0.3.0..v0.3.1
[0.3.0]: https://github.com/PsychoLlama/freighter/compare/v0.2.8..v0.3.0
[0.2.8]: https://github.com/PsychoLlama/freighter/compare/v0.2.7..v0.2.8
[0.2.7]: https://github.com/PsychoLlama/freighter/compare/v0.2.6..v0.2.7
[0.2.6]: https://github.com/PsychoLlama/freighter/compare/v0.2.5..v0.2.6
[0.2.5]: https://github.com/PsychoLlama/freighter/compare/v0.2.4..v0.2.5
[0.2.4]: https://github.com/PsychoLlama/freighter/compare/v0.2.3..v0.2.4
[0.2.3]: https://github.com/PsychoLlama/freighter/compare/v0.2.2..v0.2.3
[0.2.2]: https://github.com/PsychoLlama/freighter/compare/v0.2.1..v0.2.2
[0.2.1]: https://github.com/PsychoLlama/freighter/compare/v0.2.0..v0.2.1
[0.2.0]: https://github.com/PsychoLlama/freighter/compare/v0.1.0..v0.2.0
[0.1.0]: https://github.com/PsychoLlama/freighter/releases/tag/v0.1.0
