const express = require('express')
const employee = require('../models/employee')
const router = express.Router()
const Employee = require('../models/employee')
//get all
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch(err){
        res.status(500).json({ message: err.message})
    }

})
//get one
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee)
    
})
//create one
router.post('/', async(req, res) => {
    const employee = new Employee({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        employeeid: req.body.employeeid
    })
    try {
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    }catch(err){
        res.status(400).json({ message: err.message })
    }

})
//update one 
router.patch('/:id', getEmployee, async(req, res) => {
    if(req.body.firstname != null) {
        res.employee.firstname = req.body.firstname
    }
    if(req.body.lastname != null) {
        res.employee.lastname = req.body.firstname
    }
    if(req.body.email != null) {
        res.employee.email = req.body.firstname
    }
    if(req.body.address != null) {
        res.employee.address = req.body.firstname
    }
    if(req.body.employeeid != null) {
        res.employee.employeeid = req.body.firstname
    }
    try{
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})
//delete one
router.delete('/:id', getEmployee, async(req, res) => {
    try {
        await res.employee.remove()
        res.json({ message: 'Deleted employee' })
    } catch (err){
        res.status(500).json({ message: err.message})
    }
}) 

async function getEmployee(req, res, next) {
    let employee 
    try {
        employee = await Employee.findById(req.params.id)
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee'})
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.employee = employee
    next()
}

module.exports = router