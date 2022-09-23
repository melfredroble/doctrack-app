const express = require('express')
const config = require('../config/db');
const router = express.Router()

// connection
let conn = config.connection

