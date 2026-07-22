import {
  getPostgresVersion,
  getMaxConnections,
  getCurrentConnections,
  getCurrentDbConnections,
} from "infra/database.js";

import { InternalServerError } from "infra/errors";

async function status(req, res) {
  try {
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
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.log("Something went wrong in the controller");
    console.error(publicErrorObject);

    res.status(500).json(publicErrorObject);
  }
}

export default status;
