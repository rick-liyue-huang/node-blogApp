const express=require('express');
// const common=require('../../libs/common');

module.exports=function (){
  let router=express.Router();

  //check login status
  router.use((req, res, next)=>{
    if(!req.session['admin_id'] && req.url!='/login'){ //not login 
      res.redirect('/admin/login');
    }else{
      next();
    }
  });

  router.get('/', (req, res)=>{
    res.render('admin/index.ejs', {});
  });

  // route different sub address
  router.use('/login', require('./login.js')());
  router.use('/banners', require('./banners.js')());
  router.use('/custom', require('./custom.js')());

  return router;
};













