# Node.js Newsletter Application

A modular Node.js application that reads RSS feed URLs from a PostgreSQL database, fetches the latest news from each RSS feed, and sends the news content via email to a list of recipients stored in the database.

---

## Features

- Fetches RSS URLs and recipient emails from a PostgreSQL database
- Parses multiple RSS feeds and merges news items
- Generates an HTML email with the latest news
- Sends the newsletter to all recipients using Nodemailer and Mailtrap.io
- Uses ES Modules and environment variables for configuration

---

## Prerequisites

- Node.js (v18+ recommended)
- npm
- PostgreSQL database (Supabase, Neon, or local)
- Mailtrap.io account for email testing

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

- Copy `.env.sample` to `.env` and fill in your credentials:

```
DATABASE_URL=your_postgres_connection_string
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass
```

- The `DATABASE_URL` should look like:
  ```
  postgresql://username:password@host:port/database
  ```

### 4. Set Up the Database

Create the required tables:

```sql
CREATE TABLE rss_feeds (
  id SERIAL PRIMARY KEY,
  rss_url TEXT NOT NULL
);

CREATE TABLE recipients (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL
);
```

Insert some test data:

```sql
INSERT INTO rss_feeds (rss_url) VALUES ('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
INSERT INTO recipients (email) VALUES ('your-email@example.com');
```

---

## Usage

To run the application:

```bash
npm start
```

The app will:

1. Connect to your PostgreSQL database
2. Fetch all RSS feed URLs and recipient emails
3. Parse all RSS feeds and merge the news items
4. Generate an HTML email with the news
5. Send the email to all recipients via Mailtrap

---

## Project Structure

```
src/
  app.js       # Main application flow
  config.js      # Loads environment variables
  database.js          # Database connection and queries
  rss-parser.js         # RSS feed parsing
  email-sender.js       # Email template and sending logic
.env             # Your environment variables (not committed)
.env.sample      # Sample environment variable keys
.gitignore       # Ignores node_modules and .env
package.json     # Project metadata and dependencies
README.md        # Project documentation
```

---

## Environment Variables

All configuration is managed via environment variables.  
**Never commit your `.env` file!**

| Variable        | Description                        |
|-----------------|------------------------------------|
| DATABASE_URL    | PostgreSQL connection string       |
| MAILTRAP_USER   | Mailtrap SMTP username             |
| MAILTRAP_PASS   | Mailtrap SMTP password             |

---

## Notes

- Uses ES Module (`import`/`export`) syntax (`"type": "module"` in `package.json`)
- Only `config.js` accesses `process.env`
- `.env` and `node_modules` are in `.gitignore`
- Test your database connection and Mailtrap credentials before running


---

## Credits

Assignment by Sholehghm.  
Starter code and structure by Sholehghm.

