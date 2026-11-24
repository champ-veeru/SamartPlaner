# SmartFin – Complete Deployment & Hosting Guide

SmartFin is equipped with a **production-ready Node.js + Express full-stack backend** and a **persistent SQLite database (`smartfin.db`)** that stores citizen profiles, budgets, daily expenses, and savings goals.

The frontend is a **hybrid client**:
- When hosted on a Node.js server, it communicates with the SQLite database via REST APIs and displays `🟢 Cloud DB: SQLITE`.
- When hosted statically (e.g. GitHub Pages) or used offline, it automatically falls back to browser `LocalStorage`.

---

## 🚀 4 Hosting Options (From 1-Click Free to Custom Cloud)

### Option 1: Free Hosting on Render.com (Recommended for Full-Stack + DB)

Render offers free web service hosting for Node.js apps.

1. Create a free account at [render.com](https://render.com).
2. Push your project folder to your GitHub or GitLab repository:
   ```bash
   git init
   git add .
   git commit -m "Deploy SmartFin Karnataka"
   git remote add origin https://github.com/your-username/smartfin.git
   git push -u origin main
   ```
3. On Render, click **New +** &rarr; **Web Service**.
4. Connect your GitHub repository.
5. Render will automatically detect the settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Click **Deploy Web Service**.
7. In 2 minutes, your website will be live at a public HTTPS URL (e.g. `https://smartfin-karnataka.onrender.com`).

---

### Option 2: 1-Click Deployment on Railway.app

Railway provides automated full-stack hosting with persistent disk volumes for SQLite.

1. Sign in to [railway.app](https://railway.app) using GitHub.
2. Click **New Project** &rarr; **Deploy from GitHub repo**.
3. Select your repository.
4. Railway will automatically detect the `Dockerfile` or `package.json` and build your container.
5. In **Settings** &rarr; **Domains**, generate your public domain (e.g., `smartfin.up.railway.app`).

---

### Option 3: Deploying on Vercel

1. Install the Vercel CLI or connect via the dashboard at [vercel.com](https://vercel.com):
   ```bash
   npm i -g vercel
   vercel
   ```
2. Vercel will read `vercel.json` and deploy both the static frontend and the `/api` backend routes automatically.

---

### Option 4: Self-Hosting on VPS (Ubuntu / Debian / DigitalOcean / Linode)

If you have a Linux virtual server:

1. SSH into your server:
   ```bash
   ssh user@your-server-ip
   ```
2. Install Node.js (version 20 or 22 LTS):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs git
   ```
3. Clone or copy your code to `/var/www/smartfin`:
   ```bash
   cd /var/www/smartfin
   npm install --production
   ```
4. Install and run with **PM2** (Process Manager):
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "smartfin"
   pm2 startup
   pm2 save
   ```
5. Configure Nginx reverse proxy to forward traffic to `http://localhost:8085` and enable free SSL using Certbot:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🐳 Docker Deployment

You can also run SmartFin in any Docker environment:

```bash
# Build the Docker image
docker build -t smartfin:latest .

# Run the container with persistent database volume
docker run -d -p 8085:8085 -v smartfin_data:/app/db --name smartfin-app smartfin:latest
```

---

## 🧪 Testing the Database & REST APIs Locally

The local server runs at `http://localhost:8085`.

You can test the database endpoints directly:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status and database engine type |
| `GET` | `/api/profile` | Retrieve citizen profile from SQLite |
| `PUT` | `/api/profile` | Update profile fields in SQLite |
| `GET` | `/api/budgets` | Retrieve monthly category budgets |
| `PUT` | `/api/budgets` | Update category budget limits |
| `GET` | `/api/expenses` | Retrieve all logged expenses |
| `POST` | `/api/expenses` | Insert a new expense record |
| `PUT` | `/api/expenses/:id` | Edit an existing expense |
| `DELETE` | `/api/expenses/:id` | Delete an expense |
| `GET` | `/api/goals` | Retrieve all savings goals |
| `POST` | `/api/goals` | Create a new savings goal |
| `POST` | `/api/goals/:id/funds` | Add funds/deposit to a goal |
| `DELETE` | `/api/goals/:id` | Delete a savings goal |
| `POST` | `/api/reset` | Reset database to initial Karnataka demo data |
