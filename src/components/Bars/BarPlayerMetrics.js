function BarPlayerMetrics({barDimensions, xScale, yScale, frame_player_metrics}){

    console.log("BarPlayerMetrics player_info:",)

    const dim = barDimensions.barPlayerInfoDimensions
    const text_line_padding = 15 
    const text_block_padding = 30

    const metrics = frame_player_metrics.map( (d,i) => (
        <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
            <text
            key = {d.ParticipantId + "Level"}
            x= {xScale(dim.x)+100}
            y ={yScale(dim.y_array[i]  - text_block_padding)}
            style = {{fill: "Black", textAlign: "left", fontSize: 12}}>
            {"Level: " + d.Level}
            </text>
            <text
            key = {d.ParticipantId + "CurrentGold"}
            x= {xScale(dim.x)+100}
            y ={yScale(dim.y_array[i] - text_block_padding)+text_line_padding}
            style = {{fill: "Black", textAlign: "left", fontSize: 12}}>
            {"Current Gold: "+ d.CurrentGold}
            </text>
            <text
            key = {d.ParticipantId + "CS"}
            x= {xScale(dim.x)+100}
            y ={yScale(dim.y_array[i] - text_block_padding)+(text_line_padding*2)}
            style = {{fill: "Black", textAlign: "left", fontSize: 12}}>
            {"CS: " + d.CS}
            </text>
        </g>
    )


)
    return <>{metrics}</>
}

export {BarPlayerMetrics}