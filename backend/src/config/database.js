import { MongoClient } from 'mongodb';

let client = null;
let db = null;

/**
 * Connect to MongoDB Atlas (or local fallback) using a reusable MongoClient.
 *
 * @param {string} [uri] - Connection URI, defaults to process.env.MONGODB_URI
 * @param {string} [dbName] - Database name, defaults to process.env.DATABASE_NAME
 * @returns {Promise<import('mongodb').Db>}
 */
export async function connectDB(uri = process.env.MONGODB_URI, dbName = process.env.DATABASE_NAME || 'email_writing_assessment') {
  if (db) {
    return db;
  }

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined.');
  }

  try {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
    });

    await client.connect();

    // Verify connection with a ping
    db = client.db(dbName);
    await db.command({ ping: 1 });

    console.log(`Connected to MongoDB database: ${dbName}`);

    // Initialize required indexes
    await initIndexes(db);

    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    client = null;
    db = null;
    throw error;
  }
}

/**
 * Retrieve the active database instance.
 * @returns {import('mongodb').Db}
 */
export function getDB() {
  if (!db) {
    throw new Error('Database is not connected. Call connectDB() first.');
  }
  return db;
}

/**
 * Retrieve the underlying MongoClient instance.
 * @returns {import('mongodb').MongoClient | null}
 */
export function getClient() {
  return client;
}

/**
 * Initialize essential collection indexes.
 * @param {import('mongodb').Db} database
 */
async function initIndexes(database) {
  try {
    // submissions index for quick retrieval of user history by sessionId sorted by submittedAt
    await database.collection('submissions').createIndex(
      { sessionId: 1, submittedAt: -1 },
      { name: 'idx_submissions_session_submitted' }
    );
  } catch (error) {
    console.warn('Index creation warning:', error.message);
  }
}

/**
 * Safely close the database connection.
 */
export async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed.');
  }
}
