import { GetChampIdFromPlayerId } from "./GetChampIdFromPlayerId"
import {GetLaneRoleFromId} from "./GetLaneRoleFromId"
import { GetPlayerItemsFromId } from "./GetPlayerItemsFromId"
import { GetSummonerSpellsFromId } from "./GetSummonerSpellsFromId"
import { SwapChampIdForChampName } from "./SwapChampIdForChampName"
import { SwapItemIdsForItemNames } from "./SwapItemIdsForItemNames"
import { SwapSSIdForName } from "./SwapSSIdForName"

function GetTeamLaneAssignments({game_data, champ_data, item_data, ss_data, frame, frame_list}, team_1_ids){

    //I think that at some point, I want to call this method in Game.js or App.js and label the var as 'lane assignment' and just pass it down as props instead of individual components calling the method
    //might be helpful for efficiency purposes since this method has so many if statements. Just a thought...

    function GetPlayerPos({game_data}, frame, player_id){

        for (var player of game_data.Timestamps[frame]){
            if (player_id == player.participantId){
                return player.position
            }
        } 
    }

    function TestCustomizer(test_being_conducted, lane, role, y_value, ss, items){
        var truth_value = 0

        if (test_being_conducted == "TOP"){
            if (lane == "TOP"){truth_value+=1}
            if (role == "SOLO"){truth_value+=1}
            if (y_value < 15000 && y_value > 11000){truth_value+=1}
            if (ss.indexOf("Ignite") != -1  || ss.indexOf("Teleport") != -1){truth_value+=1}
            if (items.indexOf("Corrupting Potion") != -1 || items.indexOf("Doran's Blade") != -1 || 
                items.indexOf("Doran's Shield") != -1 || items.indexOf("Doran's Ring") != -1 || 
                items.indexOf("Dark Seal") != -1 || items.indexOf("Cloth Armor") != -1 || 
                items.indexOf("Cull") != -1 || items.indexOf("Tear of the Goddess") != -1 || 
                items.indexOf("Long Sword") != -1  ){truth_value+=1}
        }
        else if (test_being_conducted == "JUNGLE"){
            if (lane == "JUNGLE"){truth_value+=1}
            if (role == "NONE"){ truth_value+=1}
            if (y_value < 13000 && y_value > 3000){ truth_value+=1}
            if (ss.indexOf("Smite") != -1){ truth_value+=1}
            if (items.indexOf("Emberknife") != -1 || items.indexOf("Hailblade") != -1){ truth_value+=1}
        }
        else if (test_being_conducted == "MIDDLE"){
            if (lane == "MIDDLE"){truth_value+=1}
            if (role == "SOLO"){truth_value+=1}
            if (y_value < 9000 && y_value > 5000){truth_value+=1}
            if (ss.indexOf("Ignite") != -1  || ss.indexOf("Teleport") != -1 || 
                ss.indexOf("Exhaust") != -1 || ss.indexOf("Barrier") != -1){truth_value+=1}
            if (items.indexOf("Corrupting Potion") != -1 || items.indexOf("Doran's Blade") != -1 || 
                items.indexOf("Doran's Shield") != -1 || items.indexOf("Doran's Ring") != -1 || 
                items.indexOf("Dark Seal") != -1 || items.indexOf("Cloth Armor") != -1 || 
                items.indexOf("Cull") != -1 || items.indexOf("Tear of the Goddess") != -1 ||
                items.indexOf("Long Sword") != -1  ){truth_value+=1}
            
        }
        else if (test_being_conducted == "BOTTOM_ADC"){
            if (lane == "BOTTOM"){truth_value+=1}
            if (role == "DUO_CARRY"){truth_value+=1}
            if (y_value < 5000 && y_value > 1000){truth_value+=1}
            if (ss.indexOf("Heal") != -1  || ss.indexOf("Teleport") != -1 || 
                ss.indexOf("Cleanse") != -1 || ss.indexOf("Barrier") != -1 || 
                ss.indexOf("Exhaust") != -1){truth_value+=1}
            if (items.indexOf("Doran's Blade") != -1 || items.indexOf("Doran's Shield") != -1 || 
                items.indexOf("Doran's Ring") != -1 || items.indexOf("Dark Seal") != -1 || 
                items.indexOf("Cull") != -1 || items.indexOf("Tear of the Goddess") != -1 || 
                items.indexOf("Long Sword") != -1  ){truth_value+=1}
        }
        else if (test_being_conducted == "BOTTOM_SUPPORT"){
            if (lane == "BOTTOM"){truth_value+=1}
            if (role == "DUO_SUPPORT"){truth_value+=1}
            if (y_value < 5000 && y_value > 1000){truth_value+=1}
            if (ss.indexOf("Ignite") != -1  || ss.indexOf("Exhaust") != -1 ||
                ss.indexOf("Barrier") != -1){truth_value+=1}
            if (items.indexOf("Relic Shield") != -1 || items.indexOf("Spellthief's Edge") != -1 || 
                items.indexOf("Steel Shoulderguards") != -1 || items.indexOf("Spectral Sickle") != -1){truth_value+=1}
        }
        return truth_value
    }

    function TestWrapper({game_data}, id, frame){

        var {x, y} = GetPlayerPos({game_data}, frame, id)
        var [lane, role] = GetLaneRoleFromId({game_data}, id)
        var ss = GetSummonerSpellsFromId({game_data}, id)
        var ss_names = SwapSSIdForName({ss_data}, ss)
        var items = GetPlayerItemsFromId({game_data, item_data}, frame, id, frame_list)
        var items_names = SwapItemIdsForItemNames({item_data}, items)

        var top_test_truth_value = TestCustomizer("TOP", lane, role, y, ss_names, items_names)
        var jungle_test_truth_value = TestCustomizer("JUNGLE", lane, role, y, ss_names, items_names)
        var middle_test_truth_value = TestCustomizer("MIDDLE", lane, role, y, ss_names, items_names)
        var bottom_adc_test_truth_value = TestCustomizer("BOTTOM_ADC", lane, role, y, ss_names, items_names)
        var bottom_support_test_truth_value = TestCustomizer("BOTTOM_SUPPORT", lane, role, y, ss_names, items_names)

        return [top_test_truth_value, jungle_test_truth_value, middle_test_truth_value, bottom_adc_test_truth_value, bottom_support_test_truth_value ]

       
    }

    var frame_2 = frame_list[2]
    const team_1_lanes = []

    for (var id of team_1_ids){
        var player_champ_id = GetChampIdFromPlayerId({game_data}, id)
        var player_champ = SwapChampIdForChampName({champ_data}, player_champ_id)

        //console.log("Player:", player_champ)
        var player_truth_values = TestWrapper({game_data}, id, frame_2) 
        //console.log("Corresponding Truth Values:", player_truth_values)

        var max_value = Math.max(...player_truth_values)
        var max_value_index = player_truth_values.indexOf(max_value)
        var roles = ["TOP", "JUNGLE", "MIDDLE", "ADC", "SUPPORT"]
        var player_lane = roles[max_value_index]
        
        team_1_lanes.push(player_lane)


    }

    return team_1_lanes
}

export {GetTeamLaneAssignments}