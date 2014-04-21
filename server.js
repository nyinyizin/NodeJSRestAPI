

var express=require("express");
var app=express();
var bodyParser=require("body-parser");

var mongoose=require('mongoose');
mongoose.connect('mongodb://bearapi:bearapi@novus.modulusmongo.net:27017/gehih3Ax')

var Bear =require('./app/models/bear');
app.use(bodyParser());

var port=process.env.PORT || 8080;

var router=express.Router();

router.use(function(req,res,next){
   console.log('Something is happening');
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});
router.get('/',function(req,res){
    res.json({message:'Hooon! Welcome to our world of api'});
    console.log('%s %s %s', req.method, req.url, req.path);
});
router.route('/bears')
    .post(function(req,res){
   var bear=new Bear();
    bear.name=req.body.name;

    bear.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message:'bear created'});
    });
  }).get(function(req,res){
       Bear.find(function(err,bears){
           if(err){
               res.send(err);
           }
           res.json(bears);
       });
    });
router.route('/bears/:bear_id')
    .get(function(req,res){
        Bear.findById(req.params.bear_id,function(err,bear){
           if(err){
               res.send(err);
           }
            res.json(bear);
        });
    })
    .put(function(req,res){
       Bear.findById(req.params.bear_id,function(err,bear){
           if(err){
               res.send(err);
           }
           bear.name=req.body.name;
           bear.save(function(err){
               if(err){
                   res.send(err);
               }
               res.json({message:"Successfully updated"});
           });
       });
    })
    .delete(function(req,res){
       Bear.remove({
          _id:req.params.bear_id
       },function(err,bear){
           if(err){
               res.send(err);
           }
           res.json({message:"Successfully deleted"});
       });

    });
app.use('/api',router);
/*
app.get('/',function(req,res){
   res.send('Hello Welcome from my root');
});
*/
app.listen(port);
console.log('magic is happening on port'+port);