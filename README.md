# Task Tracker

## Local development with XAMPP MySQL

Use PHP 8.2 or newer with PDO MySQL enabled, Composer, and Node.js 24 LTS. Start MySQL in XAMPP on your PC.

Keep your existing backend/.env and APP_KEY. Verify APP_ENV=local, DB_CONNECTION=mysql, and DB_HOST=127.0.0.1. Keep the database name, port, username, and password from your local XAMPP setup. Remove DB_URL if it points to Aiven. If .env is missing, copy backend/.env.example to backend/.env and set those values. Use php artisan key:generate if APP_KEY is blank.

From the repository root in PowerShell:

```powershell
cd backend
composer install
php artisan config:clear
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Run migrations after checking that Laravel points to your local MySQL database.

In a second PowerShell window, start from the repository root:

```powershell
cd frontend
if (!(Test-Path .env.local)) { Copy-Item .env.example .env.local }
npm.cmd ci
npm.cmd run dev -- --host localhost --port 5173 --strictPort
```

For existing frontend settings, verify VITE_API_BASE_URL points to http://127.0.0.1:8000/api. Open http://localhost:5173 and sign in with your existing local account.
