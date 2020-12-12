// Write your tests here
const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');
const { expectCt } = require('helmet');
const testUser = { username: "tester", password: "testing" };

describe("server.js", () => {
    describe("GET jokes", () => {
        it("should return 400 when not logged in", async () => {
            const res = await request(server).get("/api/jokes");
            expect(res.status).toBe(400);
        });
        it("should return json", async () => {
            const res = await request(server).get("/api/jokes");
            expect(res.type).toBe("application/json")
        });
    });
    describe("Adding new user", () => {
        it("should 201 when adding new user", async () => {
            await db("users").truncate() // clearing the tables
            const res = await request(server)
            .post("/api/auth/register")
            .send(testUser);
            expect(res.status).toBe(201)
        });
        it("should return 500 with an invalid user", async () => {
            const res = await request(server)
            .post("/api/auth/register")
            .send({ user: "tessie", pass: "tester" });
            expect(res.status).toBe(500);
        });
    });
    describe("login user", () => {
        it("should return 200 with test user", async () => {
            const res = await request(server)
            .post("/api/auth/login")
            .send(testUser);
            expect(res.status).toBe(200)
        });
        it("should return 401 when user is invalid", async () => {
            const res = await request(server)
            .post("/api/auth/login")
            .send({ username: "betsy", password: "does not exist" })
            expect(res.status).toBe(401)
        })
    })
})	