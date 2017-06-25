const express=require('express');

module.exports=function (){
  var router=express.Router();

  router.get('/', (req, res)=>{
    res.send('this is web').end();
  });

  return router;
};
