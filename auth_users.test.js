const request = require('supertest');

const server = require('./api/server.js');

const good_username = "TESTING"
const good_password = "Test"
const bad_password = "test"
const good_cred = {username: good_username, password: good_password}
const bad_cred = {username: good_username, password: bad_password}

describe("Auth endpoints", () => {
  describe("Register endpoint", () => {
    it("Register", async () => {
        const expectedStatusCode = 201;
        const response = await request(server).post('/api/auth/register', good_cred );
        expect(response.status).toEqual(expectedStatusCode);
    })
    it("Register with exact same credentials", async () => {
        const expectedStatusCode = 500;
        const response = await request(server).post('/api/auth/register', good_cred );
        expect(response.status).toEqual(expectedStatusCode);
    })
  })
  describe("Login endpoint", () => {
    it("Login With Wrong Password", async () => {
        const expectedStatusCode = 500;
        const response = await request(server).post('/api/auth/login', bad_cred );
        expect(response.status).toEqual(expectedStatusCode);
    })
    it("Login With Correct Password", async () => {
        const expectedStatusCode = 200;
        const response = await request(server).post('/api/auth/login', good_cred );
        expect(response.status).toEqual(expectedStatusCode);
    })
  })
})
