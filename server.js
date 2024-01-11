
const express = require('express');
const mongoose = require('mongoose');

const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const contactRouter = require('./routes/contactRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/contact', contactRouter);

app.use(express.static('public'));

app.listen(port, () => {
  mongoose.connect('mongodb+srv://hila31097:nmnWQN8ByE6ZwGmB@cluster0.hbdsbmv.mongodb.net/SheOut')
  console.log(`Server is running on port ${port}`);
});
