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

### 🔗 Relationship & Data Integrity
- **1:N (One-to-Many)**: A single user can own multiple posts.
- **ON DELETE CASCADE**: Explicitly implemented to ensure that when a `User` is deleted, all associated `Post` records are automatically removed by the RDBMS.
- **Foreign Key Enforcement**: Verified that posts cannot be created for non-existent users (prevents orphaned data).

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
- Direct CLI (curl): Use the following sequence to verify the core logic (especially Cascade Delete).
  
Step A: Create a User & Get ID
'''bash
curl -X POST http://localhost:3000/users/signup \
     -H "Content-Type: application/json" \
     -d '{"email": "jacob@unist.ac.kr", "password": "password123"}'
'''
Step B: Create a Post linked to the User
'''
curl -X POST http://localhost:3000/posts \
     -H "Content-Type: application/json" \
     -d '{"title": "CASCADE Test", "content": "Testing auto-delete", "userId": 2}'
'''

Step C: Verify Relationship (Get All Posts)
'''
Bash
curl -X GET http://localhost:3000/posts
'''
Step D: Trigger Cascade Delete (Delete User)
'''Bash
curl -X DELETE http://localhost:3000/users/2
'''
Step E: Final Verification
'''Bash
curl -X GET http://localhost:3000/posts
'''

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

- ### [Case: Git Submodule & Index Mismatch]
- **Issue**: Presence of nested `.git` directories caused the project folder to be treated as an unpopulated submodule, preventing the source code from appearing on GitHub.
- **Action**: Removed internal `.git` folders, cleared the Git cache (`git rm --cached`), and re-indexed the project from the root.
- **Learning**: Gained clarity on how Git manages nested repositories and the importance of a clean repository root.

### [Case: Foreign Key Constraint Error (500)]
- **Issue**: Encountered a `500 Internal Server Error` when trying to create a post with a non-existent `userId`.
- **Action**: Confirmed the database's referential integrity was working as intended. Adjusted the test sequence to ensure a user exists before post creation.
