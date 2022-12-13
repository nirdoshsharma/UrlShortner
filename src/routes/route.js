//=====================Importing Module and Packages=====================//
const express = require('express');
const { createURL, redirectURL } = require('../Controller/urlController');
const router = express.Router();






//===================== User Registration(Post API) =====================//
router.post("/", createURL)
router.get("/:urlCode", redirectURL)




//=====================Module Export=====================//
module.exports = router;  