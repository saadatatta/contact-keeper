const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();

//Middleware for json
app.use(express.json({extended: false}));

app.get('/',(req,res) => res.json({msg: "Hello and Welcome Back"}));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.port || 5000;
app.listen(PORT,()=>console.log(`Server on port ${PORT}`));