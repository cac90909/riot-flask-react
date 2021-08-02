import {useState, useEffect} from 'react'

import * as d3 from 'd3'
import { GetGameDuration } from '../Data/GetGameDuration'
import { GetGameTime } from '../Data/GetGameTime'
import {GetSummonerNameFromId} from '../Data/GetSummonerNameFromId'
import { GetTeamFromId } from '../Data/GetTeamFromId'
import {SwapItemIdsForItemNames} from '../Data/SwapItemIdsForItemNames'

function EventLog({game_data, item_data, frame, frame_list, dimensions}){

    console.log("EventLog.js is rendering")
    
    const xScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([0, dimensions.outer_width])
    
    const yScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([dimensions.outer_height, 0])

    function HasHappend(event){
        if (event.timestamp < frame){
            return event
        }
    }

    function RelevantEventType(event){
        var all_event_types = ["ITEM_PURCHASED", "WARD_PLACED", "ITEM_DESTROYED", "CHAMPION_KILL", "ITEM_UNDO", "WARD_KILL", "ELITE_MONSTER_KILL", "BUILDING_KILL", "ITEM_SOLD", "SKILL_LEVEL_UP"]
        var relev_event_types = ["ITEM_PURCHASED", "WARD_PLACED", "CHAMPION_KILL", "ELITE_MONSTER_KILL", "BUILDING_KILL", "ITEM_SOLD"]
        if (relev_event_types.indexOf(event.type) != -1){
            return event
        }
    }

    var events_occured_relev = game_data.Events.filter(HasHappend).filter(RelevantEventType)
    var events_relev = game_data.Events.filter(RelevantEventType)

    var all_events = game_data.Events
    
    var last_frame = frame_list[frame_list.length-1]
    var game_dur = GetGameDuration({game_data})
    var events_displayed = []

    console.log("these are the relevant events:", events_relev )

    function DisplayEventTypeMessage(event, event_num){

        var timestamp = event.timestamp
        var game_time = GetGameTime(timestamp, game_dur, last_frame)

        //need to find a way to color code these. Ex: when summoner names that are members of blue team appear in the event log, i should make the font color blue. Things like that

        if (event.type == "ITEM_PURCHASED" && moneyEventsFilterBox ==  false ){
            var sum_name = GetSummonerNameFromId({game_data}, event.participantId)
            var team_class_name = (GetTeamFromId(game_data, event.participantId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"
            var gold_coin_image_link = "https://img.freepik.com/free-vector/pixel-art-gold-coin-game-bit-white-background_360488-147.jpg?size=338&ext=jpg"
            return(<li className="EventLogListItem"> <p><img src={gold_coin_image_link} className="EventLogIcon"></img></p> <p> {event_num}</p> <p>: </p> 
                    <p className={team_class_name}>{sum_name}</p> <p> has purchased </p> <p>{item_data[event.itemId].name}</p>  <p> at time</p> 
                    <p> {game_time}</p> <p>. </p>   </li>)
        }
        if (event.type == "WARD_PLACED" && wardEventsFilterBox == false){
            var sum_name = GetSummonerNameFromId({game_data}, event.creatorId)
            var team_class_name = (GetTeamFromId(game_data, event.creatorId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"
            var ward_type = (event.wardType == 'YELLOW_TRINKET' || event.wardType == 'SIGHT_WARD') ? 'Non-Control Ward' : 'Control Ward' //change this later to be more specific and it it is a support placing the ward
            var lantern_image_link = "data:image/jpeg;base64,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"
            return(<li className="EventLogListItem"> <p><img src={lantern_image_link} className="EventLogIcon"></img></p> <p> {event_num}</p> <p>: </p>  
                    <p className={team_class_name}>{sum_name}</p>  <p> has placed a </p> <p>{ward_type}</p>  <p> at time </p>  <p>{game_time}</p> 
                    <p>.</p> </li>)                                       //we can reasonably assume its a ward from their support item
        }                                                                                                        //therefore we can label it as such. If non support is placing non-control ward, it is yellow trinket
        if (event.type == "CHAMPION_KILL" && killEventsFilterBox == false){

            var killer_name = event.killerId == (0||null) ? "~The Elements~" : GetSummonerNameFromId({game_data}, event.killerId) 
            var victim_name = GetSummonerNameFromId({game_data}, event.victimId)
            var killer_class_name = (GetTeamFromId(game_data, event.killerId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"
            var victim_class_name = (GetTeamFromId(game_data, event.victimId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"

            var sword_image_link = "https://pngimage.net/wp-content/uploads/2018/06/pixel-sword-png-8.png"


            if (event.assistingParticipantIds.length > 0){
                var assist_names = []

                for (var assister of event.assistingParticipantIds){
                    if ( event.assistingParticipantIds.indexOf(assister) < (event.assistingParticipantIds.length - 1) ){
                        assist_names.push( GetSummonerNameFromId({game_data}, assister) +" ")
                    }
                    else{
                        assist_names.push ( GetSummonerNameFromId({game_data}, assister))
                    }
                }
                return (<li className="EventLogListItem"> <p><img src={sword_image_link} className="EventLogIcon"></img></p> <p> {event_num}</p> <p>: </p> 
                        <p className={killer_class_name}>{killer_name}</p> <p> has killed </p> <p className={victim_class_name}>{victim_name}</p> <p>, assisted by </p>   
                        <p className={killer_class_name}>{[...assist_names].join("and ")}</p> <p>, at time </p>   <p>{game_time}</p> <p>.</p> </li>)
            }
            else {
                return (<li className="EventLogListItem"> <p><img src={sword_image_link} className="EventLogIcon"></img></p><p> {event_num}</p>  <p>: </p>  
                        <p className={killer_class_name}>{killer_name}</p> <p> has killed </p>  <p className={victim_class_name}>{victim_name}</p> <p> at time </p>   
                        <p>{game_time}</p> <p>.</p> </li>)
            }
        }
        if (event.type == "ELITE_MONSTER_KILL" && monsterEventsFilterBox == false){
            var monster_name = null
            var monster_image_link = "https://images.vexels.com/media/users/3/204563/isolated/lists/b01d5d52ee8402f915235ffba7cb16a8-pixelated-dragon-colored.png"
            var killer_name = event.killerId == (0 || null) ? "~The Elements~" : GetSummonerNameFromId({game_data}, event.killerId) 
            if (event.monsterType == "RIFTHERALD"){monster_name = "Rift Herald"}
            else if (event.monsterType == "BARON_NASHER"){monster_name = "Baron Nashor"}
            else if (event.monsterType == "DRAGON"){
                if (event.monsterSubType == 'EARTH_DRAGON'){monster_name = "Mountain Drake"}
                else if (event.monsterSubType == 'AIR_DRAGON'){monster_name = "Cloud Drake"}
                else if (event.monsterSubType == 'FIRE_DRAGON'){monster_name = "Infernal Drake"}
                else if (event.monsterSubType == 'WATER_DRAGON'){monster_name = "Ocean Drake"}
                else if (event.monsterSubType == 'ELDER_DRAGON'){monster_name = "Elder Drake"}


            }
            var killer_class_name = (GetTeamFromId(game_data, event.killerId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"
            return (<li className="EventLogListItem"> <p><img src={monster_image_link} className="EventLogIcon"></img></p> <p> {event_num}</p>  <p>: </p>  
                    <p className={killer_class_name}>{killer_name}</p> <p> has slain the </p> <p>{monster_name}</p> 
                    <p> at time </p>  <p>{game_time}</p></li> )
            
        }
        if (event.type == "BUILDING_KILL" && buildingEventsFilterBox == false){
            var building_name = (event.buildingType == "TOWER_BUILDING") ? "Tower" : "Inhibitor"
            var building_lane = (event.laneType == "TOP_LANE") ? "Top Lane" : (event.laneType == "MID_LANE") ? "Mid Lane" : "Bottom Lane"
            var killer_name = event.killerId == 0 ? "The elements" : GetSummonerNameFromId({game_data}, event.killerId) 
            var killer_class_name = (GetTeamFromId(game_data, event.killerId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"

            var castle_image_link = "https://cdn.apps.joltteam.com/brikbuild/mushroom-kingdom-castle-mario-pixel-art-8bit-brik-bin-mario-mushroom-mushroom-kingdom-mushroom-kingdom-castle-mario-nintendo-pixel-pixel-art-smashbros-super-mario-super-mario-bros-super-smash-bros-wii-5a24f9b4f6c96a8d2972086e.brickImg.jpg"
            if (event.assistingParticipantIds.length > 0){
                var assist_names = []

                for (var assister of event.assistingParticipantIds){
                    if ( event.assistingParticipantIds.indexOf(assister) < (event.assistingParticipantIds.length - 1) ){
                        assist_names.push( GetSummonerNameFromId({game_data}, assister) +" ")
                    }
                    else{
                        assist_names.push ( GetSummonerNameFromId({game_data}, assister))
                    }
                }
                return (<li className="EventLogListItem">  <p><img src={castle_image_link} className="EventLogIcon"></img></p> <p> {event_num}</p> <p>: </p> 
                        <p className={killer_class_name}>{killer_name}</p> <p> has destroyed </p> <p>{building_lane} </p> <p>{building_name}</p> <p>, assisted by </p>   
                        <p className={killer_class_name}>{[...assist_names].join("and ")}</p> <p>, at time </p>   <p>{game_time}</p> <p>.</p> </li>)
            }
            else {
                return (<li className="EventLogListItem">  <p><img src={castle_image_link} className="EventLogIcon"></img></p> <p> {event_num}</p> <p>: </p> 
                <p className={killer_class_name}>{killer_name}</p> <p> has destroyed </p> <p>{building_lane} </p> <p>{building_name}</p> <p> at time </p>   <p>{game_time}</p> 
                <p>.</p> </li>)
            }

            
            

            
        }
        if (event.type == "ITEM_SOLD" && moneyEventsFilterBox ==  false){
            var sum_name = GetSummonerNameFromId({game_data}, event.participantId)
            var team_class_name = (GetTeamFromId(game_data, event.participantId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"
            var gold_coin_image_link = "https://img.freepik.com/free-vector/pixel-art-gold-coin-game-bit-white-background_360488-147.jpg?size=338&ext=jpg"
            return(<li className="EventLogListItem"> <p><img src={gold_coin_image_link} className="EventLogIcon"></img></p> <p> {event_num}</p> <p>: </p> 
                    <p className={team_class_name}>{sum_name}</p> <p> has sold </p> <p>{item_data[event.itemId].name}</p>  <p> at time</p><p> {game_time}</p> 
                    <p>. </p>   </li>)
            
        }
    }

    function DisplayEvents(event_list){
        
        for (var event of event_list){
            var event_num = events_relev.indexOf(event)
            //events_displayed.push(<li key={event_num}>{DisplayEventTypeMessage(event, event_num)}</li>)
            events_displayed.push(DisplayEventTypeMessage(event, event_num))
        }

    return events_displayed
        
    }

    function filterAccordingly(box_type){

        if (box_type == "Money"){
            setMoneyEventsFilterBox(!moneyEventsFilterBox)
        }
        if (box_type == "Building"){
            setBuildingEventsFilterBox(!buildingEventsFilterBox)
        }
        if (box_type == "Monster"){
            setMonsterEventsFilterBox(!monsterEventsFilterBox)
        }
        if (box_type == "Kill"){
            setKillEventsFilterBox(!killEventsFilterBox)
        }
        if (box_type == "Ward"){
            setWardEventsFilterBox(!wardEventsFilterBox)
        }

    }

    const [moneyEventsFilterBox, setMoneyEventsFilterBox] = useState(false)
    const [buildingEventsFilterBox, setBuildingEventsFilterBox] = useState(false)
    const [monsterEventsFilterBox, setMonsterEventsFilterBox] = useState(false)
    const [killEventsFilterBox, setKillEventsFilterBox] = useState(false)
    const [wardEventsFilterBox, setWardEventsFilterBox] = useState(false)

    function DisplayEventsFilter(){

        var lantern_image_link = "data:image/jpeg;base64,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"
        var sword_image_link = "https://pngimage.net/wp-content/uploads/2018/06/pixel-sword-png-8.png"
        var monster_image_link = "https://images.vexels.com/media/users/3/204563/isolated/lists/b01d5d52ee8402f915235ffba7cb16a8-pixelated-dragon-colored.png"
        var castle_image_link = "https://cdn.apps.joltteam.com/brikbuild/mushroom-kingdom-castle-mario-pixel-art-8bit-brik-bin-mario-mushroom-mushroom-kingdom-mushroom-kingdom-castle-mario-nintendo-pixel-pixel-art-smashbros-super-mario-super-mario-bros-super-smash-bros-wii-5a24f9b4f6c96a8d2972086e.brickImg.jpg"
        var gold_coin_image_link = "https://img.freepik.com/free-vector/pixel-art-gold-coin-game-bit-white-background_360488-147.jpg?size=338&ext=jpg"

        return(<ul className='EventLogFilterList'>
                    <li className="EventLogIconFilter">
                        <img src={gold_coin_image_link} className="EventLogFilterIcon"></img>
                        <input type="checkbox" onChange={ () => filterAccordingly("Money")}></input>
                    </li>
                    <li className="EventLogIconFilter">
                        <img src={castle_image_link} className="EventLogFilterIcon"></img>
                        <input type="checkbox" onChange={ () => filterAccordingly("Building")}></input>
                    </li>
                    <li className="EventLogIconFilter">
                        <img src={monster_image_link} className="EventLogFilterIcon"></img>
                        <input type="checkbox" onChange={ () => filterAccordingly("Monster")}></input>
                    </li>
                    <li className="EventLogIconFilter">
                        <img src={sword_image_link} className="EventLogFilterIcon"></img>
                        <input type="checkbox"  onChange={ () => filterAccordingly("Kill")}></input></li>
                    <li className="EventLogIconFilter">
                            <img src={lantern_image_link} className="EventLogFilterIcon"></img>
                            <input type="checkbox" onChange={ () => filterAccordingly("Ward")}></input></li>
                </ul>
            )

    }
    
    
    return (
        <div className="EventLogAndFilter">
            <div  className='EventLogItems' style = {{height: dimensions.outer_height, width: dimensions.outer_width*.8, 
                            borderWidth:1, borderStyle:'solid', borderColor:'grey', fontSize:16, overflow:'auto',}} >
                <h3>Event Log: Events</h3>
                    <ul className='EventLogList'>
                        {DisplayEvents(events_occured_relev)}
                    </ul>
            </div>
            <div className='EventLogFilterDiv' style = {{height: dimensions.outer_height, width: dimensions.outer_width*.2, 
                borderWidth:1, borderStyle:'solid', borderColor:'grey', fontSize:16, overflow:'auto',
                marginRight: 83}}>
                <h3>Event Log: Filter</h3>
                    {DisplayEventsFilter()}
            </div>
        </div>

    )
}

export { EventLog }