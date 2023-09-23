const express = require('express')
const expense = require('../models/expense')
const router = express.Router()
const Expense = require('../models/expense')
//get all
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find()
        res.json(expenses)
    } catch(err){
        res.status(500).json({ message: err.message})
    }

})
//get one
router.get('/:id', getExpense, (req, res) => {
    res.json(res.expense)
    
})
//create one
router.post('/', async(req, res) => {
    const expense = new Expense({
        type: req.body.type,
        vendor: req.body.vendor,
        paymentType: req.body.paymentType,
        amount: req.body.amount
    })
    try {
        const newExpense = await expense.save()
        res.status(201).json(newExpense)
    }catch(err){
        res.status(400).json({ message: err.message })
    }

})
//update one 
router.patch('/:id', getExpense, async(req, res) => {
    if(req.body.type != null) {
        res.task.type = req.body.type
    }
    if(req.body.vendor != null) {
        res.task.vendor = req.body.vendor
    }
    if(req.body.paymentType != null) {
        res.blog.paymentType = req.body.paymentType
    }
    if(req.body.amount != null) {
        res.blog.amount = req.body.amount
    }

    try{
        const updatedExpense = await res.expense.save()
        res.json(updatedExpense)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})
//delete one
router.delete('/:id', getExpense, async(req, res) => {
    try {
        await res.expense.remove()
        res.json({ message: 'Deleted Expense' })
    } catch (err){
        res.status(500).json({ message: err.message})
    }
}) 

async function getExpense(req, res, next) {
    let expense 
    try {
        expense = await Expense.findById(req.params.id)
        if (expense == null) {
            return res.status(404).json({ message: 'Cannot find expense'})
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.expense = expense
    next()
}

module.exports = router