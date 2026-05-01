# NestJS Backend Practice

A REST API project built with NestJS and PostgreSQL, implementing user management and post management functionalities.

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | NestJS |
| Database | PostgreSQL (WSL2) |
| ORM | TypeORM |
| Validation | class-validator, class-transformer |
| Language | TypeScript |

---

## 📌 Main Features

### 👤 User Domain
- **Signup**: Create and store new user accounts
- **Login**: Email/password-based authentication
- **Get Users**: Retrieve all users or a specific user by ID
- **Delete User**: Remove a specific user from the database

### 📝 Post Domain
- **Create Post**: Write and save a new post
- **Update Post**: Modify the content of an existing post
- **Get Posts**: Retrieve all posts or a specific post by ID
- **Delete Post**: Remove a specific post from the database

### 🔗 Relationship
- `User` : `Post` = **1:N (One-to-Many)** relationship mapping
- Foreign key integration and **data integrity verified** via TypeORM

---

## 📡 API Specification

### User API
| Method | Endpoint | Description | Payload (DTO) |
|:---:|:---|:---|:---|
| POST | `/users/signup` | Create a new user | `email`, `password`, `name`, `role` |
| POST | `/users/login` | User login | `email`, `password` |
| GET | `/users` | Get all users | - |
| DELETE | `/users/:id` | Delete a user | - |

### Post API
| Method | Endpoint | Description | Payload (DTO) |
|:---:|:---|:---|:---|
| POST | `/posts` | Create a post | `title`, `content`, `userId` |
| GET | `/posts` | Get all posts | - |
| PATCH | `/posts/:id` | Update a post | `title`, `content` |
| DELETE | `/posts/:id` | Delete a specific post | - |
| DELETE | `/posts/all/:userId` | Delete all posts by a user | - |

---

## 🗄️ Database Schema

- **User Entity**: `id` (PK), `email` (Unique), `password`, `name`, `role`, `createdAt`
- **Post Entity**: `id` (PK), `title`, `content`, `userId` (FK), `createdAt`
- **Relationship**: `User (1) <---> Post (N)`
  - Cascade option: Handles related posts when a user is deleted

---

## ⚙️ Configuration

- **Host**: `localhost` (PostgreSQL on WSL2)
- **Port**: `5432`
- **Synchronization**: `TypeORM synchronize: true` (Development mode only)
- **Validation**: `ValidationPipe` applied globally in `main.ts`
  - `whitelist: true` — Automatically strips properties not defined in the DTO
  - `transform: true` — Automatically transforms incoming network payloads to the correct types

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm run start:dev
```
> The server runs on **port 3000** by default.

### 3. Test the API
- Open the **`test.http`** file in the project root with VS Code (REST Client extension) to run all API endpoints with a single click.
- Also tested via `curl` commands for direct request validation.

> 💡 **Tip for Reviewers**: Opening `test.http` in VS Code allows you to execute and verify every API endpoint instantly without any additional setup.

---

## 📁 Project Structure

```
src/
├── users/
│   ├── dto/              # Request validation (class-validator)
│   ├── entities/         # User table definition (TypeORM)
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── posts/
│   ├── dto/              # Request validation (class-validator)
│   ├── entities/         # Post table definition (TypeORM)
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── app.module.ts         # Root module (includes DB connection config)
└── main.ts               # Application entry point
```

---

## 🛠️ Troubleshooting Experience

### [Case: Local Environment Data Loss]
- **Issue**: Accidental `rm -rf` command caused complete loss of `practice/lesson-01` source code and Git index.
- **Action**:
  1. Confirmed active WSL2 terminal session and utilized in-memory source code cache.
  2. Re-initialized Git (`git init`) and re-connected to the remote repository (origin).
  3. Reconstructed missing boilerplate files including `package.json` and `main.ts`.
  4. Re-mapped existing PostgreSQL database entities and verified full data consistency.
- **Learning**: Reinforced the importance of committing and pushing work to remote regularly during development.