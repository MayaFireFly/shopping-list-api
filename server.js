import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './app/models';

const app = express();

const corsOptions = {
    origin :'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

db.sequelize.sync().then(() => { console.log(' After sync '); });

app.get('/', (req, res) => {
    res.send({message:'Welcome to my shopping list API.'});
});

require('./app/routes/shoppingList.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});