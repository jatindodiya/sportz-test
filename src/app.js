const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000

const { response } = require('express')
const { searchPlayer, playerList } = require('./utils/players')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Player Search',
        name: 'Jatin Dodiya'
    })
})


app.get("/players", (req, res ) =>{

    playerList( (error, resp ) =>{

        if(error){

            return res.send({
                error: error
            })
        }

        // console.log(resp)
        return res.render('players', {

            body: JSON.stringify(resp),
            title: 'All Players',
            name: 'Jatin Dodiya'
        }) 
    
    })

})

app.get("/search", (req, res) =>{

    if(!req.query.player){
        return res.send({
            error: "You must provide an player name!"
        })
    }

    searchPlayer(req.query.player, ( error , resp = {}) =>{
        if(error){

            return res.send({
                error: error
            })
        }

        return res.send({
            
            body: JSON.stringify(resp),
            playerName: req.query.player
        
        })
    })

   
})



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jatin Dodiya',
        errorMessage: 'Page not found!'
    })
})

app.listen( port , () => {
    console.log('Server is up on port : '+ port )
})