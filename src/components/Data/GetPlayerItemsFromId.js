import {SwapItemIdsForItemNames} from "./SwapItemIdsForItemNames"
import {GetSummonerNameFromId} from "./GetSummonerNameFromId"
import {GetGameDuration} from "./GetGameDuration"
import {GetGameTime} from "./GetGameTime"
import { GetSpecialItemCases } from "./GetSpecialItemCases"

function GetPlayerItemsFromId({game_data, item_data}, frame_num, participant_id, frame_list){

    function SwapItemIdForItemName({item_data}, item_id){
        let item_name = item_data[item_id].name
        return item_name
    
    }

    function HasHappend(event){
        if (event.timestamp < frame_num) {return event}}

    function IsItemRelated(event){
        if(event.type == 'ITEM_PURCHASED' || event.type == 'ITEM_DESTROYED' || event.type =='ITEM_SOLD' || event.type=='ITEM_UNDO') {return event}}

    function PertainsToUser(event){
        if(event.participantId == participant_id) {return event}}

    function NotTrinket(event){  //for right now, I am classifying control wards as a trinket. At a later time, I will classify them as normal items
                                //except I will create a function to help track when they are placed to help determine the player's current items/control wards
        var blue_trinket_id = 3363
        var yellow_trinket_id = 3340
        var red_trinket_id = 3364
        var control_ward_id = 2055
        var constraints = [blue_trinket_id, yellow_trinket_id, red_trinket_id, control_ward_id]
        if(constraints.indexOf(event.itemId) == -1){return event}
    }

    var player_events = game_data.Events.filter(PertainsToUser).filter(NotTrinket).filter(IsItemRelated).filter(HasHappend)

    var active_items = []
    var transaction_sequence = []

    var [special_items, special_items_mapping] = GetSpecialItemCases()

    const game_dur = GetGameDuration({game_data})
    const last_frame = frame_list[frame_list.length - 1]
   
    for (var event of player_events){

        var current_time = GetGameTime(event.timestamp, game_dur, last_frame)

        
        if (event.type == 'ITEM_PURCHASED'){
            var item_name = SwapItemIdForItemName({item_data}, event.itemId)
            transaction_sequence.push(["Purchased", current_time, event.timestamp, item_name, event.itemId])
            active_items.push(event.itemId)
        }
        else if (event.type == 'ITEM_DESTROYED'){
            var item_name = SwapItemIdForItemName({item_data}, event.itemId)
            var item_index = active_items.indexOf(event.itemId)
            if (item_index != -1){
                var special_item_check = special_items.indexOf(event.itemId)
                var special_case = special_item_check == -1 ? false : true
                if (special_case == false){
                    active_items.splice(item_index,1)
                    transaction_sequence.push(["Destroyed", current_time, event.timestamp, item_name, event.itemId])
                }
                else if (special_case == true){
                    active_items.splice(item_index,1)
                    var special_item_replacement_id = special_items_mapping[event.itemId]
                    var special_item_replacement_name = SwapItemIdForItemName({item_data}, special_item_replacement_id)
                    transaction_sequence.push(["Destroyed - Special Case", current_time, event.timestamp, item_name, event.itemId])
                    active_items.push(special_item_replacement_id)
                    transaction_sequence.push(["Acquired - Special Case", current_time, event.timestamp, special_item_replacement_name, special_item_replacement_id])
                }
            }
        }
        else if (event.type == 'ITEM_SOLD'){
            var item_name = SwapItemIdForItemName({item_data}, event.itemId)
            var item_index = active_items.indexOf(event.itemId)
            if (item_index != -1){
                active_items.splice(item_index,1)
                transaction_sequence.push(["Sold", current_time, event.timestamp, item_name, event.itemId])
            }
        }
        else if (event.type == 'ITEM_UNDO'){
            var before_id = event.beforeId
            var after_id = event.afterId
            if (before_id == 0 && after_id !=0){ //undid a sell...aka still possess item...aka add the item to active_items
                var item_added = SwapItemIdForItemName({item_data}, after_id)
                transaction_sequence.push(["Undo-Added", current_time, event.timestamp, item_added, after_id])
                active_items.push(after_id)
            }
            if (before_id != 0 && after_id ==0){ //undid a buy...aka no longer possess item...aka remove the item from active_items
                var item_retracted = SwapItemIdForItemName({item_data}, before_id)
                var before_item_index = active_items.indexOf(item_retracted)
                if (before_item_index != -1){
                    active_items.splice(before_item_index,1)
                    transaction_sequence.push(["Undo-Remove", current_time, event.timestamp, item_retracted, before_id])
                }
                
            }
                
         }
        
        
    }

    return active_items

}



export {GetPlayerItemsFromId}