import { Client } from 'pg'

async function query(queryObject) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        ssl: getSSLValues(),
    })

    try {
        await client.connect()
        const result = await client.query(queryObject)
        return result
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        await client.end()
    }
}

function getSSLValues() {
    if (process.env.POSTGRES_CA) {
        return {
            ca: process.env.POSTGRES_CA
        }
    }
    
    return process.env.NODE_ENV === "production" ? true : false
}

export async function getPostgresVersion() {
    const res = await query('SHOW server_version;')
    return res.rows[0].server_version
}

export async function getMaxConnections() {
    const res = await query('SHOW max_connections;')
    return res.rows[0].max_connections
}

export async function getCurrentConnections(databaseName) {
    const res = await query({
        text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
        values: [databaseName]
    })
    return res.rows[0].count
}

export default {
    query: query,
};
