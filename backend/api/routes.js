const express = require('express');
const orderRouter = express.Router();
let orderModel = require('../Model/todo.model.js');

// get list of all orders
orderRouter.route('/').get(function(req, res) {
    orderModel.find(function(err, order) {
        if(err) {
            console.log('error for fetching data', err);
        } else {
            console.log('data found');
            res.json(order)
        }
    });
});
// get specific order
orderRouter.route('/:id').get(function(req,res) {
    let id = req.params.id;
    orderModel.findById(id, function(err, data){
        if(err) {
            console.log('no data found for this ID'+err);
        } else {
            console.log('data found for specific ID');
            res.json(data)
        }
    })
})
// add new order into database
orderRouter.route('/add').post(function(req, res) {
    let order = new orderModel(req.body);
    order.save().then(data => {
        res.status(200).json({
            'order' : "order added successfully"
        })
    }).catch(err => {res.status(400).send('order failed')})
});
// update order in database
orderRouter.route('/update/:id').post(function(req, res) {
    console.log('checking response for update--', res);
    let id = req.params.id;
    orderModel.findById(id, function(err, detail){
       
        if(!detail) 
            res.status(400).send('data is not found', err);
         else 
         console.log('checking responsse for updated', detail);
         
            detail.todo_name = req.body.todo_name;
            detail.todo_description = req.body.todo_description;
            detail.todo_responsible = req.body.todo_responsible;
            detail.todo_priority = req.body.todo_priority;
            detail.save().then(data => {
                res.status(200).json({
                    'order' : "order updated successfully"
                })
            }).catch(err => {res.status(400).send('order failed')})
    });
});
// delete specific order
orderRouter.route('/delete/:id').get(function(req, res) {
    let id = req.params.id;
    orderModel.findByIdAndRemove(id, function(err, deleted) {
        if(err) res.json(err);
        else res.json('order remove successfully');
    })
})

module.exports = orderRouter;