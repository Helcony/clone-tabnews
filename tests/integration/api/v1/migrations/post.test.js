import database from "infra/database"

beforeAll(cleanDatabase)

async function cleanDatabase() {
    await database.query("drop schema public cascade; create schema public")
}

test("POST to /api/v1/migrations should return 200", async () => {
    const res = await fetch("http://localhost:3000/api/v1/migrations", {
        method: 'POST',
    })
    expect(res.status).toBe(201)

    const responseBody = await res.json()

    expect(responseBody.length).toBeGreaterThan(0)

    const res1 = await fetch("http://localhost:3000/api/v1/migrations", {
        method: 'POST',
    })
    expect(res1.status).toBe(200)

    const responseBody1 = await res1.json()

    expect(responseBody1.length).toBe(0)

})
