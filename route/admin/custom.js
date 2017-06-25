
const common = require(('../../libs/common.js'));
const mysql = require('mysql');
const express = require('express');
const pathLib = require('path');
const fs = require('fs');

let db=mysql.createPool({host: 'localhost', user: 'root', password: 'newpass', database: 'blog'});

module.exports = function() {

	let router = express.Router();

	router.get('/', (req, res) => {
		// res.send('ok');

		switch (req.query.act) {

			case 'del':

				db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.query.id}`, (err, data) => {
					if (err) {
						console.error(err);
						res.status(500).send('database error');
					} else {

						if (data.length == 0) {
							res.status(404).send('no this custom evaluation');
						} else {
							// used to delete the file
							fs.unlink('./static/upload/'+data[0].src, (err) => {
								if (err) {
									console.error(err);
									res.status(500).send('file operation fail');
								} else {

									db.query(`DELETE FROM custom_evaluation_table WHERE ID=${req.query.id}`, (err, data) => {
										if (err) {
											console.error(err);
											res.status(500).send('database error');
										} else {
											res.redirect('/admin/custom');
										}
									});	

								}
							});
						}
					}
				});
				break;

			case 'mod':
		        db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.query.id}`, (err, data)=>{
		          if(err){
		            console.error(err);
		            res.status(500).send('database error');
		          }else if(data.length==0){
		            res.status(404).send('no this evaluation');
		          }else{
		            db.query(`SELECT * FROM custom_evaluation_table`, (err, evaluations)=>{
		              if(err){
		                console.error(err);
		                req.status(500).send('database error');
		              }else{
		                res.render('admin/custom.ejs', {evaluations, mod_data: data[0]});
		              }
		            });
		          }
		        });
		        break;

			default:

				db.query(`SELECT * FROM custom_evaluation_table`, (err, data) => {
					if (err) {
						console.error(err);
						res.status(500).send('database error');
					} else {
						res.render('./admin/custom.ejs', {evaluations: data});
					}
				});
				break;
		}

	});

	router.post('/', function (req, res){
	    var title=req.body.title;
	    var description=req.body.description;

	    if(req.files[0]){
	      var ext=pathLib.parse(req.files[0].originalname).ext;

	      var oldPath=req.files[0].path;
	      var newPath=req.files[0].path+ext;

	      var newFileName=req.files[0].filename+ext;
	    }else{
	      var newFileName=null;
	    }

	    if(newFileName){
	      fs.rename(oldPath, newPath, (err)=>{
	        if(err){
	          console.error(err);
	          res.status(500).send('file opration error');
	        }else{
	          if(req.body.mod_id){  //modify

	            //firstly delete the odd one
	            db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.body.mod_id}`, (err, data)=>{
	              if(err){
	                console.error(err);
	                res.status(500).send('database error');
	              }else if(data.length==0){
	                res.status(404).send('old file not found');
	              }else{
	                fs.unlink('static/upload/'+data[0].src, (err)=>{
	                  if(err){
	                    console.error(err);
	                    res.status(500).send('file opration error');
	                  }else{
	                    db.query(`UPDATE custom_evaluation_table SET \
	                      title='${title}', description='${description}', \
	                      src='${newFileName}' \
	                      WHERE ID=${req.body.mod_id}`, (err)=>{
	                        if(err){
	                          console.error(err);
	                          res.status(500).send('database error');
	                        }else{
	                          res.redirect('/admin/custom');
	                        }
	                      });
	                  }
	                });
	              }
	            });
	          }else{                //add
	            db.query(`INSERT INTO custom_evaluation_table \
	            (title, description, src)
	            VALUES('${title}', '${description}', '${newFileName}')`, (err, data)=>{
	              if(err){
	                console.error(err);
	                res.status(500).send('database error');
	              }else{
	                res.redirect('/admin/custom');
	              }
	            });
	          }
	        }
	      });
	    }else{
	      if(req.body.mod_id){ 
	        //modify
	        db.query(`UPDATE custom_evaluation_table SET \
	          title='${title}', description='${description}' \
	          WHERE ID=${req.body.mod_id}`, (err)=>{
	            if(err){
	              console.error(err);
	              res.status(500).send('database error');
	            }else{
	              res.redirect('/admin/custom');
	            }
	          });
	      }else{                //add
	        db.query(`INSERT INTO custom_evaluation_table \
	        (title, description, src)
	        VALUES('${title}', '${description}', '${newFileName}')`, (err, data)=>{
	          if(err){
	            console.error(err);
	            res.status(500).send('database error');
	          }else{
	            res.redirect('/admin/custom');
	          }
	        });
	      }
	    }
	  });

	return router;
};


















