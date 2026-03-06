# Ping Pong – Fullstack Monorepo Stack

## Application Overview

A simple application where users can create and manage **Pong messages**.

### UI

The interface contains:

- **Ping button** – creates a new Pong message
- **Refresh button** – reloads the list of messages
- **Clear button** – deletes all messages
- **Pong message list**

### Pong Message Structure

Each message contains:

- **Date and time** (displayed in larger font)
- **UUID** (displayed in smaller font)

### Behavior

- When the app starts, it **loads the list of Pong messages**.
- Clicking **Ping** creates a new Pong message and **stores it in the database**.
- Clicking **Refresh** **reloads the messages** from the backend (no real-time updates).
- Clicking **Clear** **removes all Pong messages** from the database.
- There is **no authentication**. All users share a **single table**.

---

# Monorepo Requirements

## Workspace & Tooling

The monorepo should include:

- **pnpm workspaces**
- **Docker containers**

---

# Applications

### `api`

- Backend service
- Built with **Fastify**

### `web`

- Web frontend
- Built with:
  - **React**
  - **Vite**
  - **TanStack Query**
  - **Tailwind CSS**

---

# Shared Packages

### `db`

- Database schema and configuration
- **Drizzle ORM**
- Types **inferred from schema**

---

# Database

- **PostgreSQL**
- Managed through Docker containers

---

# Environment Files

```
.env.local
```

---

# Docker Containers

| Container | Purpose                |
| --------- | ---------------------- |
| `db-dev`  | Development PostgreSQL |
| `api-dev` | Development API        |

---

# Ports

| Service    | Dev  |
| ---------- | ---- |
| PostgreSQL | 5432 |
| API        | 3000 |
| Vite (web) | 5173 |

---

# Dependency Management

- Use **Context7** to:
  - access the **latest documentation**
  - install the **latest compatible dependency versions**

---

# Command List

### Infrastructure

- `docker:up` — start all containers (`db-dev`, `api-dev`)
- `docker:down` — stop and remove containers (keep database volumes)
- `docker:reset` — stop containers and remove volumes (wipe databases)
- `db:push` — push Drizzle schema

### Development

- `web:dev` — start the Vite development server for the web app (`5173`)
