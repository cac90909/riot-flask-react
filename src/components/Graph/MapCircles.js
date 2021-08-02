import { GetChampImageLinkFromId } from "../Data/GetChampImageLinkFromId"
import { GetTeamFromId } from "../Data/GetTeamFromId"

function MapCircles({game_data, frame, frame_list, champ_data, graphDimensions, xScale, yScale}) {

    const text_padding = 2.5

    const img_dim = 20
    const img_border_padding = 2.5

    function RenderTowers(){

        return null

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
            {RenderTowers()}
        </g>
        )
    )

    return <>{circles}</>

}

export {MapCircles}