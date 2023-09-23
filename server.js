// Load environment variables from a .env file
require('dotenv').config()

const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

app.use(cors());

// Connect to the MongoDB database using the DATABASE_URL environment variable
const db = mongoose.connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

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

// Start the server on port 3001
app.listen(3001, () =>
    console.log("Express server is running on port 3001")
)