const express = require('express');
const app = express();
const bcrypt =require('bcrypt');

app.use(express.json())
const port = process.env.PORT || 8080;

const users = [
    {
        name: 'henry',
        password: 'post 1'
    },
    {
        name: 'goodman',
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
        console.log(`salt: ${salt}`);
        console.log(`password: ${hashedPassword}`);
        const user = { name: req.body.username, password: hashedPassword, }
        users.push(user);
        res.status(201).send("user created")
    }catch(error){
        res.status(500).send("error creating user",);
        console.log(error)
    }
})

app.post('/users/login', (req, res) => {
    const user = users.fin
})

app.listen(port, () => {
    console.log(`:: listening on http://localhost:${port}`);
})