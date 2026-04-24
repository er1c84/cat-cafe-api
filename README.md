# Cat Cafe Reservation API

This API manages reservations for a cat cafe. Users can sign up, log in, view cats, create reservations, and manage their own bookings. Admins can manage cat records, view every reservation, and assign cats to reservations through visit records.

## Main Resources

- `users`: authentication and role-based access control.
- `cats`: cafe cats available for reservations.
- `reservations`: user booking records.
- `visits`: assignments between reservations and cats.

Essential fields:

- `users`: `id` primary key, `email` unique, `password`, `role`.
- `cats`: `id` primary key, `name`, `age`, `breed`, `status`.
- `reservations`: `id` primary key, `user_id` foreign key, `date`, `time`, `number_guests`, `status`.
- `visits`: `id` primary key, `reservation_id` foreign key, `cat_id` foreign key, unique pair of `reservation_id` and `cat_id`.

## Setup

1. Install dependencies: `npm install`
2. Add `.env` values:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="replace-with-a-secure-secret"
JWT_EXPIRES_IN="1h"
PORT=3000
```

3. Generate Prisma client: `npx prisma generate`
4. Push schema to the database: `npx prisma db push`
5. Seed the database: `npm run seed`
6. Start the server: `npm run dev`
7. Open Swagger UI: `http://localhost:3000/api-docs`

For local development, run commands with `.env` loaded, such as `node --env-file=.env prisma/seed.js` when seeding manually. For Render deployment, use `npm install` as the build command and `npm start` as the start command. The start command pushes the Prisma schema, accepts schema reset warnings for the project database, seeds the database, and then starts the API so the deployed Swagger UI has test data available.

## Seeded Data

Use this exact data when grading or testing after `npm run seed`.

Credentials:

- Admin: `admin@catcafe.com` / `Pass1234`
- User Alice: `alice@test.com` / `Pass1234`
- User Bob: `bob@test.com` / `Pass1234`

Seeded IDs:

- Users: admin `1`, Alice `2`, Bob `3`
- Cats: Milo `1`, Gwen `2`, Luna `3`, Pepper `4`
- Reservations: Alice confirmed reservation `1`, Bob confirmed reservation `2`, Alice cancelled reservation `3`
- Visits: reservation `1` with cat `1` is visit `1`, reservation `1` with cat `2` is visit `2`, reservation `2` with cat `3` is visit `3`

## Swagger Testing Plan

Before testing protected endpoints, run `POST /api/auth/login` with `admin@catcafe.com` / `Pass1234`, copy `accessToken`, click Swagger Authorize, and enter `Bearer <token>`. For user-only tests, repeat with `alice@test.com` / `Pass1234`.

Auth:

- `POST /api/auth/signup`: use `newuser@test.com` / `Pass1234`; expect `201`.
- `POST /api/auth/login`: use `alice@test.com` / `Pass1234`; expect `200` and an `accessToken`.
- Duplicate signup with `alice@test.com` / `Pass1234`; expect `409`.

Cats:

- `GET /api/cats`: no token required; expect `200`.
- `GET /api/cats/1`: no token required; expect Milo.
- `POST /api/cats`: admin token, body `{ "name": "Maple", "age": 2, "breed": "Calico", "status": "available" }`; expect `201` and cat ID `5`.
- `PUT /api/cats/1`: admin token, body `{ "status": "resting" }`; expect `200`.
- `DELETE /api/cats/5`: admin token; expect `204 No Content`.
- `POST /api/cats` with Alice token; expect `403`.

Reservations:

- `GET /api/reservations`: Alice token; expect only Alice reservations with IDs `1` and `3`.
- `GET /api/reservations`: admin token; expect reservations `1`, `2`, and `3`.
- `GET /api/reservations/1`: Alice token; expect `200`.
- `GET /api/reservations/2`: Alice token; expect `403` because reservation `2` belongs to Bob.
- `POST /api/reservations`: Alice token, body `{ "date": "2026-04-27", "time": "14:00", "numberGuests": 2 }`; expect `201` and reservation ID `4`.
- `PUT /api/reservations/1`: Alice token, body `{ "status": "cancelled" }`; expect `200`.
- `DELETE /api/reservations/4`: Alice token; expect `204 No Content`.

Visits:

- `GET /api/visits`: admin token; expect visits `1`, `2`, and `3`.
- `GET /api/visits/1`: admin token; expect `200`.
- `GET /api/visits/1` with no token; expect `401`.
- `GET /api/visits/1` with Alice token; expect `403`.
- `POST /api/visits`: admin token, body `{ "reservationId": 3, "catId": 4 }`; expect `201` and visit ID `4`.
- `PUT /api/visits/3`: admin token, body `{ "catId": 1 }`; expect `200`.
- `DELETE /api/visits/4`: admin token; expect `204 No Content`.
