process.env.TZ = 'UCT'
process.env.NODE_ENV = 'test'

require('dotenv').config()

const { expect } = require('chai')
const supertest = require('supertest')

process.env.TEST_DB_URL = process.env.TEST_DB_URL
  || ""
  
global.expect = expect
global.supertest = supertest
