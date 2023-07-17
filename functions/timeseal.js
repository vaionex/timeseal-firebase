import config from "./config.js";
import axios from "axios"

export async function timestamp({ data, type }) {
  const response = await axios.post("https://api.timeseal.com/api/v1/timeseal", { data, type },
    {
      headers: {
        apiKey: config.API_KEY,
      }
    }
  );
  const { txIds = [], status, msg } = response.data

  if (status === "error") throw new Error(msg);

  const txId = txIds[0]?.txId;

  if (!txId) throw new Error("Did not receive transaction ID");

  return txId;
}
