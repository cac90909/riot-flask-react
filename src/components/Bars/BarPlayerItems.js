import {GetPlayerItemsFromId} from "../Data/GetPlayerItemsFromId"
import { GetBlueTeamLaneRoles } from '../Data/GetBlueTeamLaneRoles'
import { GetBlueTeamIds } from '../Data/GetBlueTeamIds'
import { GetBlueTeamYValuesFromLaneRoles } from "../Data/GetBlueTeamYValuesFromLaneRoles" 

import { SwapItemIdsForItemImageLink} from "../Data/SwapItemIdsForItemImageLinks"
import { SwapItemIdsForItemNames} from "../Data/SwapItemIdsForItemNames"
import { GetSummonerNameFromId } from "../Data/GetSummonerNameFromId"

function BarPlayerItems({game_data, team_1_ids, team_1_lanes_roles, team_1_y_values, team_1_items, barDimensions, xScale, yScale}){

    console.log("HERRO")

    const dim = barDimensions.barPlayerInfoDimensions

    const x_paddings = [250, 300, 350, 250, 300, 350]
    const y_paddings = [-16, -16, -16, 30, 30, 30]
    const rect_w = 40
    const rect_h = 40
    var image_padding = 2

    function GetItemImageLinkFromId(item_id){

        let item_image_link = `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${item_id}.png`
        return item_image_link
    }

    function rect_custom(y, x_padding, y_padding){
        return (
            <rect
            x = {xScale(dim.x) + x_padding}
            y = {yScale(y) + y_padding}
            width={34}
            height={34}
            style = {{fill:"grey"}}
            />)
    }

    function create_item_image(item, y, x_padding, y_padding, key_index){
        console.log("These are the paramters being passed:", item, y, x_padding, y_padding, key_index)

        if (item != 0)
        {
            return (
                <image 
                    key = {"BlueTeamBarPlayerItemImage" + team_1_lanes_roles[key_index][0] + team_1_lanes_roles[key_index][1]}
                    href= {GetItemImageLinkFromId(item)}
                    x = {xScale(dim.x) + x_padding + image_padding}
                    y = {yScale(y) + y_padding + image_padding}
                    width={30}
                    height={30}>
                        {console.log("Image link:", GetItemImageLinkFromId(item) )}
                </image>)
        }
    }

    function FillEmptyItemSlots(team_1_items){

        var new_team_1_items = []
        for (var list_of_items of team_1_items){
            var num_of_items = list_of_items.length
            var copy_list_of_items = list_of_items
            if (num_of_items < 6){
                while (num_of_items < 6){
                    copy_list_of_items.push(0)
                    num_of_items+=1
                }
            }
            new_team_1_items.push(copy_list_of_items)
        }

        return new_team_1_items
    }

    var team_1_items_edit = FillEmptyItemSlots(team_1_items)

    console.log("DEBUG:", team_1_items_edit)
    console.log("IDS:", team_1_ids)
   

    const items = team_1_y_values.map( (d,i) => (
        <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
            { rect_custom(d, x_paddings[0], y_paddings[0] ) }
            { rect_custom(d, x_paddings[1], y_paddings[1] ) }
            { rect_custom(d, x_paddings[2], y_paddings[2] ) }
            { rect_custom(d, x_paddings[3], y_paddings[3] ) }
            { rect_custom(d, x_paddings[4], y_paddings[4] ) }
            { rect_custom(d, x_paddings[5], y_paddings[5] ) }
            { create_item_image(team_1_items_edit[i][0], d, x_paddings[0], y_paddings[0], i) }
            { create_item_image(team_1_items_edit[i][1], d, x_paddings[1], y_paddings[1], i) }
            { create_item_image(team_1_items_edit[i][2], d, x_paddings[2], y_paddings[2], i) }
            { create_item_image(team_1_items_edit[i][3], d, x_paddings[3], y_paddings[3], i) }
            { create_item_image(team_1_items_edit[i][4], d, x_paddings[4], y_paddings[4], i) }
            { create_item_image(team_1_items_edit[i][5], d, x_paddings[5], y_paddings[5], i) }
        </g> 
    )
    )


        return <>{items}</>

}

export {BarPlayerItems}