import request from "supertest";
import { app } from "../../../app";
/**
 * Jest automatically awaits return statements
 */

describe("Contact Form", () => {
  it("responds with 400 when email, name and message is not provided", async () => {
    return request(app).post("/api/support").send({}).expect(400);
  });
  it("responds with 400 when email is not provided", async () => {
    return request(app)
      .post("/api/support")
      .send({
        name: "Saurav Adhikari",
        message: "Hello",
      })
      .expect(400);
  });
  it("responds with 400 when name is not provided", async () => {
    return request(app)
      .post("/api/support")
      .send({
        email: "t@t.com",
        message: "Hello",
      })
      .expect(400);
  });
  it("responds with 400 when message is not provided", async () => {
    return request(app)
      .post("/api/support")
      .send({
        email: "t@t.com",
        name: "Saurav Adhikari",
      })
      .expect(400);
  });
  it("responds with 201 when all info is provided", async () => {
    return request(app)
      .post("/api/support")
      .send({
        email: "t@t.com",
        name: "Saurav Adhikari",
        message: "Hi",
      })
      .expect(201);
  });
});
