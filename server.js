const express = require('express');
const app = express();
const bcrypt =require('bcrypt');

app.use(express.json())
const port = process.env.PORT || 8080;

const users = [
    {
        username: 'henry',
        password: 'post 1'
    },
    {
        username: 'goodman',
        password: 'post 2'   
    }
]

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async(req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
    }catch(error){
        
    }
})

app.listen(port, () => {
    console.log(`:: listening on http://localhost:${port}`);
})