function MapCircles({pos_data, xScale, yScale}) {

    const circles = pos_data.map((d,i) =>(
        <circle
            key = {i}
            r = {10}
            cx = {xScale(d.x)}
            cy = {yScale(d.y)}
            style = { i>4 ? {fill:"red"} : {fill:"blue"}}
        >
        </circle>
        )
    )

    return <>{circles}</>

}

export {MapCircles}