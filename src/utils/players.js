var request = require("request");



function sort_by_key(array, key)
{
 return array.sort(function(a, b)
 {
  var x = parseInt(a[key]) ; var y = parseInt( b[key] ) ;
  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
 });
}

const searchPlayer = (playerName, callback) => {
    var options = {
        method: "GET",
        url: "https://jsonkeeper.com/b/V7KS",
        headers: {},
    };

    request(options, function (error, response, body) {

        // console.log(error, body);

        if (error){
            return callback( "Sorry we are offline at the moment" , null )
        }
        
        body = JSON.parse(body)
        var player = body.find(item => {
            return item.PFName.toLowerCase() == playerName.toLowerCase()
        })

        // console.log(player)
        if(player){

            return callback(null, player)

        }
        else{
            return callback("No player Found!", null)
        }

    });
};


const playerList = ( callback ) => {

    var options = {
        method: "GET",
        url: "https://jsonkeeper.com/b/V7KS",
        headers: {},
    };

    request(options, function (error, response, body) {

        // console.log(error, body);

        if (error){
            return callback( "Sorry we are offline at the moment" , null )
        }
        
        body = JSON.parse(body)
        var players = sort_by_key(body, "Value")
        // console.log(players)
        return callback(null, players)

    });
};

module.exports = {
    searchPlayer,
    playerList
}

