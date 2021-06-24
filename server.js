// Tohar and Adi
const express = require('express')
    require('./Data/dataBaseMongo'),
    path = require('path'),
    routers = require('./server/index.js');
const port = 3001;

const app = express();
app.use('/addTrip', express.static(path.join(__dirname, 'client/add_tour_form.html')));
app.use('/updateTrip/:id', express.static(path.join(__dirname, 'client/update.html')));
app.use('/main', express.static(path.join(__dirname, 'client/Shuru-Turu.html')));
app.use('/public', express.static(path.join(__dirname, 'client')));
app.use('/add_guide', express.static(path.join(__dirname, 'client/add_guide_form.html')));

app.use(express.json());
app.use('/', routers);
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});

