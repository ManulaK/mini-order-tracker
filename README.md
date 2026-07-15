# ZinCat Mini Order Tracker Practical Test

ZinCat Mini Order Tracker is a small full-stack order tracking project. It has one backend API and two client apps:

- `backend` - Express + TypeScript REST API
- `web` - React + Vite web dashboard
- `mobile` - Flutter mobile app

The project is based on a simple client-server flow. The web app and mobile app both call the backend over HTTP. The backend stores sample order data in memory and exposes order endpoints for viewing orders, creating orders, and moving an order to its next status.

## What You Need First

Install these before running the project:

- Node.js 20.19.0 or newer
- npm 10 or newer
- Flutter SDK 3.41.7 or newer, only if you want to run the mobile app
- Dart SDK 3.11.5 or newer, included with the required Flutter SDK
- A browser for the web app
- An emulator, simulator, or connected device for the mobile app
- Git, if you are cloning the repository

Recommended editor:

- Visual Studio Code

## Project Structure

```text
mini-order-tracker/
|-- backend/
|   |-- src/
|   |   |-- app.ts
|   |   |-- index.ts
|   |   |-- middlewares/
|   |   |-- modules/orders/
|   |   `-- shared/
|   `-- package.json
|-- web/
|   |-- public/
|   |-- src/
|   |   |-- modules/orders/
|   |   `-- shared/
|   `-- package.json
|-- mobile/
|   |-- lib/
|   |   |-- core/
|   |   `-- modules/orders/
|   `-- pubspec.yaml
`-- README.md
```

## How To Run

Run the backend first. Then run the web app or mobile app in another terminal.

### 1. Run The Backend

```bash
cd backend
npm install
npm run dev
```

Backend URL:

```text
http://localhost:3000/api/v1
```

Useful API endpoints:

```text
GET   /orders
POST  /orders
PATCH /orders/:id/status
```

### 2. Run The Web App

Open a second terminal:

```bash
cd web
npm install
npm run dev
```

Vite will print the local URL. It is usually:

```text
http://localhost:5173
```

The web app API base URL is configured in:

```text
web/src/shared/api/http-client.ts
```

Default value:

```text
http://localhost:3000/api/v1
```

### 3. Run The Mobile App

Open another terminal:

```bash
cd mobile
flutter pub get
flutter run
```

To run the Flutter app in Chrome:

```bash
cd mobile
flutter run -d chrome
```

The mobile app API base URL is configured in:

```text
mobile/lib/core/constants/api_constants.dart
```

Default value:

```text
http://localhost:3000/api/v1
```

Important mobile URL notes:

- For iOS simulator or Flutter web, `localhost` usually works.
- For Android emulator, use `http://10.0.2.2:3000/api/v1`.
- For a physical phone, replace `localhost` with your computer's LAN IP address.

## Architecture Used

### Backend Architecture

The backend uses a layered Express architecture:

- `index.ts` starts the server.
- `app.ts` configures Express, CORS, JSON parsing, and the `/api/v1` route prefix.
- `order.routes.ts` defines order API routes.
- `validate.ts` validates request data with Zod schemas.
- `order.controller.ts` handles request and response logic.
- `order.service.ts` contains order business logic.
- `data/` stores in-memory sample orders, items, and order statuses.
- `response-handler.ts` keeps API response formatting consistent.

### Web Architecture

The web app uses a feature-based React structure:

- `main.tsx` mounts the React app.
- `App.tsx` loads the order page.
- `modules/orders/` contains the order feature.
- `api/orders.api.ts` calls the backend.
- `hooks/useOrders.ts` manages loading, error, orders, and status update state.
- `components/` contains order UI components.
- `utils/` contains order formatting, filtering, and status helpers.
- `shared/api/http-client.ts` creates the Axios client.

### Mobile Architecture

The mobile app uses a simple MVVM-style Flutter structure:

- `main.dart` starts the Flutter app.
- `views/order_screen.dart` shows the order UI.
- `viewmodels/order_view_model.dart` manages state and user actions.
- `services/order_service.dart` calls the backend API.
- `models/order.dart` defines the order data model.
- `components/` contains reusable order widgets.
- `core/api/` contains the HTTP client and API exception handling.
- `core/constants/api_constants.dart` stores API paths and base URL.

## Data Flow

```text
React Web App
      |
      | HTTP requests
      v
Express Backend API ---- In-memory order data
      ^
      | HTTP requests
      |
Flutter Mobile App
```

Both clients read and update orders through the same backend API. The backend returns a shared response format so the web and mobile apps can handle API results consistently.

## Useful Commands

Run web linting:

```bash
cd web
npm run lint
```

Build the web app:

```bash
cd web
npm run build
```

Preview the production web build:

```bash
cd web
npm run preview
```

Start the web app on another port:

```bash
cd web
npm run dev -- --port 5174
```

## Notes

- Keep the backend running while using the web or mobile app.
- The backend uses in-memory data, so new orders and status changes reset when the server restarts.
- If the backend port changes, update the API base URL in both the web and mobile apps.
- CORS is enabled for local development.
- The project currently does not use a database.
- The backend has a small artificial delay when loading orders, so loading states are visible in the clients.

## AI Usage and Manual Changes

AI assistance was used for README wording, UI enhancement ideas, utility function suggestions, dummy data setup support, theme color ideas, generated comments cleanup, and HTTP client development support.

The base project implementation was completed manually. Manual work includes the project architecture, backend endpoints, route behavior, validation handling, response handling, order status logic, client state handling, web and mobile feature integration, and final code review.

## Screenshots

Web app:

![Web app screenshot](web/public/web.png)

Mobile app:

<img src="web/public/mobile.png" alt="Mobile app screenshot" width="180" />
