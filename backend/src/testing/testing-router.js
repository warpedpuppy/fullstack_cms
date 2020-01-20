const express = require('express')
const testingRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/auth-middleware')
const AuthService = require('../auth/auth-service');

testingRouter
.get("/", (req, res) => {
    let jwt = AuthService.createJwt("testing", {testing: true})
    res
    .status(200)
    .json({success: true, jwt})
})
.post("/protected", jsonBodyParser, requireAuth, (req, res) => {
    res
    .status(200)
    .json({success: true})
})

module.exports = testingRouter;