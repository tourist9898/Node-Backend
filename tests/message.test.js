const request = require("supertest");
const app = require("../index");
const Message = require("../models/Message");

describe("Message API", () => {
  beforeEach(async () => {
    await Message.deleteMany();
  });

  it("should send a message in a group", async () => {
    const res = await request(app)
      .post("/api/messages")
      .send({ groupId: "group_id", content: "Test message" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Message sent successfully");
    expect(res.body.message).toHaveProperty("_id");
    expect(res.body.message).toHaveProperty("groupId", "group_id");
    expect(res.body.message).toHaveProperty("content", "Test message");
  });

  it("should like a message", async () => {
    const testMessage = await Message.create({
      groupId: "group_id",
      content: "Test message",
    });

    const res = await request(app).put(`/api/messages/${testMessage._id}/like`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toHaveProperty("likes", 1);
  });
});
