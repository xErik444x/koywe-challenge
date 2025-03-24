# Koywe Currency Exchange API

A NestJS-based API for currency exchange between fiat and crypto currencies, implementing clean architecture principles and best practices.

## 🏗️ Project Architecture

The project follows a clean, layered architecture:

- **BLL (Business Logic Layer)**: Core business logic implementation.
- **DAL (Data Access Layer)**: Database and external API interactions.
- **Facades**: Simplified entry points for business logic.
- **Models**: Data structure definitions.
- **Providers**: External service integrations (e.g., exchange rate providers).

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Environment Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Copy the environment example file:

```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`.

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Initialize Prisma:

```bash
pnpm prisma init
```

3. Generate Prisma client:

```bash
pnpm prisma generate
```

## 🐳 Docker Setup

### Running the Database Only

```bash
docker-compose up -d database
```

### Running the Full Stack

```bash
docker-compose up -d
```

## 🛠️ Development

### Running the Application

```bash
# Development mode
pnpm run start:dev

# Production mode
pnpm run start:prod
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

## 🔧 Database

This project uses PostgreSQL with Prisma as the ORM. The database schema is defined in `prisma/schema.prisma`.

## 📖 Additional Resources

- [DDD & Dependency Injection with NestJS](https://dev.to/trickaugusto/ddd-dependency-injection-e-facade-com-nestjs-525c)
- [SOLID Principles in NestJS](https://mugan86.medium.com/nestjs-aplicando-solid-357b80d4245c)
- [Prisma Documentation](https://docs.nestjs.com/recipes/prisma)
