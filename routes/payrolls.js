const express = require('express')
const payroll = require('../models/payroll')
const router = express.Router()
const Payroll = require('../models/payroll')
//get all
router.get('/', async (req, res) => {
    try {
        const payrolls = await Payroll.find()
        res.json(payrolls)
    } catch(err){
        res.status(500).json({ message: err.message})
    }

})
//get one
router.get('/:id', getPayroll, (req, res) => {
    res.json(res.payroll)
    
})
//create one
router.post('/', async(req, res) => {
    const payroll = new Payroll({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        employeeid: req.body.employeeid,
        paymentType: req.body.paymentType,
        amount: req.body.amount
    })
    try {
        const newPayroll = await payroll.save()
        res.status(201).json(newPayroll)
    }catch(err){
        res.status(400).json({ message: err.message })
    }

})
//update one 
router.patch('/:id', getPayroll, async(req, res) => {
    if(req.body.firstname != null) {
        res.task.firstname = req.body.firstname
    }
    if(req.body.lastname != null) {
        res.task.lastname = req.body.lastname
    }
    if(req.body.employeeid != null) {
        res.blog.employeeid = req.body.employeeid
    }
    if(req.body.paymentType != null) {
        res.blog.paymentType = req.body.paymentType
    }
    if(req.body.amount != null) {
        res.blog.amount = req.body.amount
    }

    try{
        const updatedPayroll = await res.payroll.save()
        res.json(updatedPayroll)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})
//delete one
router.delete('/:id', getPayroll, async(req, res) => {
    try {
        await res.payroll.remove()
        res.json({ message: 'Deleted Payroll' })
    } catch (err){
        res.status(500).json({ message: err.message})
    }
}) 

async function getPayroll(req, res, next) {
    let payroll 
    try {
        payroll = await Payroll.findById(req.params.id)
        if (Payroll == null) {
            return res.status(404).json({ message: 'Cannot find Payroll'})
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.payroll = payroll
    next()
}

module.exports = router