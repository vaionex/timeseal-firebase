import config from "./config.js";
import sha256 from "crypto-js/sha256.js";
import AES from "crypto-js/aes.js";
import Base64 from "crypto-js/enc-base64.js";

export function getType(change) {
  if (!change.after.exists) return "delete";
  if (!change.before.exists) return "create";
  return "update";
}

export function getData(change) {
  if (change.after.exists) return change.after.data();
  return change.before.data();
}

export function getFilteredData(change) {
  const commaSeparatedFields = config.FIELDS_TO_AUDIT || "";
  const fields = commaSeparatedFields.split(",").filter(Boolean);
  const data = getData(change);

  if (fields.length === 0) return data;

  return Object.keys(data).reduce((acc, key) => {
    if (fields.includes(key)) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
}

export function tsValueChanged(change) {
  const beforeTS = (change.before.data() || {})["ts"];
  const afterTS = (change.after.data() || {})["ts"];

  return afterTS && beforeTS !== afterTS;
}

export function transformData(data) {
  switch (config.STORAGE_METHOD) {
    case "onchain":
      return JSON.stringify(data);

    case "hashed":
      return Base64.stringify(sha256(JSON.stringify(data)));

    case "salted-hashed":
      return Base64.stringify(
        sha256(JSON.stringify(data) + "." + config.ENCRYPTION_KEY)
      );

    case "encrypted":
      return AES.encrypt(
        JSON.stringify(data),
        config.ENCRYPTION_KEY || ""
      ).toString();

    default:
      return data;
  }
}
