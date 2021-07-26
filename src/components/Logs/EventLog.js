import * as d3 from 'd3'
import { GetGameDuration } from '../Data/GetGameDuration'
import { GetGameTime } from '../Data/GetGameTime'
import {GetSummonerNameFromId} from '../Data/GetSummonerNameFromId'
import { GetTeamFromId } from '../Data/GetTeamFromId'
import {SwapItemIdsForItemNames} from '../Data/SwapItemIdsForItemNames'

function EventLog({game_data, item_data, frame, frame_list, dimensions}){

    console.log("EventLog.js is rendering")
    
    const x_scale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([0, dimensions.outer_width])
    
    const y_scale = d3.scaleLinear()
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

        if (event.type == "ITEM_PURCHASED"){
            var sum_name = GetSummonerNameFromId({game_data}, event.participantId)
            var team_class_name = (GetTeamFromId(game_data, event.participantId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"
            return(<li className="EventLogListItem"><p>{event_num}</p> <p>: </p> <p className={team_class_name}>{sum_name}</p> 
            <p> has purchased </p> <p>{item_data[event.itemId].name}</p>  <p> at time</p><p> {game_time}</p> <p>. </p>   </li>)
        }
        if (event.type == "WARD_PLACED"){
            var sum_name = GetSummonerNameFromId({game_data}, event.creatorId)
            var team_class_name = (GetTeamFromId(game_data, event.participantId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"
            var ward_type = (event.wardType == 'YELLOW_TRINKET' || event.wardType == 'SIGHT_WARD') ? 'Non-Control Ward' : 'Control Ward' //change this later to be more specific and it it is a support placing the ward
            return(<li className="EventLogListItem"> <p>{event_num}</p> <p>: </p>  <p className={team_class_name}>{sum_name}</p>  <p> has placed a </p>
            <p>{ward_type}</p>  <p> at time </p>  <p>{game_time}</p> <p>.</p> </li>)                                       //we can reasonably assume its a ward from their support item
        }                                                                                                        //therefore we can label it as such. If non support is placing non-control ward, it is yellow trinket
        if (event.type == "CHAMPION_KILL"){

            var killer_name = GetSummonerNameFromId({game_data}, event.killerId) 
            var victim_name = GetSummonerNameFromId({game_data}, event.victimId)
            var killer_class_name = (GetTeamFromId(game_data, event.killerId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"
            var victim_class_name = (GetTeamFromId(game_data, event.victimId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"


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
                return (<li className="EventLogListItem"> <p>{event_num}</p> <p>: </p> <p className={killer_class_name}>{killer_name}</p> <p> has killed </p> 
                        <p className={victim_class_name}>{victim_name}</p> <p>, assisted by </p>   <p className={killer_class_name}>{[...assist_names].join("and ")}</p>
                        <p>, at time </p>   <p>{game_time}</p> <p>.</p> </li>)
            }
            else {
                return (<li className="EventLogListItem"> <p>{event_num}</p>  <p>: </p>  <p className={killer_class_name}>{killer_name}</p> <p> has killed </p>  
                        <p className={victim_class_name}>{victim_name}</p> <p> at time </p>   <p>{game_time}</p> <p>.</p> </li>)
            }
        }
        if (event.type == "ELITE_MONSTER_KILL"){
            var monster_name = null
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
            return (<li className="EventLogListItem"> <p>{event_num}</p>  <p>: </p>  <p className={killer_class_name}>{GetSummonerNameFromId({game_data}, event.killerId)}</p> 
                    <p> has slain the</p> <p>{monster_name}</p> <p> at time </p>  <p>{game_time}</p></li> )
            
        }
        if (event.type == "BUILDING_KILL"){
            var building_name = (event.buildingType == "TOWER_BUILDING") ? "Tower" : "Inhibitor"
            var building_lane = (event.laneType == "TOP_LANE") ? "Top Lane" : (event.laneType == "MID_LANE") ? "Mid Lane" : "Bottom Lane"
            var killer_name = GetSummonerNameFromId({game_data}, event.killerId) 
            var killer_class_name = (GetTeamFromId(game_data, event.killerId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"

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
                return (<li className="EventLogListItem"> <p>{event_num}</p> <p>: </p> <p className={killer_class_name}>{killer_name}</p> <p> has destroyed </p> 
                        <p>{building_lane} </p> <p>{building_name}</p> <p>, assisted by </p>   <p className={killer_class_name}>{[...assist_names].join("and ")}</p>
                        <p>, at time </p>   <p>{game_time}</p> <p>.</p> </li>)
            }
            else {
                return (<li className="EventLogListItem"> <p>{event_num}</p> <p>: </p> <p className={killer_class_name}>{killer_name}</p> <p> has destroyed </p> 
                <p>{building_lane} </p> <p>{building_name}</p> <p> at time </p>   <p>{game_time}</p> <p>.</p> </li>)
            }

            
            

            
        }
        if (event.type == "ITEM_SOLD"){
            var sum_name = GetSummonerNameFromId({game_data}, event.participantId)
            var team_class_name = (GetTeamFromId(game_data, event.participantId) == 100) ? "BlueTeamEventLogHighlightedWord" : "RedTeamEventLogHighlightedWord"
            return(<li className="EventLogListItem"><p>{event_num}</p> <p>: </p> <p className={team_class_name}>{sum_name}</p> 
            <p> has sold </p> <p>{item_data[event.itemId].name}</p>  <p> at time</p><p> {game_time}</p> <p>. </p>   </li>)
            
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
    
    return (
        <div  className='EventLog' style = {{height: dimensions.outer_height, width: dimensions.outer_width, 
                        borderWidth:1, borderStyle:'solid', borderColor:'grey', fontSize:16, overflow:'auto',
                        marginRight: 83}} >
            <h3>Event Log</h3>
                <ul className='EventLogList'>
                    {DisplayEvents(events_occured_relev)}
                </ul>
        </div>

    )
}

export { EventLog }