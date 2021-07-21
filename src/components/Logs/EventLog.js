import * as d3 from 'd3'
import { GetGameDuration } from '../Data/GetGameDuration'
import { GetGameTime } from '../Data/GetGameTime'

function EventLog({game_data, frame, frame_list, dimensions}){

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
        var relev_event_types = ["ITEM_PURCHASED", "WARD_PLACED", "ITEM_DESTROYED", "CHAMPION_KILL", "ITEM_UNDO", "WARD_KILL", "ELITE_MONSTER_KILL", "BUILDING_KILL", "ITEM_SOLD"]
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

    function DisplayEvents(event_list){
        
        for (var event of event_list){
            var type = event.type
            var timestamp = event.timestamp
            var event_num = events_relev.indexOf(event)
            var game_time = GetGameTime(timestamp, game_dur, last_frame)
            events_displayed.push(<li key={event_num}>{event_num + " : " + type + " " + timestamp + " " + game_time}</li>)
        }

    return events_displayed
        
    }
    
    return (
        <div  className='EventLog' style = {{height: dimensions.outer_height, width: dimensions.outer_width, 
                        borderWidth:1, borderStyle:'solid', borderColor:'grey', fontSize:16, overflow:'auto',
                        marginRight: 83}} >
            <h3>Event Log</h3>
                <ul>
                    {DisplayEvents(events_occured_relev)}
                </ul>
        </div>

    )
}

export { EventLog }