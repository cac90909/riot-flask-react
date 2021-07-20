import { GetSummonerSpellsFromId } from "./GetSummonerSpellsFromId"
import { SwapSSIdForName } from "./SwapSSIdForName"

function GetSSImageLinkFromId({game_data, ss_data}, participant_id){

    function SwapSSIdForImageLinkEnd({ss_data}, ss){
        var ss_names = []
        for (var summoner_spell in ss_data){
            var ss_obj = ss_data[summoner_spell]
            var ss_key_num = parseInt(ss_obj.key)
            if (ss_key_num == ss[0] || ss_key_num == ss[1]){
                ss_names.push(ss_obj.image.full)
            }
        }
        return ss_names
    }

    var ss_ids = GetSummonerSpellsFromId({game_data}, participant_id)
    var ss_names = SwapSSIdForImageLinkEnd({ss_data}, ss_ids)


    var ss_image_links = []
    
    for (var ss_name of ss_names){
        var ss_link = `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/spell/${ss_name}`
        ss_image_links.push(ss_link)
    }

    return ss_image_links

}

export { GetSSImageLinkFromId }