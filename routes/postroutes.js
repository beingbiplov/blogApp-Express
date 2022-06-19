const express = require('express')
const app = express()
const blogDB = require('../config')

app.use(express.json())

const blogs = {
    1: {
        'title' : 'Titlee',
        'body' : 'Body segment'
    }, 
    2: {
        'title': 'Title 2',
        'body' : 'Body 2'
    }
}

app.get('/api', (req,res) => {
    res.send('/api')
})


// get all the posts from db 
app.get('/posts', async (req, res) =>{
    let result = await blogDB.get()
    const list = [];
    result.forEach((doc) => {
      const data = doc.data()
      data.id = doc.id
      list.push(data)
    })
    res.send(list)

})


// update blog post 
app.get('/post/:id', async (req, res) => {
    let post_id = req.params.id
    
    try {
        const result = await blogDB.doc(post_id).get();
        if (result.length <= 0){ res.status(404).send('Blog post not found')}
        else{
            let data = result.data()
            res.send(data);
        }
    } catch (e) {
        res.send(e);
    }
    
})

// add blog to db 
app.post('/posts', async (req, res) => {
    const data = req.body
     await blogDB.add(data)
    res.status(201).send('created')
})

// update blog post
app.put('/post/:id', async (req, res) =>{
    let post_id = req.params.id 
    const data = req.body
    try {

        await blogDB.doc(post_id).update(data)
        res.status(204).send('updated')
    }
    catch (e) {
        res.send(e);
    }
    
})

// delete blog post
app.delete('/post/:id', async (req, res) =>{
    let post_id = req.params.id 
    try {
        await blogDB.doc(post_id).delete()        
    }
    catch (e) {
        console.log('ERROR')
        res.status(404).send(e);
    }
    res.status(204).send('deleted')
})



module.exports = app