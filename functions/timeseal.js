import config from "./config.js";

export async function timestamp({ data, type }) {
  const response = await fetch("https://api.timeseal.com/api/v1/timeseal", {
    method: "POST",
    body: JSON.stringify({ data, type }),
    headers: new Headers({
      "Content-Type": "application/json",
      apiKey: config.API_KEY,
    }),
  });
  const { txIds = [], status, msg } = await response.json();

  if (status === "error") throw new Error(msg);

  const txId = txIds[0]?.txId;

  if (!txId) throw new Error("Did not receive transaction ID");

  return txId;
}
