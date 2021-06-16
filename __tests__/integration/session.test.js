const request = require("supertest");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

const app = require("../../src/app");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    console.log("should authenticate with valid credentials session test");

    const user = await User.create({
      name: "Alex",
      email: "alex@gmail.com",
      password: "123456",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.status).toBe(200);
  });

  it("should not authenticate with valid credentials", async () => {
    console.log("should not authenticate with valid credentials session test");

    const user = await User.create({
      name: "Alex",
      email: "alex@gmail.com",
      password: "teste123",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "teste123ddddddds",
    });

    expect(response.status).toBe(401);
  });

  it("should return jwt token when be authenticated", async () => {
    console.log("should return jwt token when be authenticated");

    const user = await User.create({
      name: "Alex",
      email: "alex@gmail.com",
      password: "teste123",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "teste123",
    });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    console.log("should be able to access private routes when authenticated");

    const user = await User.create({
      name: "Alex",
      email: "alex@gmail.com",
      password: "teste123",
    });

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should not be able to access private routes without jwt token", async () => {
    console.log(
      "should not be able to access private routes without jwt token"
    );

    const user = await User.create({
      name: "Alex",
      email: "alex@gmail.com",
      password: "teste123",
    });

    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });
});
