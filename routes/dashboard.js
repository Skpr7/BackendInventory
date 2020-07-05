var express = require('express');
var router = express.Router();
const asyncHandler = require("express-async-handler");

router.get("/revenue", asyncHandler( async function(req, res, next){
    return res.json({'status':'ok'})
    }));
    
module.exports = router;