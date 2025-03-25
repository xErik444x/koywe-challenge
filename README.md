# Koywe Currency Exchange API

A NestJS-based API for currency exchange between fiat and crypto currencies, implementing clean architecture principles and best practices.

## 🏗️ Project Architecture

The project follows a clean, layered architecture:

- **BLL (Business Logic Layer)**: Core business logic implementation.
- **DAL (Data Access Layer)**: Database and external API interactions.
- **Facades**: Simplified entry points for business logic.
- **Models**: Data structure definitions.
- **Providers**: External service integrations (e.g., exchange rate providers).

# API Routes

> can be accessed at accessed at localhost:3000/api (Swagger)

| Method | Route          | Description         | Request Body       | Auth Required |
| ------ | -------------- | ------------------- | ------------------ | ------------- |
| POST   | /auth/register | Register a new user | AuthCredentialsDto | No            |
| POST   | /auth/login    | Login user          | AuthCredentialsDto | No            |
| POST   | /quote         | Create a new quote  | CreateQuoteDto     | Yes           |
| GET    | /quote/:id     | Get a quote by ID   | -                  | Yes           |

**AuthCredentialsDto**

```typescript
{
  email: string;
  password: string;
}
```

**CreateQuoteDto**

```typescript
{
  from: string;
  to: string;
  amount: number;
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally without Docker)

### Environment Setup

1. Copy the environment example file.
2. Configure your environment variables in `.env`.

### Installation

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

2. Generate Prisma client:

```bash
npx prisma generate (reload ide to see prisma client if not loaded)
```

3. Run the database (OPTIONAL):

```bash
docker-compose up -d database
```

4. Generate prisma database:

```bash
npx prisma db push
```

## 🛠️ Development

### Running the Application

```bash
# Development mode
pnpm run start:dev

# Production mode
pnpm run start:prod
```

## 🐳 Docker Setup

### Running the Database Only

```bash
docker-compose up -d database
```

### Running the Backend & Database

```bash
docker-compose up -d
```

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## 📚 API Documentation

The API documentation is available through Swagger UI at:

```
http://localhost:3000/api
```

## 📖 Additional Resources

- [DDD & Dependency Injection with NestJS](https://dev.to/trickaugusto/ddd-dependency-injection-e-facade-com-nestjs-525c)
- [SOLID Principles in NestJS](https://mugan86.medium.com/nestjs-aplicando-solid-357b80d4245c)
- [Prisma Documentation](https://docs.nestjs.com/recipes/prisma)
