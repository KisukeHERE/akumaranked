

const puuid = {
    "lucas": 'Y7q1qyzJxISzNlzxUCnM_ua48aXoInvFs2G1k1nG7LOgrCTvpRs8sxf953jJ8RL49A0vySNuF0AEiw',
    "patrick": 'It2LIApFpE0Dw-09pc1Ab2rhAnMJt27uQAGN6IQCwbK7gXZVjyG3JZVGRrLbJOgtvwxZNcVjiDSZMQ',
    "maeva": 'aBnTLJ5ht8j-YHI3JfXpxxQK04Xffb3WhgrQ1Og40ZbBjnZ6PWdTMgTsZSjn2l3rcG2YxIOP3zi7wg',
    "teo": 'CYkJ5sGcOXfg6RIHu3q9i1v_iJdoQgm3KqD2chRrFV1KD_V73NR4nnULDHSNM7eWTBC9HXbQDfTIZA',
    "malcom": 'yNa5pPtNhRSE5JxAWaRKem1B18oBTdMvwg9cpODMBFMbp3AwANfPkdEphC8p7QjmWUIPabFO98C1Rw',
    "rayane": 'EseubUP37XExmXjO-gNflyvKUI4kP7NXuMf0IaMTB7-jsaYwQVySYlylm4BGdBA7YDiqQe5f9nGT0w',
    "corentin": 'sDkWthJBUs6RvzzWVNs0rfZuvan5JIT7BIFYqPgBDq0N2-w_h3G0LBG8BXzibNdLznmtbtmlaljj8w'
}

// en local : matchs_nomdujoueur
let matchList = {
    "lucas": '',
    "patrick": '',
    "maeva": '',
    "teo": '',
    "malcom": '',
    "rayane": '',
    "corentin": ''
}

let rankData;


// en local (uwu)
let matchesDataListLucas = [];
let matchesDataListPatrick = [];
let matchesDataListMaeva = [];
let matchesDataListTeo = [];
let matchesData = [];

let sumsJson = [];

const APIKEY = 'RGAPI-6f87d86a-ab71-4790-95bb-083500aa7a8f';
const linkMatches = 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/';
const linkRank = 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/';
const linkMatchData = 'https://europe.api.riotgames.com/lol/match/v5/matches/';
/*
async function getSumsJSON() {
    try {
        response = await fetch('https://ddragon.leagueoflegends.com/cdn/15.24.1/data/en_US/summoner.json');
        sumsJson = await response.json();
        
    } catch (error) {
        console.log('erreur getSumsJSON');
    }
}
*/



// recup les dernieres games des joueurs

async function getMatches(puuid, player) {

    try {
        const response = await fetch(linkMatches + puuid + '/ids?queue=420&start=0&count=5&api_key=' + APIKEY);
        const data = await response.json();


        matchList[player] = data;


    } catch (error) {
        console.log('erreur');
    }   
    
}



async function getRank(puuid) {

    try {
        const response = await fetch(linkRank + puuid + '?api_key=' + APIKEY);
        const data = await response.json();


        rankData = data;


    } catch (error) {
        console.log('erreur');
    }   
    
}




// recup la data d'un match en particulier

async function getMatchData(tag) {
    try {
        const response = await fetch(linkMatchData + tag + '?api_key=' + APIKEY);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('erreur');
    }   
    
}
/*
async function getAllMatchsData(player) {
    matchesData = [];

    for (const matchId of matchList[player]) {
        const data = await getMatchData(matchId);
        matchesData.push(data);
    }

    /*localStorage.setItem(
        'matchdata',
        JSON.stringify(matchesData)
    );
    
}
*/

async function getAllMatchsData(player) {
    
    const promises = matchList[player].map(matchId =>
        getMatchData(matchId)
    );

    matchesData = await Promise.all(promises);

    
}

/*
async function testfunction() {
    matchList.forEach((data) => {
        getMatchData(String(data));
    });
}
*/
// getMatches(puuid.lucas, 'lucas')
// console.log(localStorage.getItem('matchs_lucas'))


