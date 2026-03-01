# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.81.0] - 2026-03-01

### Breaking Changes

- **Private fields**: `apiEndpoint`, `secret`, `authToken`, `apiKey` are now private (`_apiEndpoint`, `_secret`, `_authToken`, `_apiKey`). Use the public getters `apiEndpoint` and `authToken` for read access.
- **`setSecret` now hashes**: Previously `setSecret(s)` stored the raw string; it now applies `hash()` consistently with the constructor.
- **`getHeaders` no longer mutates**: The method now returns a new object instead of mutating the input headers object.
- **Removed `websiteId` from query params**: `getEventDataEvents`, `getEventDataStats`, `getEventDataValues`, `getEventDataFields`, `getSessionDataProperties`, `getSessionDataValues`, `transferWebsite` no longer include the redundant `websiteId` in the request body/query.
- **Removed `Empty` interface** from `types.ts` (was unused).

### Added

- **`UmamiApiError` class** (`src/UmamiApiError.ts`): typed error with `status: number` and optional `response: unknown`. Thrown by all HTTP methods (`get`, `post`, `put`, `del`) on failure.
- **`getWebsiteDateRange(websiteId: string)`**: new method exposing the `GET websites/:id/daterange` endpoint (was previously routing to `getWebsiteActive` by mistake).
- **`WebsiteDateRange` interface** in `types.ts`: `{ min: string; max: string }`.
- **`WebsitePageview` interface** in `types.ts`: typed representation of a realtime page view event.
- **Unit tests** (`src/__tests__/UmamiApiClient.test.ts`): 8 tests covering constructor hashing, `setSecret`, `getHeaders` immutability, critical bug fixes, and `UmamiApiError`.
- **`exports` field** in `package.json`: proper dual CJS/ESM export map with `types` entry.
- **`engines` field** in `package.json`: requires Node.js ≥ 18.
- **`sideEffects: false`** in `package.json`: enables tree-shaking for bundlers.
- **`lint` and `test` scripts** in `package.json`.

### Fixed

- **`toataltime` typo** in `WebsiteSession` interface → corrected to `totaltime`.
- **`RealtimeUpdate`** `any[]` arrays replaced with `WebsitePageview[]`, `WebsiteSession[]`, `WebsiteEvent[]`.
- **`pogetst` typo** in `executeRoute` route table for `websites/:id/values` → corrected to `get`.
- **`daterange` route** was calling `getWebsiteActive` instead of the new `getWebsiteDateRange`.
- **`reportId` untyped** in `getReport`, `updateReport`, `deleteReport` → now `string`.
- **Missing `Promise<ApiResponse>` return types** added to `login`, `verify`, `getMe`, `getMyWebsites`, `getMyTeams`, `updateMyPassword`, `getRealtime`, `getUserUsage`, `transferWebsite`, `runFunnelReport`, `runInsightsReport`, `runRetentionReport`, `runUTMReport`, `runGoalsReport`, `runJourneyReport`, `runRevenueReport`, `runAttributionReport`, `send`, `batch`, `heartbeat`.
- **Unused `SearchResult` import** removed from `UmamiApiClient.ts`.

### Changed

- **`tsconfig.json`**: target upgraded from `es5` to `es2018`; removed `dom`/`dom.iterable` libs (not needed for a Node.js client); removed unused `jsx: react-jsx` and `typescript-transform-paths` plugin.
- **`jest.config.js`**: migrated to `ts-jest` preset with `testEnvironment: node`.
- **`eslint.config.mjs`**: `@typescript-eslint/no-explicit-any` promoted from `off` to `warn`; added jest globals for test files.
- **Removed unused devDependencies**: `dotenv`, `react`, `prettier-eslint`, `rollup-plugin-exclude-dependencies-from-bundle`, `source-map-loader`.
- **Added devDependencies**: `ts-jest`, `@types/jest`, `@types/debug`.
- **Removed `src/declaration.d.ts`**: replaced by `@types/debug` which ships proper types.

## [0.80.0] - 2026-02-01

- Upgrade all dependencies to latest stable versions.
- Migrate ESLint to flat config (ESLint v9+).
- Replace `rollup-plugin-ts` with `@rollup/plugin-typescript` + `rollup-plugin-dts`.
- Fix `ApiResponse` types and `hash()` for `next-basics` v0.40.0.
