var express = require('express');
var router = express.Router();
const asyncHandler = require("express-async-handler");
const fb = require('../../services/firebase');
const PRODUCT_COLLECTION = "products";

router.use(asyncHandler(async function(req, res, next){
    const headers = req.headers;
        try{
        if(!fb.verifyIdToken(headers.id_token, headers.uid)){
        return res.json({status:"Access is prohibited"})
        }
        next();
    }catch(err){
        console.error(`[Users API Middleware] : ${err}`)
        return res.json({status:"Access is prohibited"})
    }
}));

router.get("/all", asyncHandler(async function(req, res, next){
    try{
        const productList = await getAll(PRODUCT_COLLECTION)
        return res.json({products: productList})
    }catch(error){
        console.log(`[products/pd] error : ${error}`);
        return res.json({})
    }
    }));
        const getAll = async (collection_id) => {
        let resultList = []
        await fb.getDB()
    .collection(collection_id)
    .get()
    .then(snapshot => {
    snapshot.forEach( doc => {
    let prod = doc.data();
    prod["id"] = doc.id
    resultList.push(prod);
    });
    }).catch(err => {
    console.log(err)
    return resultList
    })
    return resultList
    }

    module.exports = router;

