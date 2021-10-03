import request from "supertest";
import { app } from "../../../app";
/**
 * Jest automatically awaits return statements
 */
describe("Sign up", () => {
  it("return a 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
  });
  it("returns a 400 with an invalid email", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test.com",
        password: "password",
      })
      .expect(400);
  });
  it("returns a 400 with an invalid password", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "pass",
      })
      .expect(400);
  });
  it("throws error for duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(400);
  });
  it("sets a cookie after successful signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});

describe("Sign In", () => {
  it("fails when a email does not exist is supplied", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@demo.com",
        password: "12345678",
      })
      .expect(400);
  });
  it("fails when a invalid password is supplied", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "12345678",
      })
      .expect(400);
  });
  it("responds with a cookie for valid credentials", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});

describe("Sign out", () => {
  it("clears cookie after signout", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signout")
      .send({})
      .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});

describe("Current User", () => {
  it("responds with detail about current user", async () => {
    const cookie = await global.signIn();

    let response = await request(app)
      .get("/api/users/current-user")
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
  });

  it("responds with null for non-authenticated user", async () => {
    let response = await request(app)
      .get("/api/users/current-user")
      .send({})
      .expect(200);

    expect(response.body.currentUser).toBeNull();
  });
});

describe("Forgot password", () => {
  it("responds with 400 when email is not sent", async () => {
    return request(app).post("/api/users/forgot").send().expect(400);
  });
});

describe("Reset password", () => {
  it("responds with 400 when token is not provided", async () => {
    return request(app)
      .post("/api/users/reset")
      .send({
        password: "abc123",
        confirmPassword: "abc123",
      })
      .expect(400);
  });
  it("responds with 400 when password is not provided", async () => {
    return request(app)
      .post("/api/users/reset")
      .send({ confirmPassword: "abc123" })
      .expect(400);
  });
  it("responds with 400 when confirm password is not provided", async () => {
    return request(app)
      .post("/api/users/reset")
      .send({ confirmPassword: "abc123" })
      .expect(400);
  });
  it("responds with 400 when confirm password and password do not match", async () => {
    return request(app)
      .post("/api/users/reset")
      .send({
        password: "abc123",
        confirmPassword: "123abc",
      })
      .expect(400);
  });
});
