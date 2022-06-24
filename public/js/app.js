const playerForm = document.querySelector('form')
const search = document.querySelector("input")


const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const searchPlayerCard = document.querySelector(".search-player-card")


messageOne.textContent = ""
messageTwo.textContent = ""
let htmlCode = ``;

function dateConversion(matchDate){
    if(matchDate){
        return matchDate
    }
    else{
        return "Match Date Not Available" 
    }
}

function nextMatch(CCode , VsCCode ){

    if(CCode && VsCCode){

        return CCode + " Vs " + VsCCode

    }
    else{

        return "Not Available"
    }

}

function getHtml(playerList){

    var htmlCode = ""

    playerList.forEach( body => {

        
        htmlCode = htmlCode + `<div class="card">

            <article>
                <div class="player-image">

                    <img src="/img/${body.Id}.jpg" alt="${body.PFName}">
                
                </div>
                <div class="player-details">

                    <h3><b>Name: ${body.PFName}</b></h3>
                    <h4><b>Skill: ${body.SkillDesc}</b></h4>
                    <p>Value: ${body.Value} $</p>
                    <p>Next Match: ${ nextMatch(body.UpComingMatchesList[0].CCode, body.UpComingMatchesList[0].VsCCode)   }</p>
                    <p>Time: ${ dateConversion( body.UpComingMatchesList[0].MDate )} </p>
                
                </div>
            </article>
            
        </div>`

    });

    return htmlCode

}

playerForm.addEventListener("submit", ( e ) =>{

    e.preventDefault()
    const playerName = search.value 
    
    messageOne.textContent = "Loading...";
    searchPlayerCard.innerHTML = "";
    messageTwo.textContent = "";

    
    fetch("/search?player="+ playerName ).then(( response )=>{

        response.json().then(( data )=>{

            // console.log(data) 
            
            if(data.error){
                
                console.log( data.error )
                messageOne.textContent = data.error
                searchPlayerCard.innerHTML = "";
                messageTwo.textContent = "Thank you."
                
            }
            else{
                // console.log( data.body )
                var body = JSON.parse( data.body )

                var arr = [body]
                htmlCode = getHtml( arr )

                searchPlayerCard.innerHTML = htmlCode;
                messageOne.textContent = ""
                // messageTwo.textContent = "Thank you."
            }
        
        })
    })

})

