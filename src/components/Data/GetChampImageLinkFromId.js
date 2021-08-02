import { GetChampIdFromPlayerId } from "./GetChampIdFromPlayerId"
import { SwapChampIdForChampName } from "./SwapChampIdForChampName"

function GetChampImageLinkFromId({game_data, champ_data}, participant_id){

    const player_champ_id = GetChampIdFromPlayerId({game_data}, participant_id)

    const champ_name = SwapChampIdForChampName({champ_data}, player_champ_id)

    var link = `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${champ_name}.png`

    return link

}

export {GetChampImageLinkFromId}