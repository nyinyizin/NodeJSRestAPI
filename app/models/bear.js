/**
 * Created by nyinyizin on 16/4/14.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var BearSchema=new Schema({
    name:String
});


module.exports=mongoose.model('Bear',BearSchema);