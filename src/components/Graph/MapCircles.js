import { GetChampIdFromPlayerId } from "../Data/GetChampIdFromPlayerId"
import { GetChampImageLinkFromId } from "../Data/GetChampImageLinkFromId"
import { GetTeamFromId } from "../Data/GetTeamFromId"

function MapCircles({graphDimensions, game_data, frame, frame_list, champ_data, xScale, yScale}) {

    const text_padding = 2.5

    const circles = game_data.Timestamps[frame].map((d,i) =>(
        <g transform={`translate(${graphDimensions.margins.left},${graphDimensions.margins.top})`}>
            <circle
                r={10}
                cx={xScale(d.position.x)}
                cy={yScale(d.position.y)}
                style={ GetTeamFromId(game_data,d.participantId) == 100 ? {fill: "Blue"} : {fill: "Red"}}>
            </circle>

            <image
                href={GetChampImageLinkFromId({game_data, champ_data}, d.participantId)}
                width={20}
                height={20}
                x={xScale(d.position.x)}
                y={yScale(d.position.y)}
                style={{overflow: 'hidden'}}
            >

            </image>
        </g>
        )
    )

    return <>{circles}</>

}

export {MapCircles}