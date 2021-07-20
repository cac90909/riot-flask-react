function BarPlayerItems({game_data, team_ids, team_lanes, team_y_values, team_items, barDimensions, xScale, yScale, team}){

    const dim = barDimensions.barComponentDimensions

    const y_paddings = [-16, -16, -16, 30, 30, 30]
    const rect_w = 40
    const rect_h = 40
    var image_padding = 2
    const x_paddings = (team == "Blue") ? [250, 300, 350, 250, 300, 350] : [-250, -300, -350, -250, -300, -350] 
    const x = (team == "Blue") ? dim.blue_team_x : dim.red_team_x
    
    function GetItemImageLinkFromId(item_id){

        let item_image_link = `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${item_id}.png`
        return item_image_link
    }

    function rect_custom(y, x_padding, y_padding, key_index, rect_num){
        return (
            <rect
            key = {"BlueTeamBarPlayerItemBorder" + team_ids[key_index] + "rect" + rect_num }
            x = {xScale(x) + x_padding}
            y = {yScale(y) + y_padding}
            width={34}
            height={34}
            style = {{fill:"grey"}}
            />)
    }

    function create_item_image(item, y, x_padding, y_padding, key_index, item_num){

        if (item != 0)
        {
            return (
                <image 
                    key = {"BlueTeamBarPlayerItemImage" + team_lanes[key_index] + "ForInventoryItem" + item_num}
                    href= {GetItemImageLinkFromId(item)}
                    x = {xScale(x) + x_padding + image_padding}
                    y = {yScale(y) + y_padding + image_padding}
                    width={30}
                    height={30}>
                </image>)
        }
    }

    function FillEmptyItemSlots(team_items){

        var new_team_items = []
        for (var list_of_items of team_items){
            var num_of_items = list_of_items.length
            var copy_list_of_items = list_of_items
            if (num_of_items < 6){
                while (num_of_items < 6){
                    copy_list_of_items.push(0)
                    num_of_items+=1
                }
            }
            new_team_items.push(copy_list_of_items)
        }

        return new_team_items
    }

    var team_items_edit = FillEmptyItemSlots(team_items)
   

    const items = team_y_values.map( (d,i) => (
        <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
            { rect_custom(d, x_paddings[0], y_paddings[0], i, 0 ) }
            { rect_custom(d, x_paddings[1], y_paddings[1], i, 1 ) }
            { rect_custom(d, x_paddings[2], y_paddings[2], i, 2 ) }
            { rect_custom(d, x_paddings[3], y_paddings[3], i, 3 ) }
            { rect_custom(d, x_paddings[4], y_paddings[4], i, 4 ) }
            { rect_custom(d, x_paddings[5], y_paddings[5], i, 5 ) }
            { create_item_image(team_items_edit[i][0], d, x_paddings[0], y_paddings[0], i, 0) }
            { create_item_image(team_items_edit[i][1], d, x_paddings[1], y_paddings[1], i, 1) }
            { create_item_image(team_items_edit[i][2], d, x_paddings[2], y_paddings[2], i, 2) }
            { create_item_image(team_items_edit[i][3], d, x_paddings[3], y_paddings[3], i, 3) }
            { create_item_image(team_items_edit[i][4], d, x_paddings[4], y_paddings[4], i, 4) }
            { create_item_image(team_items_edit[i][5], d, x_paddings[5], y_paddings[5], i, 5) }
        </g> 
    )
    )


        return <>{items}</>

}

export {BarPlayerItems}