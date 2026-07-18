# Koyomisan

## Quick links

- [Notion - Feature backlog](https://app.notion.com/p/39ac2c5560bd80e2a372f648c63ab6df?v=39ac2c5560bd80c2bbcd000cba1d65d9&source=copy_link)
- [Notion - Sales ideas](https://app.notion.com/p/39ac2c5560bd8070a1e8dc8d51723118?v=791c2c5560bd8362bff8086c88d0acd2&source=copy_link)
- [GitHub - Backlog project](https://github.com/users/Helcony/projects/3)

## Development steps

- Database - Ground floor: Write and run your DB migrations. Set up the exact tables, columns, foreign keys, and indexes this feature needs to store its state.

- Logic & TDD - The engine: Write failing unit tests based on your business rules (e.g., a customer shouldn't be able to book a slot that is in the past). Write the minimal backend code to make them turn green. Keep this isolated from web/HTTP code.

- API Route - The gate: Hook your engine to an HTTP endpoint (e.g., POST /api/v1/bookings). Ensure it parses incoming requests and outputs the exact JSON payload promised in your architecture contract.

- Frontend - The interface: Take your wireframed/styled UI view, add the JavaScript network call (fetch/axios) to hit your new API endpoint, and update the visual screen using the returned JSON data.

### For Q4, for every different feature

1. Run the pre-planned migration (that were made on Q3)

2. Write the tests and logic

3. Expose the API route

4. Build the frontend to match the already-designed high-fidelity layout
