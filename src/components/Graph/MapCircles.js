import { GetChampImageLinkFromId } from "../Data/GetChampImageLinkFromId"
import { GetTeamFromId } from "../Data/GetTeamFromId"

function MapCircles({game_data, frame, frame_list, champ_data, graphDimensions, xScale, yScale}) {

    const text_padding = 2.5

    const img_dim = 20
    const img_border_padding = 2.5

    const buildings = [
         {x: 4318, y: 13875, name:"outer_top", team:"red", type:"turret"},
         {x: 8955, y: 8510, name:"outer_mid", team:"red", type:"turret"},
         {x: 13866, y: 4505, name:"outer_bot", team:"red", type:"turret"},
         {x: 7943, y: 13411, name:"inner_top", team:"red", type:"turret"},
         {x: 9767, y: 10113, name:"inner_mid", team:"red", type:"turret"},
         {x: 13327, y: 8226, name:"inner_bot", team:"red", type:"turret"},
         {x: 10481, y: 13650, name:"inhib_top", team:"red", type:"turret"},
         {x: 11134, y: 11207, name:"inhib_mid", team:"red", type:"turret"},
         {x: 13624, y: 10572, name:"inhib_bot", team:"red", type:"turret"},
         {x: 13052, y: 12612, name:"nexus_top", team:"red", type:"turret"},
         {x: 12611, y: 13084, name:"nexus_bot", team:"red", type:"turret"},
         {x: 11261, y: 13676, name:"top", team:"red", type:"inhib"},
         {x: 11598, y: 11667, name:"mid", team:"red", type:"inhib"},
         {x: 13604, y: 11316, name:"bot", team:"red", type:"inhib"},
         {x: 981, y: 10441, name:"outer_top", team:"blue", type:"turret"},
         {x: 5846, y: 6396, name:"outer_mid", team:"blue", type:"turret"},
         {x: 10504, y: 1029, name:"outer_bot", team:"blue", type:"turret"},
         {x: 1512, y: 6699, name:"inner_top", team:"blue", type:"turret"},
         {x: 5048, y: 4812, name:"inner_mid", team:"blue", type:"turret"},
         {x: 6919, y: 1483, name:"inner_bot", team:"blue", type:"turret"},
         {x: 1169, y: 4287, name:"inhib_top", team:"blue", type:"turret"},
         {x: 3651, y: 3696, name:"inhib_mid", team:"blue", type:"turret"},
         {x: 4281, y: 1253, name:"inhib_bot", team:"blue", type:"turret"},
         {x: 2177, y: 1807, name:"nexus_top", team:"blue", type:"turret"},
         {x: 3651, y: 3696, name:"nexus_bot", team:"blue", type:"turret"},
         {x: 1171, y: 3571, name:"top", team:"blue", type:"inhib"},
         {x: 3203, y: 3208, name:"mid", team:"blue", type:"inhib"},
         {x: 3452, y: 1236, name:"bot", team:"blue", type:"inhib"}
    ]

    function isBuilding(event){
        if (event.type == "BUILDING_KILL"){
            return event
        }
    }
    function hasHappend(event){
        if (event.timestamp < frame){
            return event
        }
    }
    function isBlueTeamsTurret(event){
        if (event.teamId == 100){
            return event
        }
    }
    function isRedTeamsTurret(event){
        if (event.teamId == 100){
            return event
        }
    }
    function isTurret(event){
        if (event.buildingType == "TOWER_BUILDING"){
            return event
        }
    }
    function isInhibitor(event){
        if (event.buildingType == "INHIBITOR_BUILDING"){
            return event
        }
    }
    function isDestroyed(building){
        
        var relev_building_events = game_data.Events.filter(isBuilding).filter(hasHappend)

        var not_appearing_on_list = false

        for (var ev of relev_building_events){
            if ( (ev.position.x <= building.x + 50 && ev.position.x >= building.x-50) && (ev.position.y <= building.y + 50 && ev.position.y >= building.y-50) ){
                not_appearing_on_list = true
            }
        }

        if (not_appearing_on_list == false){return building}
    }

    function RenderTowers(){

        var active_buildings = buildings.filter(isDestroyed)
        console.log(active_buildings)

        var relev_building_events = game_data.Events.filter(isBuilding).filter(hasHappend)
        console.log("te:", relev_building_events)

        var active_buildings_render_list = []
        var active_building_label_render_list = []

        for (var building of active_buildings){
            var building_html = <circle
                                        cx = {xScale(building.x)}
                                        cy = {yScale(building.y)}
                                        r = {10}
                                        style = {{fill:building.team}}
                                    />
            var building_label = (building.type == "turret") ? "T" : "I"
            var building_label_html = <text
                                            x = {xScale(building.x)}
                                            y = {yScale(building.y)}
                                            style = {{fill:"black"}}>
                                            {building_label}
                                    </text>

            active_buildings_render_list.push(building_html)
            active_building_label_render_list.push(building_label_html)
        }

        


        return [active_buildings_render_list, active_building_label_render_list]

    }

    function createTurretImage(){

    }

    const circles = game_data.Timestamps[frame].map((d,i) =>(
        <g transform={`translate(${graphDimensions.margins.left},${graphDimensions.margins.top})`} key={"MapCirclesAtFrame" + frame + "ForPlayerId" + d.participantId}>
            <rect
                key={"MapCircleBorder" + d.participantId}
                width={img_dim+img_border_padding}
                height={img_dim+img_border_padding}
                x={xScale(d.position.x)}
                y={yScale(d.position.y)}
                style={ GetTeamFromId(game_data,d.participantId) == 100 ? {fill: "Blue"} : {fill: "Red"}}
            />
            <image
                key={"MapCircleImage" + d.participantId}
                href={GetChampImageLinkFromId({game_data, champ_data}, d.participantId)}
                width={img_dim}
                height={img_dim}
                x={xScale(d.position.x) + (img_border_padding/2)}
                y={yScale(d.position.y) + (img_border_padding/2)}
                style={{borderWidth: '5px', borderColor:'red'}}
            />
            <text
                key={"MapCircleText" + d.participantId}
                x={xScale(d.position.x)}
                y={yScale(d.position.y)-text_padding}
                style = {{fill: "Black", textAlign: "left", fontSize: 12}}
            >
            {"Id:" + d.participantId}
            </text>
            {RenderTowers()[0]}
            {RenderTowers()[1]}
        </g>
        )
    )

    return <>{circles}</>

}

export {MapCircles}