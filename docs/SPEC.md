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
