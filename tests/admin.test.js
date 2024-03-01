const request = require("supertest");
const app = require("../index");
const User = require("../models/User");

describe("Admin API", () => {
  let adminToken;

  beforeEach(async () => {
    await User.create({
      email: "admin@example.com",
      password: "adminpassword",
      isAdmin: true,
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@example.com", password: "adminpassword" });
    adminToken = loginRes.body.token;
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("should create a new user as admin", async () => {
    const res = await request(app)
      .post("/api/admin/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "test@example.com", password: "testpassword" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
  });

  it("should edit an existing user as admin", async () => {
    const testUser = await User.create({
      email: "test@example.com",
      password: "testpassword",
    });

    const res = await request(app)
      .put(`/api/admin/users/${testUser._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "newemail@example.com" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User updated successfully");
  });
});
