import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './app/models';

const app = express();

var whitelist = ['http://192.168.1.6:3000', 'http://192.168.1.5', 'http://192.168.1.4', 'http://192.168.1.3', 'http://192.168.1.2', 'http://192.168.1.1'];
const corsOptions = {
    origin :whitelist
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