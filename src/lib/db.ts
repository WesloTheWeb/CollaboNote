/**
 * PostgreSQL Database Connection Module
 * 
 * This module provides direct access to the PostgreSQL database using the 'pg' package.
 * It creates a connection pool and provides methods for executing queries.
 */
import { Pool, QueryResult } from 'pg';

// Parse connection string from environment variable
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not set');
}

// Create connection pool with reasonable limits for security
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' 
    ? { 
        rejectUnauthorized: false 
      } 
    : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Increased timeout for Supabase
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('PostgreSQL error:', err);
});

/**
 * Type for query parameters
 */
type QueryParam = string | number | boolean | null | Date | Buffer;

/**
 * Database interface providing methods to interact with PostgreSQL
 */
const db = {
  /**
   * Execute a SQL query with security protections
   * 
   * @param text - SQL query text with parameterized values ($1, $2, etc.)
   * @param params - Array of parameter values to inject into query
   * @returns QueryResult from PostgreSQL
   */
  query: async (text: string, params?: QueryParam[]): Promise<QueryResult> => {
    const client = await pool.connect();
    try {
      const start = Date.now();
      const result = await client.query(text, params);
      const duration = Date.now() - start;
      
      // Log query details but never log sensitive parameters
      console.log('Executed query', { 
        text, 
        duration, 
        rows: result.rowCount,
        hasParams: params ? true : false,
        paramCount: params?.length
      });
      
      return result;
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    } finally {
      // Always release the client back to the pool
      client.release();
    }
  },
  
  /**
   * Get a client from the pool for transaction support
   * 
   * @returns PostgreSQL client from the pool
   */
  getClient: async () => {
    return await pool.connect();
  },
  
  /**
   * Ensure a specific table exists in the database
   * 
   * @param tableName - Name of the table to check/create
   * @param createTableSQL - SQL statement to create the table if it doesn't exist
   * @returns boolean indicating success
   */
  ensureTable: async (tableName: string, createTableSQL: string): Promise<boolean> => {
    try {
      // Check if table exists
      const tableExists = await db.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = $1
        );
      `, [tableName]);
      
      if (!tableExists.rows[0].exists) {
        console.log(`Table '${tableName}' does not exist, creating it...`);
        await db.query(createTableSQL);
        console.log(`Table '${tableName}' created successfully`);
      } else {
        console.log(`Table '${tableName}' already exists`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error ensuring table '${tableName}' exists:`, error);
      return false;
    }
  }
};

export default db;