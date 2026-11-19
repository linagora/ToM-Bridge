# Changelog

## [v1.2.0](https://github.com/linagora/tom-bridge/compare/v1.1.0...v1.2.0) (2026-11-19)

### Features

* name the default channel after its space (#63)
([0e4c16f](https://github.com/linagora/tom-bridge/commit/0e4c16f))

### Bug Fixes

* ignore sync requests before validating them (#62)
([ff1ccb6](https://github.com/linagora/tom-bridge/commit/ff1ccb6))
* create the account of a user Synapse answers 404 for
([65daa13](https://github.com/linagora/tom-bridge/commit/65daa13))
* stop adding TwakeSpace's user to the Matrix spaces
([7307dcc](https://github.com/linagora/tom-bridge/commit/7307dcc))

## [v1.1.0](https://github.com/linagora/tom-bridge/compare/v1.0.2...v1.1.0) (2026-10-30)

### Features

* mirror Twake Space spaces as Matrix spaces (#10)
([5bf41eb](https://github.com/linagora/tom-bridge/commit/5bf41eb))
* erase the matrix account of a deleted user (#2)
([71dc162](https://github.com/linagora/tom-bridge/commit/71dc162))
* write a row only when it is newer than the stored one
([c68c2bc](https://github.com/linagora/tom-bridge/commit/c68c2bc))

### Bug Fixes

* replace a room left by a failed space creation
([6766c44](https://github.com/linagora/tom-bridge/commit/6766c44))
* leave the level of the bot to the homeserver
([39c98a0](https://github.com/linagora/tom-bridge/commit/39c98a0))
* keep the Matrix profile on the stored settings
([fd9e810](https://github.com/linagora/tom-bridge/commit/fd9e810))

### Build

* run tom-bridge on node 24 instead of bun (#26)
([7fdcb1b](https://github.com/linagora/tom-bridge/commit/7fdcb1b))

## [v1.0.2](https://github.com/linagora/tom-bridge/compare/v1.0.1...f06c430c06528aee281fa8f398160febaf952508) (2026-09-10)

### [v1.0.1](https://github.com/linagora/tom-bridge/compare/v1.0.0...v1.0.1) (2026-09-09)

## v1.0.0 (2026-09-03)

### Features

* implement Matrix settings bridge
([1ff882e](https://github.com/linagora/tom-bridge/commit/1ff882e6d358219c75e2977a47ecbe49b05610be))

<!-- markdownlint-disable-file MD024 -->
