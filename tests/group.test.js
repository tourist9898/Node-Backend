const request = require("supertest");
const app = require("../index");
const Group = require("../models/Group");

describe("Group API", () => {
  beforeEach(async () => {
    await Group.deleteMany();
  });

  it("should create a new group", async () => {
    const res = await request(app)
      .post("/api/groups")
      .send({ name: "Test Group", description: "This is a test group" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Group created successfully");
    expect(res.body.group).toHaveProperty("_id");
    expect(res.body.group).toHaveProperty("name", "Test Group");
    expect(res.body.group).toHaveProperty(
      "description",
      "This is a test group"
    );
  });

  it("should delete an existing group", async () => {
    const testGroup = await Group.create({
      name: "Test Group",
      description: "This is a test group",
    });

    const res = await request(app).delete(`/api/groups/${testGroup._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Group deleted successfully");
  });

  it("should search groups by name or description", async () => {
    await Group.create({
      name: "Test Group 1",
      description: "This is test group 1",
    });
    await Group.create({
      name: "Test Group 2",
      description: "This is test group 2",
    });

    const res = await request(app)
      .get("/api/groups/search")
      .query({ query: "test" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.groups).toHaveLength(2);
  });
});
