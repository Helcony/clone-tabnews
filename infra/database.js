import { Client } from "pg";

async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.log("Something went wrong in the database");
    console.error(error)
    throw error;
  } finally {
    await client?.end();
  }
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

export async function getPostgresVersion() {
  const res = await query("SHOW server_version;");
  return res.rows[0].server_version;
}

export async function getMaxConnections() {
  const res = await query("SHOW max_connections;");
  return res.rows[0].max_connections;
}

export async function getCurrentConnections() {
  const res = await query(
    "SELECT count(*) FROM pg_stat_activity WHERE backend_type = 'client backend' AND state = 'active';",
  );
  return res.rows[0].count;
}

export async function getCurrentDbConnections(databaseName) {
  const res = await query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1 AND backend_type = 'client backend' AND state = 'active';",
    values: [databaseName],
  });
  return res.rows[0].count;
}

const database = {
  query,
  getNewClient,
};

export default database;
