const express = require('express')
const payment = require('../models/payment')
const router = express.Router()
const Payment = require('../models/payment')
//get all
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find()
        res.json(payments)
    } catch(err){
        res.status(500).json({ message: err.message})
    }

})
//get one
router.get('/:id', getPayment, (req, res) => {
    res.json(res.payment)
    
})
//create one
router.post('/', async(req, res) => {
    const payment = new Payment({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        caravanid: req.body.caravanid,
        paymentType: req.body.paymentType,
        amount: req.body.amount
    })
    try {
        const newPayment = await payment.save()
        res.status(201).json(newPayment)
    }catch(err){
        res.status(400).json({ message: err.message })
    }

})
//update one 
router.patch('/:id', getPayment, async(req, res) => {
    if(req.body.firstname != null) {
        res.task.firstname = req.body.firstname
    }
    if(req.body.lastname != null) {
        res.task.lastname = req.body.lastname
    }
    if(req.body.caravanid != null) {
        res.blog.caravanid = req.body.caravanid
    }
    if(req.body.paymentType != null) {
        res.blog.paymentType = req.body.paymentType
    }
    if(req.body.amount != null) {
        res.blog.amount = req.body.amount
    }

    try{
        const updatedPayment = await res.payment.save()
        res.json(updatedPayment)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})
//delete one
router.delete('/:id', getPayment, async(req, res) => {
    try {
        await res.payment.remove()
        res.json({ message: 'Deleted Payment' })
    } catch (err){
        res.status(500).json({ message: err.message})
    }
}) 

async function getPayment(req, res, next) {
    let payment 
    try {
        payment = await Payment.findById(req.params.id)
        if (Payment == null) {
            return res.status(404).json({ message: 'Cannot find Payment'})
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.payment = payment
    next()
}

module.exports = router