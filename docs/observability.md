# Mobile request correlation

`NetworkClient` adds `X-Request-ID` to outgoing Axios requests so support can find the corresponding API log record. It accepts caller-supplied IDs with 1–64 ASCII letters, digits, dots, underscores, or hyphens, and replaces missing or invalid IDs.

The generator uses `crypto.randomUUID` when available, with `getRandomValues` and `Math.random` fallbacks for React Native runtimes. These IDs are for correlation, not authentication. No new package or native configuration is required.

The change preserves authorization and the existing Axios response and error shapes. Read the server's response header from `response.headers` or `error.response.headers`; the outgoing ID remains in the Axios request configuration. Existing callers that return only the response body do not expose this header through their application API.

This feature does not send mobile logs or crash reports to Grafana. It adds no logging of bodies, headers, cookies, query strings, or user data, and needs no Grafana credentials in the app.

## Shared monitoring

The API repository owns request logging and validation of incoming IDs. The CRM repository owns the shared Alloy, Traefik, dashboard, alert, and uptime configuration for https://scarletparlor3398.grafana.net. Mobile product analytics remain in the existing analytics service.

## Rollout and verification

Deploy the API logging change before releasing the mobile build if request correlation must work immediately. Make a request and compare its outgoing ID with the API log field `request_id`.

Run the focused offline tests:

```sh
yarn test src/services/__tests__/networkClient.test.ts src/services/__tests__/requestId.test.ts --runInBand
```

The tests cover generation, invalid input, explicit IDs, authorization, response bodies, server response headers, and runtimes without Web Crypto. They use a mocked Axios adapter and do not call production. Device validation remains necessary before release.

## Rollback

Revert the client change and release the previous mobile code. The API generates an ID when a request does not supply one, so rollback requires no server configuration change.
