import * as d3 from 'd3'

function AnalysisLog({game_data, frame, frame_list, dimensions}){

    console.log("AnalysisLog.js is rendering")

    const x_scale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([0, dimensions.outer_width])
    
    const y_scale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([dimensions.outer_height, 0])


        return (
            <div  className='AnalysisLog' style = {{height: dimensions.outer_height, width: dimensions.outer_width, 
                            borderWidth:1, borderStyle:'solid', borderColor:'grey', fontSize:16, overflow:'auto',
                            marginLeft: 83, direction:'rtl' }} >
                <h3>Analysis Log</h3>
                    <ul className='AnalysisLogList'>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                    </ul>
            </div>
    
        )
}

export { AnalysisLog }