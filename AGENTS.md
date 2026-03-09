# AGENTS.md

## Review Modes

Before reviewing any browser-facing change, explicitly declare which mode you are using:

- `Static review only`: code and diff inspection only. No runtime claims.
- `Browser automation verified`: browser tests or automation actually ran.
- `Deployed-site verified`: the live site was checked against the deployed commit/build.

If browser/runtime verification is unavailable, say that before giving conclusions.

## Frontend Gate

Do not conclude `looks good`, `no issues`, or similar for stateful UI changes unless one of these is true:

- browser automation passed for the affected flow
- the deployed site was manually verified
- the review explicitly says runtime is unverified

## Mandatory Stateful UI Checks

For startup, persistence, hydration, validation, and restore-path changes, review and/or test all of these:

- fresh load with empty `localStorage`
- restore from valid saved state
- restore from malformed or partial saved state
- clear the origin after a valid saved session, then reload
- GitHub Pages hard refresh or private-window check when Pages is the release target

## Evidence Format

Every review summary should state:

- scope reviewed
- branch or commit reviewed
- verification type used
- remaining unverified gap
