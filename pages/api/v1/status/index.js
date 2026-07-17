import {
  getPostgresVersion,
  getMaxConnections,
  getCurrentConnections,
  getCurrentDbConnections,
} from "infra/database.js";

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const postgresVersion = await getPostgresVersion();

  const maxConnections = await getMaxConnections();

  const currentConnections = await getCurrentConnections();

  const databaseName = req.query.databaseName;

  const currentDbConnections = databaseName
    ? await getCurrentDbConnections(databaseName)
    : "No database specified";

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersion,
        max_connections: parseInt(maxConnections),
        current_connections: parseInt(currentConnections),
        current_db_connections: currentDbConnections,
      },
    },
  });
}

export default status;
