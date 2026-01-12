# BudgetBuddy

## Run locally (Git Bash)

Prerequisites:
- Node.js (LTS 18 or 20) and npm
- Git Bash (on Windows)

Start the backend (no Mongo for quick e2e):
```bash
cd /c/Users/skkir/Documents/BudgetBuddy/my-app/server
npm install
# do NOT set MONGO_URI to use the in-memory fallback
export PORT=5000
unset MONGO_URI
npm start
```

Start the frontend (dev):
```bash
cd /c/Users/skkir/Documents/BudgetBuddy/my-app/client
npm install
npm run dev
```

Build frontend and serve from server (production):
```bash
cd /c/Users/skkir/Documents/BudgetBuddy/my-app/client
npm run build

cd /c/Users/skkir/Documents/BudgetBuddy/my-app/server
export NODE_ENV=production
export MONGO_URI="your_mongo_uri_here"  # optional for production
npm start
```

Open the Vite URL (usually http://localhost:5173). The frontend's API requests to `/items` will be served by the backend; when `MONGO_URI` is not set the server uses an in-memory store for testing.

## Hostinger deployment checklist
- Select the folder `my-app/server` in hPanel (the folder containing `package.json`).
- Ensure `scripts.start` in `package.json` is `node index.js`.
- Set environment variables in hPanel: `MONGO_URI` (if using Mongo), and choose Node 18 or 20.
- If deploying frontend from the same app, build the client (`npm run build`) so `client/dist` exists and will be served by the server.

For more details see `my-app/server/README.md`.