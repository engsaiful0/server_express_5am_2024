const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bijoylabbd:gIPHp0duVv79HMMl@cluster0.5f3jb.mongodb.net/5am-db?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;