const request = require("supertest");
const app = require("../index.js");
const User = require("../models/User");

describe("Authentication API", () => {
  let token;

  beforeEach(async () => {
    await User.create({ email: "test@example.com", password: "password123" });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should not login with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "invalidpassword" });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });

  it("should logout a user", async () => {
    expect(token).toBeDefined();

    const res = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Logged out successfully");
  });
});
