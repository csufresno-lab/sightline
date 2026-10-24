# Sightline

Sightline is a behavior observation app for school psychologists. This is a prototype: use it with fictional students only.

It is an installable web app. After the first visit it works offline, and all data stays on the device that collected it. Nothing is sent to this website or anywhere else.

## Files

| File | What it does |
|---|---|
| `index.html` | The whole app |
| `manifest.webmanifest` | App name, icon and colors, so devices can install it |
| `sw.js` | Keeps a copy of the app on the device so it works without internet |
| `icons/` | Home-screen icons |

## Publishing an update

1. Upload the new `index.html`.
2. In `sw.js`, change the `VERSION` line (for example to `1.0.1`) and upload it too.

Installed copies download the update in the background and use it the next time they open.
