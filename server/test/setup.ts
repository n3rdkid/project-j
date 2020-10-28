import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

let mongo: any;
beforeAll(async () => {
  // Create a separate environment file for this
  process.env.JWT_KEY = "abcdef";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

/**
 * Reset all collections from DB
 */

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// If any errors occurs set signIn:Promise<string[]>
declare global {
  namespace NodeJS {
    interface Global {
      signIn(): Promise<string[]>;
    }
  }
}
// Since supertest doesn't automatically handle cookie like browser or Postman
global.signIn = async () => {
  const email = "test@test.com";
  const password = "123456789";
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  return response.get("Set-Cookie");
};
