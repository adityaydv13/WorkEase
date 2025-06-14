const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authMiddleware = require('../middleware/authorised');

router.post('/hire/:workerId',authMiddleware, searchController.hireWorker);
    

module.exports = router;