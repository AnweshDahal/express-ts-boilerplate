# Express TS Boilerplate

Project Repository: [GitHub](https://github.com/AnweshDahal/express-ts-boilerplate)

This project uses:

1. Express (with TypeScript)
2. Drizzle ORM (with PostgreSQL)

This project has been tested on Node `v18.x` and `v20.x`

It is Recommended to use the [Perttier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension for a consistent layout and to avoid updating the whole file in a commit.

## Database Setup

This project is setup for **PostgreSQL**,

> A fallback for MySQL could be added in the future.

1. Install [PostgreSQL](https://www.postgresql.org/download/) if you haven't already.
2. If you are on a Linux system you might have to configure the server if you cannot connect to the server from places other than the `psql` command line. Edit the config file and uncomment the listen_address line

```bash
sudo nano /etc/postgresql/16/main/postgresql.conf
```

then

```
listen_addresses = '127.0.0.1'
```

## Project Setup

Begin by cloning the Repository

```bash
git clone REPO_LINK
```

Install the dependencies

```bash
npm i
```

Create `.env` file

```bash
cp .env.example .env
```

And set the appropriate values