// https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/EUW1_7669955176/ids?type=ranked&start=0&count=5&api_key=RGAPI-32fff365-050c-4d57-9cfe-309d95caa3e8
// https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_7669955176?api_key=RGAPI-32fff365-050c-4d57-9cfe-309d95caa3e8
/* NE FONCTIONNE PAS CAR : forEach ne retourne rien (undefined)

await sur forEach ne sert à rien

getMatchData() est async → tu pushes des Promises, pas des données

matchdata vaut toujours undefined

👉 Résultat : localStorage.setItem('matchdatalucas', ...) stocke undefined */
/*
async function getAllMatchsData() {
    matchesDataListLucas = [];
    const matchdata = matchList.lucas.forEach((data) => {
        const MatchesData = getMatchData(String(data));
        matchesDataListLucas.push(MatchesData);
    });

    localStorage.setItem('matchdatalucas', JSON.stringify(matchdata));
}
*/
function testdate() {
    const myDate = new Date(1767478935867);
    const options = {dateStyle: 'short'};
    console.log(myDate.toLocaleString('fr-FR', options));
    const date = new Date(1767478935867).toLocaleString('fr-FR', options);
    console.log(date);
}


function isOnPage() {
    if (document.URL.includes('patrick')) {
        return "patrick";
    } else if (document.URL.includes('lucas')) {
        return "lucas";
    } else if (document.URL.includes('maeva')) {
        return "maeva";
    } else if (document.URL.includes('teo')) {
        return "teo";
    } else if (document.URL.includes('malcom')) {
        return "malcom";
    } else if (document.URL.includes('rayane')) {
        return "rayane";
    } else if (document.URL.includes('corentin')) {
        return "corentin";
    }
}

