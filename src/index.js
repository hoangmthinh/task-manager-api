const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
    
})

// const bcrypt = require('bcryptjs')

// const myFunc =  async () => {
//     const password = 'thuy-updated'
//     const hashPassword = await bcrypt.hash(password, 8)

//     console.log(password);
//     console.log(hashPassword);
    

//     const isMatch = await bcrypt.compare(password, hashPassword)
//     console.log('Matched: ' +isMatch);
    
    
// }

//  myFunc()

// const jwt = require('jsonwebtoken')

// const myFunc = async () => {
//     const secretKey = 'thisiscourse'
//     const token = jwt.sign({ _id: '123' }, secretKey, {expiresIn: '7 days'})
//     console.log('this is the token: ' + token);
    
//     const data = jwt.verify(token, secretKey)
//     console.log(data);
    
// }

// myFunc()

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async() => {
//     // const task = await Task.findById('5e104a3495f32819b91e7c33')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner);
    
//     const user = await User.findById('5e1047cc93947019a972fb76')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
    
// }

// main()