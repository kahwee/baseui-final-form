const express = require('express');
const path = require('path');

const expressMiddleWare = router => {
  router.use('/static/fonts', express.static(path.join(__dirname, '../fonts')));
  router.use('/static/styles', express.static(path.join(__dirname, '../styles')));
};

module.exports = expressMiddleWare;
