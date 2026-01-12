# Server (my-app/server)

How to run the backend locally and prepare for Hostinger deployment.

Prerequisites
- Node.js (recommended LTS 18 or 20)
- npm
- MongoDB URI (Atlas or local)

Run locally (development):

PowerShell
```
cd my-app\server
npm install
$env:MONGO_URI="your_mongo_uri_here"
$env:PORT=5000
npm start
```

CMD
```
cd my-app\server
npm install
set MONGO_URI=your_mongo_uri_here && set PORT=5000 && npm start
```

Run frontend (dev) in separate terminal:
```
cd my-app\client
npm install
npm run dev
```

Build frontend for production (optional, to serve from server):
```
cd my-app\client
npm run build
```

This project is set up so that when `NODE_ENV=production` the server serves the built frontend from `../client/dist`.

Hostinger deployment checklist
- In hPanel select the folder `my-app/server` as the project root (it contains `package.json`).
- Choose Node 18 or 20 as the runtime.
- Add `MONGO_URI` (and other secrets) in the app's environment variables.
- If deploying the frontend from the same app: build the frontend (`npm run build`) before deployment so `client/dist` exists.

Run end-to-end locally without MongoDB
- The server will automatically use an in-memory store when `MONGO_URI` is not set or if the connection fails.
- This is intended for local testing only; data will not persist after the server stops.

Git Bash / PowerShell (two terminals):

Server (no Mongo):
```
cd /c/Users/skkir/Documents/BudgetBuddy/my-app/server
npm install
export PORT=5000
# do NOT set MONGO_URI, or set it empty
unset MONGO_URI
npm start
```

Client (dev):
```
cd /c/Users/skkir/Documents/BudgetBuddy/my-app/client
npm install
npm run dev
```

Now open the frontend URL shown by Vite (usually http://localhost:5173). The frontend's API requests to `/items` will be served by the server and backed by the in-memory store.

