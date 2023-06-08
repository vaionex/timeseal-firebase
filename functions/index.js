/*
 * This template contains a HTTP function that
 * responds with a greeting when called
 *
 * Reference PARAMETERS in your functions code with:
 * `process.env.<parameter-name>`
 * Learn more about building extensions in the docs:
 * https://firebase.google.com/docs/extensions/alpha/overview
 */

import functions from "firebase-functions";
import firebase from "firebase-admin";
import {
  getType,
  getFilteredData,
  tsValueChanged,
  transformData,
} from "./utils.js";
import config from "./config.js";

if (firebase.apps.length === 0) firebase.initializeApp();

export const timestamp = functions.firestore
  .document(`${config.COLLECTION_PATH}/{id}`)
  .onWrite(async (change) => {
    if (tsValueChanged(change)) return;
    const type = getType(change);
    const data = getFilteredData(change);

    const timestamp = {
      type,
      data: transformData(data),
      createdOn: new Date(),
    };
    const { id } = await firebase
      .firestore()
      .collection("timestamps")
      .add(timestamp);

    if (type !== "Delete") await change.after.ref.update({ ts: id });
  });
