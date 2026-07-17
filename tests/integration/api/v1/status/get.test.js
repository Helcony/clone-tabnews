import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET api/v1/status", () => {
  describe("Anon user", () => {
    test("Retrieving current system statuses", async () => {
      const res = await fetch("http://localhost:3000/api/v1/status");
      expect(res.status).toBe(200);

      const responseBody = await res.json();

      const updatedAt = responseBody.updated_at;
      const parsedUpdatedAt = new Date(updatedAt).toISOString();
      expect(updatedAt).toEqual(parsedUpdatedAt);

      const postgresVersion = responseBody.dependencies.database.version;
      expect(postgresVersion).toEqual("16.0");

      const maxConnections = responseBody.dependencies.database.max_connections;
      expect(maxConnections).toEqual(100);

      const currentConnections =
        responseBody.dependencies.database.current_connections;
      expect(currentConnections).toEqual(1);
    });
  });
});
