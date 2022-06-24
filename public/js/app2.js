
const messageOne = document.querySelector("#message-1")
const allPlayerCard = document.querySelector(".all-player-card")


messageOne.textContent = "Loading...";
allPlayerCard.innerHTML = "";

let htmlCode = ``;

var playerData = document.getElementById("allPlayerData").getAttribute("data-name");

// console.log(playerData)

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

playerData = JSON.parse(playerData)

htmlCode = getHtml( playerData )

allPlayerCard.innerHTML = htmlCode;
messageOne.textContent = ""


// });


