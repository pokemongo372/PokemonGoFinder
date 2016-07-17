var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
console.log("D");
var PokemonSchema   = new Schema({
    name:String,
    loc:{
         latitude:Number,
          longitude:Number
      }
     

});

module.exports = mongoose.model('Pokemon', PokemonSchema);

