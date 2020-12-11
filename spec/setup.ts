import { Collection } from "mongoose";
import config from "../src/config";
import { conn } from "../src/models";
export const mongoOptions = config.MONGO_OPTIONS;

async function removeAllCollections() {
  const collections = Object.keys(conn.collections);

  await Promise.all(
    collections.map(async (collectionName) => {
      const collection = conn.collections[collectionName];
      await collection.deleteMany({});
    })
  );
}

async function dropAllCollections() {
  const collections = Object.keys(conn.collections);
  for (const collectionName of collections) {
    const collection = conn.collections[collectionName];

    try {
      await collection.drop();
    } catch (error) {
      if (error.message === "ns not found") {
        return;
      }

      if (
        error.message.includes("a background operation is currently running")
      ) {
        return;
      }

      console.log(error.message);
    }
  }
}

// this methods makes the result intermitent ()
//  afterEach(async () => {
//    await removeAllCollections();
//  });

afterAll(async () => {
  await dropAllCollections();
  await conn.close();
});
