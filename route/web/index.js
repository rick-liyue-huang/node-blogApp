const express=require('express');
const mysql=require('mysql');

var db=mysql.createPool({host: 'localhost', user: 'root', password: 'newpass', database: 'blog'});

module.exports=function (){

  var router=express.Router();

  // get data from database
  router.get('/get_banners', (req, res)=>{
    db.query('SELECT * FROM banner_table', (err, data)=>{
      if(err){
        console.error(err);
        res.status(505).send('database error');
      }else{
        res.send(data);
      }
    });
  });

  
  router.get('/get_custom_evaluations', (req, res)=>{
    db.query('SELECT * FROM custom_evaluation_table', (err, data)=>{
      if(err){
        console.error(err);
        res.status(505).send('database error');
      }else{
        res.send(data);
      }
    });
  });

  return router;
};






















