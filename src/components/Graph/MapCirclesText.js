function MapCirclesText({pos_data, xScale, yScale}){
    
    const circles_text = pos_data.map((d,i) => (
        <text
        key = {i}
        x= {xScale(d.x)}
        y ={yScale(d.y)}
        dy=".3em"
        style = {{fill: "White", textAnchor: "middle", fontSize: 12}}>
        {i}
        </text>
    ))

    return <>{circles_text}</>

}

export {MapCirclesText}