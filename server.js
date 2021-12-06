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
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = { name: req.body.username, password: req.body.password}
        users.push(user);
        res.status(201).send()
    }catch(error){

    }
})

app.listen(port, () => {
    console.log(`:: listening on http://localhost:${port}`);
})