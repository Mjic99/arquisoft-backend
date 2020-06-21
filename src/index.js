const express = require('express')
// require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const tagRouter = require('./routers/tag')
const fileRouter = require('./routers/file')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(tagRouter)
app.use(fileRouter)

app.listen(port, () => {
    console.log("server on port " + port)
})