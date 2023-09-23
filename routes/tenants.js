const express = require('express')
const tenant = require('../models/tenant')
const router = express.Router()
const Tenant = require('../models/tenant')
//get all
router.get('/', async (req, res) => {
    try {
        const tenants = await Tenant.find()
        res.json(tenants)
    } catch(err){
        res.status(500).json({ message: err.message})
    }

})
//get one
router.get('/:id', getTenant, (req, res) => {
    res.json(res.tenant)
    
})
//create one
router.post('/', async(req, res) => {
    const tenant = new Tenant({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        caravanid: req.body.caravanid
    })
    try {
        const newTenant = await tenant.save()
        res.status(201).json(newTenant)
    }catch(err){
        res.status(400).json({ message: err.message })
    }

})
//update one 
router.patch('/:id', getTenant, async(req, res) => {
    if(req.body.firstname != null) {
        res.tenant.firstname = req.body.firstname
    }
    if(req.body.lastname != null) {
        res.tenant.lastname = req.body.firstname
    }
    if(req.body.email != null) {
        res.tenant.email = req.body.firstname
    }
    if(req.body.address != null) {
        res.tenant.address = req.body.firstname
    }
    if(req.body.caravanid != null) {
        res.tenant.caravanid = req.body.firstname
    }
    try{
        const updatedTenant = await res.tenant.save()
        res.json(updatedTenant)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})
//delete one
router.delete('/:id', getTenant, async(req, res) => {
    try {
        await res.tenant.remove()
        res.json({ message: 'Deleted Tenant' })
    } catch (err){
        res.status(500).json({ message: err.message})
    }
}) 

async function getTenant(req, res, next) {
    let tenant 
    try {
        tenant = await Tenant.findById(req.params.id)
        if (tenant == null) {
            return res.status(404).json({ message: 'Cannot find tenant'})
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.tenant = tenant
    next()
}

module.exports = router