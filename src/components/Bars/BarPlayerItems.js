import {GetPlayerItemsFromId} from "../Data/GetPlayerItemsFromId"
import { GetBlueTeamLaneRoles } from '../Data/GetBlueTeamLaneRoles'
import { GetBlueTeamIds } from '../Data/GetBlueTeamIds'
import { GetBlueTeamYValuesFromLaneRoles } from "../Data/GetBlueTeamYValuesFromLaneRoles" 

import { SwapItemIdsForItemImageLink} from "../Data/SwapItemIdsForItemImageLinks"
import { SwapItemIdsForItemNames} from "../Data/SwapItemIdsForItemNames"
import { GetSummonerNameFromId } from "../Data/GetSummonerNameFromId"

function BarPlayerItems({game_data, champ_data, item_data, frame, frame_list, barDimensions, xScale, yScale}){

    const dim = barDimensions.barPlayerInfoDimensions
    const team_1_ids = GetBlueTeamIds({game_data})
    const team_1_lanes_roles = GetBlueTeamLaneRoles({game_data}, team_1_ids)
    const team_1_y_values = GetBlueTeamYValuesFromLaneRoles({game_data, barDimensions}, team_1_lanes_roles)

    //test below
    const example_player_id = 10
    const example_summoner_name = GetSummonerNameFromId({game_data}, example_player_id)
    const example_end_frame = frame_list[frame_list.length-1]
    var example_player_item_ids = GetPlayerItemsFromId({game_data, item_data}, example_end_frame, example_player_id, frame_list)
    //const example_player_item_names = SwapItemIdsForItemNames({item_data}, example_player_item_ids)
    //const example_player_item_image_links = SwapItemIdsForItemImageLink(example_player_item_ids)

    /*console.log("This is the player's ID:", example_player_id, "This is the player's Summoner Name:", example_summoner_name,
                "This is the player's end game item ID's:", example_player_item_ids, "This is the player's end game item Name's:", 
                example_player_item_names, "Finally, this is the player's end game item image links:", example_player_item_image_links)*/

   

    //test end

    const items = team_1_y_values.map( (d,i) => (
        <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
        </g> 
    )
    )


        return <>{items}</>

}

export {BarPlayerItems}