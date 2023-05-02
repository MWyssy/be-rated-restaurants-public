const express = require('express');
const { Pool } = require('pg');
const db = new Pool();
const app = express();

if (!process.env.PGDATABASE) {
    throw new Error('No PGDATASE configured!');
}

module.exports = app;