const express=require('express');
const mysql=require('mysql');

let db=mysql.createPool({host: 'localhost', user: 'root', password: 'newpass', database: 'blog'});

module.exports=function (){
  let router=express.Router();

  router.get('/', (req, res)=>{
    switch(req.query.act){
      case 'mod':
        db.query(`SELECT * FROM banner_table WHERE id=${req.query.id}`, (err, data)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error');
          }else if(data.length==0){
            res.status(404).send('data not found');
          }else{
            db.query('SELECT * FROM banner_table', (err, banners)=>{
              if(err){
                console.error(err);
                res.status(500).send('database error');
              }else{
                res.render('admin/banners.ejs', {banners, mod_data: data[0]});
              }
            });
          }
        });
        break;
      case 'del':
        db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`, (err, data)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error');
          }else{
            res.redirect('/admin/banners');
          }
        });
        break;
      default:
        db.query('SELECT * FROM banner_table', (err, banners)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error');
          }else{
            res.render('admin/banners.ejs', {banners});
          }
        });
        break;
    }
  });
  router.post('/', (req, res)=>{
    let title=req.body.title;
    let description=req.body.description;
    let href=req.body.href;

    if(!title || !description || !href){
      res.status(400).send('arg error');
    }else{
      if(req.body.mod_id){    //modify

        db.query(`UPDATE banner_table SET \
          title='${req.body.title}',\
          description='${req.body.description}',\
          href='${req.body.href}' \
          WHERE ID=${req.body.mod_id}`,

          (err, data)=>{
            if(err){
              console.error(err);
              res.status(500).send('database error');
            }else{
              res.redirect('/admin/banners');
            }
          }
        );
      }else{ 
                       //add
        db.query(`INSERT INTO banner_table (title, description, href) VALUE('${title}', '${description}', '${href}')`, (err, data)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error');
          }else{
            res.redirect('/admin/banners');
          }
        });
      }
    }
  });

  return router;
};
