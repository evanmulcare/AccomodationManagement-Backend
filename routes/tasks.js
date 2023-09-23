const express = require('express')
const task = require('../models/task')
const router = express.Router()
const Task = require('../models/task')
//get all
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch(err){
        res.status(500).json({ message: err.message})
    }

})
//get one
router.get('/:id', getTask, (req, res) => {
    res.json(res.task)
    
})
//create one
router.post('/', async(req, res) => {
    const task = new Task({
        title: req.body.title,
        body: req.body.body,
        priority: req.body.priority,
        assigned: req.body.assigned
    })
    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    }catch(err){
        res.status(400).json({ message: err.message })
    }

})
//update one 
router.patch('/:id', getTask, async(req, res) => {
    if(req.body.title != null) {
        res.task.title = req.body.title
    }
    if(req.body.body != null) {
        res.task.body = req.body.body
    }
    if(req.body.priority != null) {
        res.blog.priority = req.body.priority
    }
    if(req.body.assigned != null) {
        res.blog.assigned = req.body.assigned
    }
    try{
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})
//delete one
router.delete('/:id', getTask, async(req, res) => {
    try {
        await res.task.remove()
        res.json({ message: 'Deleted Task' })
    } catch (err){
        res.status(500).json({ message: err.message})
    }
}) 

async function getTask(req, res, next) {
    let task 
    try {
        task = await Task.findById(req.params.id)
        if (Task == null) {
            return res.status(404).json({ message: 'Cannot find Task'})
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.task = task
    next()
}

module.exports = router