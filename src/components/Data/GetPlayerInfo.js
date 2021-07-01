import {SwapChampIdForChampName} from "./SwapChampIdForChampName"

function GetPlayerInfo({game_data, champ_data}){
    
    var players_array_path = game_data.Summary.Player
    var info = []

    for (let part = 0; part < 10; part++){

        var part_id = players_array_path.participantIdentities[part].participantId
        var summ_name= players_array_path.participantIdentities[part].player.summonerName

        var champ_id = players_array_path.participants[part].championId
        var champ_name = SwapChampIdForChampName({champ_id, champ_data})
        
        var spell_1_id = players_array_path.participants[part].spell1Id
        var spell_2_id = players_array_path.participants[part].spell2Id
        var role = players_array_path.participants[part].timeline.lane
        var link = `C:/Users/Chris/Desktop/Coding_and_data/Projects/Independent_Projects/Riot/src/assets/${champ_name}.png`

        let temp = {ParticipantId: part_id,
                    SummonerName: summ_name,
                    ChampionName: champ_name,
                    Spell1: spell_1_id,
                    Spell2: spell_2_id,
                    Lane: role,
                    ImageLink: link}

        info.push(temp)

    }


    console.log("Completed playes info object:", info)


    return info

}

export {GetPlayerInfo}