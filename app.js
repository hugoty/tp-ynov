const express = require('express');
const helmet = require('helmet');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');


const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./db/database'); 
const cors = require('cors')
require('dotenv').config();


connectDB();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(errorHandler);
app.use(cors())


app.use('/order', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/articles', articleRoutes);
app.use('/users', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
