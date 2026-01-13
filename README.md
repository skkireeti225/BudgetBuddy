
# BudgetBuddy — Minimal Node + React Starter

This workspace contains a minimal full-stack app:

- `server` — Express backend (API + static serving for production)
- `client` — Vite + React frontend

Getting started

1. Install dependencies for server and client:

```bash
cd server
npm install

cd ../client
npm install
```

2. Run in development (two terminals):

```bash
cd server
npm start

cd ../client
npm run dev
```

The client dev server (Vite) proxies requests to `/api/*` to the same origin, so fetching `/api/hello` will reach the Express backend when both are run from the same host (or when you set up a proxy).

Production build

1. Build the client:

```bash
cd client
npm run build
```

2. Serve with Express:

```bash
cd ../server
set NODE_ENV=production
npm start
```

Notes

- This scaffold is minimal — let me know if you want TypeScript, a monorepo setup, or an npm script that runs both servers concurrently.

Hostinger deployment

1. Prepare the project: ensure `client` and `server` folders are uploaded to your Hostinger account.

2. In Hostinger hPanel ▶ Applications ▶ Node.js, create a new Node.js application and set the app root to the `server` folder (path should point to `.../BudgetBuddy/server`).

3. Set the application start file to `index.js` and Node version to a modern LTS (>=18).

4. When Hostinger runs `npm install` in the `server` folder, the `postinstall` script will automatically install and build the client (`../client`), producing `client/dist`. The Express server is already configured to serve `client/dist` in production.

5. Start the Node.js application from hPanel. If needed, create a `Procfile` with `web: node index.js` or provide a start command in the UI.

Notes and troubleshooting

- If Hostinger runs `npm install` at the project root instead of the `server` folder, create a top-level `package.json` that forwards install/build to `server` and `client` (I can add this if you want).
- If you prefer to serve the frontend as a static site, build the client locally and upload `client/dist` to `public_html` instead of running a Node app.
- Let me know if you want a `Procfile`, `ecosystem.config.js` (PM2), or a root `package.json` to make deployment more robust.
 - If Hostinger runs `npm install` at the project root instead of the `server` folder, a top-level `package.json` is provided that runs `cd server && npm install` during `postinstall` so the server's postinstall will build the client.
 - A `Procfile` and `ecosystem.config.js` (PM2) have been added to simplify process start commands on platforms that use them.

GitHub Connect (Hostinger) — quick steps

1. Push this repository to GitHub (create a new repo and push all files).

2. In Hostinger hPanel ▶ Git ▶ Connect to GitHub (or the Node.js application ▶ Deployments ▶ Connect Git), authorize and select the repo and branch.

3. For the deployment path, point to the repository root. Hostinger will run `npm install` there. The root `package.json` includes a `postinstall` that installs the server and triggers the server's `postinstall` which builds the client.

4. In the Hostinger Node.js app settings, set the start command to `npm start` (or leave default if it detects `start`), and ensure Node version >=18.

5. Trigger a manual deployment from Hostinger to test. The deployed app should run `npm install`, build the client, and start the server serving the built frontend.

If deployment fails, open the Hostinger deployment logs for the Git hook — common fixes include adding build dependencies to `server/package.json` or increasing the build timeout in Hostinger settings.
