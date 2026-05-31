const { resolve } = require('node:path');
const express = require('express');

const uploadsPath = resolve(__dirname, '..', '..', 'uploads');

const fileRouteConfig = express.static(uploadsPath);

module.exports = fileRouteConfig;
