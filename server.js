// Load environment variables from a .env file
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())

const URI = "mongodb+srv://root:root@cluster0.ntehv8k.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB')
    
    // Start the server only after successfully connecting to the database
    app.listen(3001, () => {
      console.log('Express server is running on port 3001')
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

// Parse JSON request bodies
app.use(express.json())

// Set up routes for tenants, employees, tasks, blogs, payments, payrolls, and expenses
const tenantRouter = require('./routes/tenants')
app.use('/tenants', tenantRouter)

const employeeRouter = require('./routes/employees')
app.use('/employees', employeeRouter)

const taskRouter = require('./routes/tasks')
app.use('/tasks', taskRouter)

const blogRouter = require('./routes/blogs')
app.use('/blogs', blogRouter)

const paymentRouter = require('./routes/payments')
app.use('/payments', paymentRouter)

const payrollRouter = require('./routes/payrolls')
app.use('/payrolls', payrollRouter)

const expenseRouter = require('./routes/expenses')
app.use('/expenses', expenseRouter)
