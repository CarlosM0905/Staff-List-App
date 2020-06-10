const express = require('express');
const path = require('path');
const hbs = require('hbs');
const {db} = require('../database/db');

const app = express();
app.set('views', path.join(__dirname, '../', "views"));
app.set('view engine','hbs')

app.use(express.json());
app.use(express.urlencoded({extended: false}));


hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res)=>{
    db.query('SELECT staff_id, first_name, last_name, email FROM STAFF', (err, resultado)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }        
        res.render('home', {resultado});
    });
});


app.listen(3000, ()=>{
    console.log('Escuchando el puerto 3000');
})

