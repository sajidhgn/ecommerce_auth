const express = require('express');

require('dotenv').config();

const connectDB = require('./config/db');
connectDB();
const app = express();


// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/api/user', require('./routes/users'));
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })


const port = process.env.PORT ? process.env.PORT : 5000;


app.listen(port, () => console.log(`Listening on port ${port}`));