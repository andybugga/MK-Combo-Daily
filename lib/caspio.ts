const https://d2hci956.caspio.app/new-application/public/new-apppage = process.env.CASPIO_DOMAIN!;
const CASPIO_CLIENT_ID = process.env.CASPIO_CLIENT_ID!;
const CASPIO_CLIENT_SECRET = process.env.CASPIO_CLIENT_SECRET!;
const CASPIO_TABLE = process.env.CASPIO_TABLE!;
 
export async function getCaspioToken() {
  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("client_id", CASPIO_CLIENT_ID);
  body.append("client_secret", CASPIO_CLIENT_SECRET);

  const res = await fetch(`${CASPIO_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) throw new Error("Failed to get Caspio token");

  const data = await res.json();
  return data.access_token as string;
}

export async function insertVideoRecord(data: {
  fileName: string;
  storageKey: string;
  status: string;
}) {
  const token = await getCaspioToken();

  const res = await fetch(`${CASPIO_DOMAIN}/rest/v2/tables/${CASPIO_TABLE}/records`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: data.fileName,
      storageKey: data.storageKey,
      status: data.status,
    }),
  });

  if (!res.ok) throw new Error("Failed to insert Caspio record");

  return res.json();
}