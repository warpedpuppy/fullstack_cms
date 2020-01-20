const express = require('express')
const AuthService = require('./auth-service')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { username, password } = req.body
    const loginUser = { username, password }

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    AuthService.getUserWithUserName(
      req.app.get('db'),
      loginUser.username
    )
    .then(dbUser => {
        if (!dbUser)
          return res.status(400).json({
            error: 'Incorrect username or password',
          })

        return AuthService.comparePasswords(loginUser.password, dbUser.password)
        .then(compareMatch => {
            if (!compareMatch)
              return res.status(400).json({
                error: 'Incorrect username or password',
              })

            const sub = dbUser.username
            const payload = { user_id: dbUser.id }
            res.send({
              authToken: AuthService.createJwt(sub, payload),
            })
          })
      })
      .catch(next)
  })
.post('/register', jsonBodyParser, (req, res, next) => {

  const { password, username } = req.body

  for (const field of ['username', 'password'])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      })

  // TODO: check username doesn't start with spaces

  const passwordError = UsersService.AuthService(password)

  if (passwordError)
    return res.status(400).json({ error: passwordError })

  AuthService.hasUserWithUserName(
    req.app.get('db'),
    username
  )
    .then(hasUserWithUserName => {
      if (hasUserWithUserName)
        return res.status(400).json({ error: `Username already taken` })

      return AuthService.hashPassword(password)
        .then(hashedPassword => {
          const newUser = {
            username,
            password: hashedPassword,
            date_created: 'now()',
          }

          return AuthService.insertUser(
            req.app.get('db'),
            newUser
          )
            .then(user => {
              res
                .status(201)
                .json(AuthService.serializeUser(user))
            })
        })
    })
    .catch(next)
})
module.exports = authRouter
