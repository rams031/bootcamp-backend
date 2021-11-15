const express = require('express')
const router = express.Router();
const ProductModel = require('../models/product')
const jwt = require('jsonwebtoken');
const secret = 'TOP_SECRET';
const { view, viewID, create, edit, deleteID } = require('./Actions/Actions')



router.get('/', (req, res) => {
    view(ProductModel, res)
})

router.get('/:id', (req, res) => {
    viewID(ProductModel, req.params.id , res)
})

router.post('/', (req, res) => {
    ProductModel.create(req.body).then( response => {
        res.status(200).send(response)
    }).catch((err) => {
        res.send(500).send(err.message)
    })
})

router.put('/:id', (req, res) => {
    edit(ProductModel, req.params.id, req.body, res)
})

router.delete('/:id', (req, res) => {
    deleteProduct(req.params.id, res)
})
 


module.exports = router;