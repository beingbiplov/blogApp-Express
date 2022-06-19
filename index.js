const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const blog = require('./config')

const postRoutes = require('./routes/postroutes')

app.use(express.static('public'))

app.use('/api', postRoutes)

// app.post('/test', async (req, res) =>{
//     const data = req.body
//     let a = await blog.add(data)
//     res.send(a)
// })

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


