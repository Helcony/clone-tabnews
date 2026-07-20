import useSWR from "swr";

async function fetchAPI(key) {
  const res = await fetch(key);
  const resBody = await res.json();
  return resBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status page</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdatedAtText = "Loading...";

  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {UpdatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseText = "Loading...";

  if (!isLoading && data) {
    const databaseJsonPath = data.dependencies.database;
    databaseText = (
      <>
        <div>Version: {databaseJsonPath.version}</div>
        <div>Connection limit: {databaseJsonPath.max_connections}</div>
        <div>Current connections: {databaseJsonPath.current_connections}</div>
        <div>
          Current connections on database (idk how to get the params yet, so
          this wont work): {databaseJsonPath.current_db_connections}
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      <div>{databaseText}</div>
    </>
  );
}
