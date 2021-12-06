const express = require('express');
const app = express();
const bcrypt =require('bcrypt');

app.use(express.json())
const port = process.env.PORT || 8080;

const users = [
    
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
        const user = { name: req.body.name, password: hashedPassword, }
        users.push(user);
        res.status(201).send("user created")
    }catch(error){
        res.status(500).send("error creating user",);
        console.log(error)
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find((user) => user.name = req.body.name)
    if(user == null){
        return res.status(400).send("user not found")
    }
    try{
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send("successfully logged in")
        }else{
            res.send("name or password incorrect");
        }
    }catch(error){
        res.status(500).send("error")
    }
})

app.listen(port, () => {
    console.log(`:: listening on http://localhost:${port}`);
})