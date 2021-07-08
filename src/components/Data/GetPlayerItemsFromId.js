import {SwapItemIdsForItemNames} from "./SwapItemIdsForItemNames"

function GetPlayerItemsFromId({game_data}, frame_num, participant_id){

    function HasHappend(event){
        if (event.timestamp < frame_num){
            return event
        }
    }

    function IsItemRelated(event){
        if(event.type == 'ITEM_PURCHASED' || event.type == 'ITEM_DESTROYED'){
            return event
        }
    }

    function PertainsToUser(event){
        if(event.participantId == participant_id){
            return event
        }
    }

    const filtered_events = game_data.Events.filter(HasHappend).filter(IsItemRelated).filter(PertainsToUser)

    var current_items = []
    var added_items = []
    var deleted_items = []

    for (var event of filtered_events){
        if(event.type == "ITEM_PURCHASED"){
            current_items.push(event.itemId)
            added_items.push(event.itemId)
        }
        if(event.type == "ITEM_DESTROYED"){
            var item_index = current_items.indexOf(event.itemId)
            current_items.splice(item_index, 1)
            deleted_items.push(event.itemId)
        }
    }

    return [current_items, added_items, deleted_items]

}

export {GetPlayerItemsFromId}