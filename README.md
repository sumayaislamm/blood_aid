# Blood Aid — Blood Donation & Emergency Platform

A secure and scalable backend API for connecting blood donors with people who urgently need blood. The platform supports donor registration, blood requests, donor responses, donation tracking, online payment, admin management, audit logging, and role-based access control.

## Live API

**Deployment:** Vercel

**Live URL:** https://blood-aid-flax.vercel.app/

> The API is deployed on Vercel.

## Features

### Authentication & Authorization

* Email/password registration and login
* Google authentication
* JWT-based authentication
* Role-Based Access Control (RBAC)
* Three primary roles:

  * `ADMIN`
  * `DONOR`
  * `REQUESTER`
* Protected private routes
* Password hashing with bcrypt

### Blood Request Management

* Create, update, view and delete blood requests
* Search by hospital, address, city and description
* Filtering by:

  * Blood group
  * Urgency
  * Status
  * City
* Pagination
* Sorting
* Soft delete
* Request status management

### Donor Management

* Donor profile management
* Blood group and availability tracking
* Donor response system
* Prevents duplicate responses
* Donors can update their own pending responses

### Donation Management

* Donation creation through accepted donor responses
* Donation status tracking
* Duplicate donation prevention
* Transaction-based donation creation
* Admin donation verification
* Donation audit logging

### Payment

* Real Stripe payment integration
* Stripe Checkout
* Stripe webhook handling
* Payment status tracking
* Transaction ID storage
* Payment history
* Admin payment management

### Admin Management

Admin-only APIs for:

* User management
* User status management
* Blood request management
* Donation management
* Donation verification
* Payment management
* Platform statistics
* Audit log viewing

### Security

* JWT authentication
* RBAC authorization
* bcrypt password hashing
* Zod server-side validation
* Helmet security headers
* CORS
* Redis-backed rate limiting
* Protected admin routes
* Centralized error handling

### Performance & Data Integrity

* PostgreSQL database
* Prisma ORM
* Database indexes for frequently queried fields
* Pagination
* Efficient Prisma queries
* Parallel queries using `Promise.all`
* Database transactions for critical operations
* Redis rate limiting

### Audit Logging

Critical actions are recorded in the audit log, including:

* Blood request creation
* Blood request updates
* Blood request deletion
* User status changes
* Donation verification
* Admin blood request status changes

## Tech Stack

* **Node.js**
* **TypeScript**
* **Express.js**
* **PostgreSQL**
* **Prisma 7**
* **Zod**
* **JWT**
* **bcrypt**
* **Redis**
* **express-rate-limit**
* **Helmet**
* **CORS**
* **Stripe**
* **Google Authentication**

## API Versioning

All main APIs are versioned under:

```text
/api/v1
```

Examples:

```text
/api/v1/auth
/api/v1/blood-requests
/api/v1/donor-profile
/api/v1/donor-responses
/api/v1/donations
/api/v1/payments
/api/v1/admin
```

Stripe webhook:

```text
/api/payments/webhook
```

The Stripe webhook remains outside `/api/v1` because Stripe is configured to send webhook events directly to this endpoint.

## API Response Format

### Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": []
}
```

## Main API Endpoints

### Authentication

| Method | Endpoint                | Access        |
| ------ | ----------------------- | ------------- |
| POST   | `/api/v1/auth/register` | Public        |
| POST   | `/api/v1/auth/login`    | Public        |
| POST   | `/api/v1/auth/google`   | Public        |
| GET    | `/api/v1/auth/me`       | Authenticated |
| PATCH  | `/api/v1/auth/me`       | Authenticated |

### Blood Requests

| Method | Endpoint                             | Access        |
| ------ | ------------------------------------ | ------------- |
| POST   | `/api/v1/blood-requests`             | Requester     |
| GET    | `/api/v1/blood-requests`             | Authenticated |
| GET    | `/api/v1/blood-requests/:id`         | Authenticated |
| PATCH  | `/api/v1/blood-requests/:id`         | Requester     |
| DELETE | `/api/v1/blood-requests/:id`         | Requester     |
| GET    | `/api/v1/blood-requests/my-requests` | Requester     |

### Donor Profile

| Method | Endpoint                   | Access |
| ------ | -------------------------- | ------ |
| POST   | `/api/v1/donor-profile`    | Donor  |
| GET    | `/api/v1/donor-profile/me` | Donor  |
| PATCH  | `/api/v1/donor-profile/me` | Donor  |

### Donor Responses

| Method | Endpoint                               | Access    |
| ------ | -------------------------------------- | --------- |
| POST   | `/api/v1/donor-responses`              | Donor     |
| GET    | `/api/v1/donor-responses/my-responses` | Donor     |
| PATCH  | `/api/v1/donor-responses/:id`          | Donor     |
| PATCH  | `/api/v1/donor-responses/:id/status`   | Requester |

### Donations

| Method | Endpoint                         | Access        |
| ------ | -------------------------------- | ------------- |
| POST   | `/api/v1/donations`              | Donor         |
| GET    | `/api/v1/donations/my-donations` | Donor         |
| GET    | `/api/v1/donations/:id`          | Authenticated |
| PATCH  | `/api/v1/donations/:id/status`   | Donor         |

### Payments

| Method | Endpoint                    | Access    |
| ------ | --------------------------- | --------- |
| POST   | `/api/v1/payments/initiate` | Requester |
| GET    | `/api/v1/payments/:id`      | Requester |

### Admin

| Method | Endpoint                                  | Access |
| ------ | ----------------------------------------- | ------ |
| GET    | `/api/v1/admin/users`                     | Admin  |
| PATCH  | `/api/v1/admin/users/:id/status`          | Admin  |
| GET    | `/api/v1/admin/blood-requests`            | Admin  |
| PATCH  | `/api/v1/admin/blood-requests/:id/status` | Admin  |
| GET    | `/api/v1/admin/donations`                 | Admin  |
| PATCH  | `/api/v1/admin/donations/:id/verify`      | Admin  |
| GET    | `/api/v1/admin/payments`                  | Admin  |
| GET    | `/api/v1/admin/stats`                     | Admin  |
| GET    | `/api/v1/admin/audit-logs`                | Admin  |

## Database

The application uses PostgreSQL with Prisma 7.

Main entities:

```text
User
├── DonorProfile
├── BloodRequest
├── DonorResponse
├── Donation
├── Payment
├── Notification
└── AuditLog
```

Important database constraints include:

* Unique user email
* Unique Google ID
* Unique donor profile per user
* Unique donor response per blood request and donor
* Unique donation per donor response
* Foreign key relationships
* Database indexes for frequently queried fields

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sumayaislamm/blood_aid.git
cd blood-aid
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_connection_string"

JWT_SECRET="your_jwt_secret"

GOOGLE_CLIENT_ID="your_google_client_id"

REDIS_URL="your_redis_url"

STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

STRIPE_SUCCESS_URL="your_success_url"
STRIPE_CANCEL_URL="your_cancel_url"

PORT=5000
```

Never commit `.env` or other secret credentials to GitHub.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Start development server

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

## Production Build

```bash
npm run build
```

Then:

```bash
npm start
```

## Testing

The API can be tested using:

* Postman
* Swagger/OpenAPI documentation
* Stripe test payments

Authentication-protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
```

## Admin Credentials

For demonstration purposes, an admin account is seeded in the database.

> **Important:** Admin credentials should be provided separately for evaluation and should not be committed to the repository.

## Payment Testing

Stripe test mode is used for payment processing.

The payment flow is:

```text
Requester
    ↓
Create Blood Request
    ↓
Initiate Payment
    ↓
Stripe Checkout
    ↓
Successful Payment
    ↓
Stripe Webhook
    ↓
Payment Status = PAID
```

The application verifies Stripe webhook signatures before processing payment events.

## Project Structure

```text
src/
├── lib/
│   ├── prisma.ts
│   └── stripe.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   ├── rate-limit.middleware.ts
│   └── validation.middleware.ts
│
├── modules/
│   ├── auth/
│   ├── blood-request/
│   ├── donor-profile/
│   ├── donor-response/
│   ├── donation/
│   ├── payment/
│   └── admin/
│
├── utils/
│   └── jwt.ts
│
├── app.ts
└── server.ts

generated/
└── prisma/

prisma/
└── contract.prisma
```

## Business Rules

The platform implements several business rules beyond basic CRUD:

* Only donors can respond to blood requests.
* A donor cannot respond to the same request more than once.
* Donor responses can only be updated while pending.
* Requesters can accept or reject donor responses.
* Donations can only be created from accepted donor responses.
* Duplicate donations for the same response are prevented.
* Donors can only mark their own pending donations as completed.
* Only admins can verify completed donations.
* Admins cannot block or delete their own account.
* Deleted blood requests are hidden through soft deletion.
* Critical administrative actions are recorded in audit logs.
* Payment records prevent multiple active payments for the same blood request.

## Security Considerations

The application includes:

* Password hashing
* JWT authentication
* Role-based authorization
* Input validation
* Rate limiting
* Redis integration
* Helmet security headers
* CORS protection
* Stripe webhook signature verification
* Centralized error handling
* Protected administrative APIs
* Soft deletion
* Audit logging

## API Documentation

Complete API documentation and request examples are provided through the Postman collection included with the project.

The collection covers authentication, blood requests, donor profiles, donor responses, donations, payments, and admin APIs.

## Author

**Blood Aid — Backend Project**

Built as part of the Programming Hero Backend Project Assignment.

**Developer:** Sumaya Islam

**GitHub:** https://github.com/sumayaislamm
