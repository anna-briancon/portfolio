import Database from "better-sqlite3"
import fs from "node:fs"
import path from "node:path"

const DATA_DIR = path.join(process.cwd(), "data")
const DB_PATH = path.join(DATA_DIR, "analytics.db")

let db: Database.Database | null = null

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function initSchema(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS analytics_sessions (
      id TEXT PRIMARY KEY,
      ip TEXT,
      user_agent TEXT,
      started_at TEXT NOT NULL DEFAULT (datetime('now')),
      last_seen_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      path TEXT,
      metadata TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (session_id) REFERENCES analytics_sessions(id)
    );

    CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events(session_id);
    CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
    CREATE INDEX IF NOT EXISTS idx_analytics_sessions_started ON analytics_sessions(started_at);
  `)
}

export function getDb(): Database.Database {
  if (db) return db
  ensureDataDir()
  db = new Database(DB_PATH)
  initSchema(db)
  return db
}