function pushDataOnPage(playerlist, playername) {
    let html = '';
    let profile = '';
    let titlepage = '';
    let btndatanumber = 0;

    playerlist.forEach((match) => {
        match.info.participants.forEach((playernum) => {   
            if (playernum.puuid === puuid[playername]) {
                const opgg = 'https://op.gg/lol/summoners/euw/';
                let result = '';
                const options = {dateStyle: 'short'};
                const date = new Date(match.info.gameCreation).toLocaleString('fr-FR', options);
                const minutes = Math.floor(match.info.gameDuration / 60);
                const secondes = match.info.gameDuration - minutes * 60;
                const kda = ((playernum.kills + playernum.assists) / playernum.deaths).toFixed(2);
                let kp = (playernum.challenges.killParticipation * 100).toFixed();
                const totalcs = playernum.totalMinionsKilled + playernum.neutralMinionsKilled;
                const cspm = (totalcs / minutes).toFixed(1);
                const runePrincipale = playernum.perks.styles[0].selections[0].perk;
                const runeSecondaire = playernum.perks.styles[1].style;
                let borderresult = '';
                btndatanumber++;

                if (playernum.win === true) {
                    result = 'Victoire';
                    borderresult = 'match-victory';
                } else {
                    result = 'Défaite';
                    borderresult = 'match-defeat';
                }



                html += `
                
                
                
                    <div class="match-recap ${borderresult}">
                        <div class="match-infos">
                            <p>${date}</p>
                            <p>Ranked Solo/Duo</p>
                            <p>${minutes}m ${secondes}s</p>
                            <p>${result}</p>
                        </div>
                        <div class="champion-infos">
                            <div class="champion-data">
                                <div class="champion-icon-level">
                                    <img class="icon" src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${playernum.championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524" title="${playernum.championName}">
                                    <p class="level">${playernum.champLevel}</p>
                                </div>
                                <div class="champion-spells-runes">
                                    <div class="champion-spells">
                                        <img width="25px" src="./img/summonerspells/${playernum.summoner1Id}.png">
                                        <img width="25px" src="./img/summonerspells/${playernum.summoner2Id}.png">
                                    </div>
                                    <div class="champion-runes">
                                        <img src="./img/runes/${runePrincipale}.png">
                                        <img src="./img/runes/${runeSecondaire}.png">  
                                    </div>
                                    <div class="champion-kda">
                                        <p> ${playernum.kills} / ${playernum.deaths} / ${playernum.assists}</p>
                                        <p>${kda} KDA</p>
                                    </div>
                                </div>
                            </div>
                            <div class="champion-items">
                                <div class="item-bg"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${playernum.item0}.png" onerror="this.style.display ='none'"></div>
                                <div class="item-bg"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${playernum.item1}.png" onerror="this.style.display ='none'"></div>
                                <div class="item-bg"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${playernum.item2}.png" onerror="this.style.display ='none'"></div>
                                <div class="item-bg"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${playernum.item3}.png" onerror="this.style.display ='none'"></div>
                                <div class="item-bg"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${playernum.item4}.png" onerror="this.style.display ='none'"></div>
                                <div class="item-bg"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${playernum.item5}.png" onerror="this.style.display ='none'"></div>
                                <div class="item-bg"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${playernum.item6}.png" onerror="this.style.display ='none'"></div>

                            </div>
                        </div>
                        <div class="champion-kpcs">
                            <span>KP ${kp}%</span>
                            <span>CS ${totalcs} (${cspm})</span>
                        </div>
                        <div class="game-players">
                            <div class="game-players-bside">
                                <div class="champion-playername">
                                    <img src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${match.info.participants[0].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                    <a href="${opgg}${match.info.participants[0].riotIdGameName}-${match.info.participants[0].riotIdTagline}" target="_blank"><span>${match.info.participants[0].riotIdGameName}</span></a>
                                </div>
                                <div class="champion-playername">
                                    <img src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${match.info.participants[1].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                    <a href="${opgg}${match.info.participants[1].riotIdGameName}-${match.info.participants[1].riotIdTagline}" target="_blank"><span>${match.info.participants[1].riotIdGameName}</span></a>
                                </div>
                                <div class="champion-playername">
                                    <img src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${match.info.participants[2].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                    <a href="${opgg}${match.info.participants[2].riotIdGameName}-${match.info.participants[2].riotIdTagline}" target="_blank"><span>${match.info.participants[2].riotIdGameName}</span></a>
                                </div>
                                <div class="champion-playername">
                                    <img src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${match.info.participants[3].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                    <a href="${opgg}${match.info.participants[3].riotIdGameName}-${match.info.participants[3].riotIdTagline}" target="_blank"><span>${match.info.participants[3].riotIdGameName}</span></a>
                                </div>
                                <div class="champion-playername">
                                    <img src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${match.info.participants[4].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                    <a href="${opgg}${match.info.participants[4].riotIdGameName}-${match.info.participants[4].riotIdTagline}" target="_blank"><span>${match.info.participants[4].riotIdGameName}</span></a>
                                </div>
                            </div>
                            <div class="game-players-rside">
                                <div class="champion-playername">
                                    <img src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${match.info.participants[5].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                    <a href="${opgg}${match.info.participants[5].riotIdGameName}-${match.info.participants[5].riotIdTagline}" target="_blank"><span>${match.info.participants[5].riotIdGameName}</span></a>
                                </div>
                                <div class="champion-playername">
                                    <img src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${match.info.participants[6].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                    <a href="${opgg}${match.info.participants[6].riotIdGameName}-${match.info.participants[6].riotIdTagline}" target="_blank"><span>${match.info.participants[6].riotIdGameName}</span></a>
                                </div>
                                <div class="champion-playername">
                                    <img src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${match.info.participants[7].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                    <a href="${opgg}${match.info.participants[7].riotIdGameName}-${match.info.participants[7].riotIdTagline}" target="_blank"><span class="pname7">${match.info.participants[7].riotIdGameName}</span></a>
                                </div>
                                <div class="champion-playername">
                                    <img src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${match.info.participants[8].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                    <a href="${opgg}${match.info.participants[8].riotIdGameName}-${match.info.participants[8].riotIdTagline}" target="_blank"><span>${match.info.participants[8].riotIdGameName}</span></a>
                                </div>
                                <div class="champion-playername">
                                    <img src="https://opgg-static.akamaized.net/meta/images/lol/16.1.1/champion/${match.info.participants[9].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                    <a href="${opgg}${match.info.participants[9].riotIdGameName}-${match.info.participants[9].riotIdTagline}" target="_blank"><span>${match.info.participants[9].riotIdGameName}</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="btn-table-data-open">
                            <button class="btn-table-open-${btndatanumber} btn-table-data-open-btn "><i class="fa-solid fa-chevron-down"></i></button>
                        </div>
                    </div>

                `;


                let blueresult = "";
                let redresult = "";
                
                match.info.teams[0].win === true ? blueresult = 'Victoire' : blueresult = 'Défaite';
                match.info.teams[1].win === true ? redresult = 'Victoire' : redresult = 'Défaite';



                html += `
                    <div class="moredata" id="moredata${btndatanumber}">
                        <div class="table">
                            <div class="moredatablueside">
                                <table>
                                    <colgroup>
                                        <col width="183">
                                        <col width="68px">
                                        <col width="98px">
                                        <col width="100px">
                                        <col width="56px">
                                        <col width="195px">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th><span>${blueresult}</span> (Équipe bleue)</th>
                                            <th>Score</th>
                                            <th>KDA</th>
                                            <th>Dégâts</th>
                                            <th>CS</th>
                                            <th>Objets</th>
                                        </tr>
                                    </thead>
                                    <tbody>`


                for (let i = 0; i <5; i++) {
                    html += `
                        <tr>
                            <th>
                                <div class="table-player">
                                    <div class="table-player-icon-lvl">
                                        <img src="https://opgg-static.akamaized.net/meta/images/lol/15.24.1/champion/${match.info.participants[i].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                        <span>${match.info.participants[i].champLevel}</span>
                                    </div>
                                    <div class="table-player-sums-runes">
                                        <div class="table-player-sums">
                                            <img src="img/summonerspells/${match.info.participants[i].summoner1Id}.png">
                                            <img src="img/summonerspells/${match.info.participants[i].summoner2Id}.png">
                                        </div>
                                        <div class="table-player-runes">
                                            <img src="img/runes/${match.info.participants[i].perks.styles[0].selections[0].perk}.png">
                                            <img src="img/runes/${match.info.participants[i].perks.styles[1].style}.png">
                                        </div>
                                    </div>
                                    <div class="table-player-name">
                                        <span><a target="_blank" href="${opgg}${match.info.participants[i].riotIdGameName}-${match.info.participants[i].riotIdTagline}">${match.info.participants[i].riotIdGameName}<a/></span>
                                    </div>
                                </div>
                            </th>
                            <th>score</th>
                            <th>
                                <div class="table-player-kda">
                                    <span>${match.info.participants[i].kills}/${match.info.participants[i].deaths}/${match.info.participants[i].assists} (${(match.info.participants[i].challenges.killParticipation * 100).toFixed()}%)</span>
                                    <span>${(match.info.participants[i].challenges.kda).toFixed(2)}</span>
                                </div>
                                
                            </th>
                            <th>
                                <div class="table-player-dmg">
                                    <span>${(match.info.participants[i].totalDamageDealtToChampions).toLocaleString()}</span>
                                    <span>${(match.info.participants[i].challenges.teamDamagePercentage * 100).toFixed()}%</span>
                                </div>
                            </th>
                            <th>
                                <div class="table-player-cs">
                                    <span>${(match.info.participants[i].totalMinionsKilled + match.info.participants[i].neutralMinionsKilled)}</span>
                                    <span>${((match.info.participants[i].totalMinionsKilled + match.info.participants[i].neutralMinionsKilled) / minutes).toFixed(1)}/m</span>
                                </div>
                            </th>
                            <th>
                                <div class="table-player-all-items">
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item0}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item1}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item2}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item3}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item4}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item5}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item6}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].roleBoundItem}.png" onerror="this.style.display ='none'"></div>
                                </div>
                            </th>
                        </tr>
                        ` 
                }


                html +=  `
                                </tbody>
                            </table>
                        </div>
                        <div class="moredataredside">
                            <table>
                                <colgroup>
                                    <col width="183">
                                    <col width="68px">
                                    <col width="98px">
                                    <col width="100px">
                                    <col width="56px">
                                    <col width="195px">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th><span>${redresult}</span> (Équipe rouge)</th>
                                        <th>Score</th>
                                        <th>KDA</th>
                                        <th>Dégâts</th>
                                        <th>CS</th>
                                        <th>Objets</th>
                                    </tr>
                                </thead>
                                <tbody>`


                for (let i = 5; i < 10; i++) {
                    html += `              
                        <tr>
                            <th>
                                <div class="table-player">
                                    <div class="table-player-icon-lvl">
                                        <img src="https://opgg-static.akamaized.net/meta/images/lol/15.24.1/champion/${match.info.participants[i].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1524">
                                        <span>${match.info.participants[i].champLevel}</span>
                                    </div>
                                    <div class="table-player-sums-runes">
                                        <div class="table-player-sums">
                                            <img src="img/summonerspells/${match.info.participants[i].summoner1Id}.png">
                                            <img src="img/summonerspells/${match.info.participants[i].summoner2Id}.png">
                                        </div>
                                        <div class="table-player-runes">
                                            <img src="img/runes/${match.info.participants[i].perks.styles[0].selections[0].perk}.png">
                                            <img src="img/runes/${match.info.participants[i].perks.styles[1].style}.png">
                                        </div>
                                    </div>
                                    <div class="table-player-name">
                                        <span><a target="_blank" href="${opgg}${match.info.participants[i].riotIdGameName}-${match.info.participants[i].riotIdTagline}">${match.info.participants[i].riotIdGameName}<a/></span>
                                    </div>
                                </div>
                            </th>
                            <th>score</th>
                            <th>
                                <div class="table-player-kda">
                                    <span>${match.info.participants[i].kills}/${match.info.participants[i].deaths}/${match.info.participants[i].assists} (${(match.info.participants[i].challenges.killParticipation * 100).toFixed()}%)</span>
                                    <span>${(match.info.participants[i].challenges.kda).toFixed(2)}</span>
                                </div>
                                
                            </th>
                            <th>
                                <div class="table-player-dmg">
                                    <span>${(match.info.participants[i].totalDamageDealtToChampions).toLocaleString()}</span>
                                    <span>${(match.info.participants[i].challenges.teamDamagePercentage * 100).toFixed()}%</span>
                                </div>
                            </th>
                            <th>
                                <div class="table-player-cs">
                                    <span>${(match.info.participants[i].totalMinionsKilled + match.info.participants[i].neutralMinionsKilled)}</span>
                                    <span>${((match.info.participants[i].totalMinionsKilled + match.info.participants[i].neutralMinionsKilled) / minutes).toFixed(1)}/m</span>
                                </div>
                            </th>
                            <th>
                                <div class="table-player-all-items">
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item0}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item1}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item2}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item3}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item4}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item5}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].item6}.png" onerror="this.style.display ='none'"></div>
                                    <div class="table-player-item"><img src="https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${match.info.participants[i].roleBoundItem}.png" onerror="this.style.display ='none'"></div>
                                </div>
                            </th>
                        </tr>
                        `
                }

                html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                `



                

                
                profile = `
                    <div class="profile-header">
                        <div class="profile-img">
                            <img src="img/icons/${playername}.webp">
                        </div>
                        <!-- remplacer par l'api-->
                        <div class="profile-infos">
                            <span class="lvl">Niv. ${playernum.summonerLevel}</span>
                            <span class="nom">${playername}</span>
                            <span class="pseudo">${playernum.riotIdGameName}#${playernum.riotIdTagline}</span>
                        </div>`;
                if (rankData[0]) {
                    let winrate;
                    winrate = (rankData[0].wins / (rankData[0].wins + rankData[0].losses) * 100).toFixed();

                    profile += `<div class="rank-wr">
                                    <div class="winrate">
                                        <span>${winrate}% WR</span>
                                        <div class="winrate-games">
                                            <span>( ${rankData[0].wins}V / ${rankData[0].losses}D )</span>
                                        </div>
                                    </div>
                                    <div class="rank">
                                        <img src="img/rank/${rankData[0].tier}.webp">
                                        <span>${rankData[0].tier} ${rankData[0].rank} ${rankData[0].leaguePoints}LP</span>
                                    </div>
                                </div>`;
                } else {
                    profile += `<div class="rank-wr">
                                    <div class="rank">
                                        <img src="img/rank/UNRANKED.webp">
                                        <span>pas classé</span>
                                    </div>
                                </div>`;


                }
                        

                profile += `</div>`;
                    
                
                

                titlepage = `${playernum.riotIdGameName}`;

            }
            
        });
    });
    const match5 = "<h1 title='Le nombre de requêtes vers l&apos;API Riot est limité.'>5 derniers matchs classé</h1>";

    document.title = titlepage;
    document.querySelector('.profile-header').innerHTML = profile;
    document.querySelector('.txtranked').innerHTML = match5;
    document.querySelector('.profile-matchs').innerHTML = html;
    document.querySelector('.loading-data').innerHTML = "";
}


async function executeAll() {
    const player = isOnPage();
    await getMatches(puuid[player], player);
    await getRank(puuid[player]);
    await getAllMatchsData(player);
    pushDataOnPage(matchesData, player);

    for (let i = 1; i <= 5; i++) {
        const btn = document.querySelector(`.btn-table-open-${i}`);
        const bloc = document.getElementById(`moredata${i}`);

        btn.addEventListener('click', () => {
            if (bloc.style.display === "none" || bloc.style.display === "") {
                bloc.style.display = "initial";
                btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
            } else {
                bloc.style.display = "none";
                btn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
            }
        });
    }




}

executeAll();

