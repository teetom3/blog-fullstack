
const connectDB = require('./config/database')

const dotenv = require('dotenv')
dotenv.config({path : '.env'})
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
connectDB();
const User = require('./models/User');
console.log('✅ User model loaded:', User.modelName);
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); 
app.get('/api/test', (req, res ) => {
    res.json({message:'test ok', status: 'success'})
})

app.listen(port, () => {
    console.log(`Express server on, listening on port ${port}`
        )
})