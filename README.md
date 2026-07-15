# ZinCat Mini Order Tracker

A small order-tracking project with three apps:

- `backend`: Express + TypeScript API
- `web`: React + Vite web app
- `mobile`: Flutter mobile app

Run the backend first, then run the web or mobile app in another terminal.

## Screenshots

<p>
  <img src="web/public/web.png" alt="Web app screenshot" width="360" />
  <img src="web/public/mobile.png" alt="Mobile app screenshot" width="160" />
</p>

## Project Structure

```text
backend/   Express API, routes, validation, and sample order data
web/       React web client for viewing and updating orders
mobile/    Flutter mobile client for viewing and updating orders
```

## Prerequisites

- Node.js and npm
- Flutter SDK, only needed for the mobile app
- A browser, simulator, emulator, or connected device

## Run the Backend

Open a terminal:

```bash
cd backend
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:3000/api/v1
```

Useful endpoints:

- `GET /orders`
- `POST /orders`
- `PATCH /orders/:id/status`

## Run the Web App

Open another terminal after the backend is running:

```bash
cd web
npm install
npm run dev
```

Vite will print the local web URL, usually:

```text
http://localhost:5173
```

The web app reads the API base URL from:

```text
web/src/shared/api/http-client.ts
```

Default API URL:

```text
http://localhost:3000/api/v1
```

## Run the Mobile App

Open another terminal after the backend is running:

```bash
cd mobile
flutter pub get
flutter run
```

To run in Chrome:

```bash
cd mobile
flutter run -d chrome
```

The mobile app reads the API base URL from:

```text
mobile/lib/core/constants/api_constants.dart
```

Default API URL:

```text
http://localhost:3000/api/v1
```

For Android emulator, use:

```text
http://10.0.2.2:3000/api/v1
```

For a physical phone, use your computer's LAN IP address instead of `localhost`.

## Useful Commands

Run web checks:

```bash
cd web
npm run lint
npm run build
```

Start the web app on another port:

```bash
cd web
npm run dev -- --port 5174
```

## Notes

- Keep the backend running while using the web or mobile app.
- The backend uses in-memory data, so created orders and status updates reset when the server restarts.
- If the backend port changes, update both `web/src/shared/api/http-client.ts` and `mobile/lib/core/constants/api_constants.dart`.
- CORS is enabled for local development.

## AI Usage and Manual Changes

AI assistance was used only for UI enhancement ideas, utility function creation, dummy data setup, theme color design, generated comments/wording cleanup, HTTP client development support, and drafting parts of this README.

The base implementation was done by hand. This includes the project architecture, backend endpoint creation, route and status behavior, validation handling, response handling, state handling, web and mobile feature logic, integration between the clients and backend, and final review/editing of the code.
