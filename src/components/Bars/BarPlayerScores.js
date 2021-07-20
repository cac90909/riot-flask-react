import { GetChampIdFromPlayerId } from "../Data/GetChampIdFromPlayerId";
import { GetPlayerScoreFromId } from "../Data/GetPlayerScoreFromId";
import { GetSummonerNameFromId } from "../Data/GetSummonerNameFromId";
import { SwapChampIdForChampName } from "../Data/SwapChampIdForChampName";

import { GetBlueTeamLaneRoles } from '../Data/GetBlueTeamLaneRoles'
import { GetBlueTeamIds } from '../Data/GetBlueTeamIds'
import { GetBlueTeamYValuesFromLaneRoles } from "../Data/GetBlueTeamYValuesFromLaneRoles" 

function BarPlayerScores({game_data, team_1_ids, team_1_lanes_roles, team_1_y_values, frame, barDimensions, xScale, yScale}){

    const dim = barDimensions.barPlayerInfoDimensions

    const x_padding = 190
    const y_padding = 30.65

    function DisplayScore(score){
      const score_string = score[0] + "-" + score[1] + "-" + score[2]
      return score_string
    }

    const scores = team_1_y_values.map( (d,i) => (
        <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
            <text
                key={"ScoreForPId" + team_1_ids[i]}
                x={xScale(dim.x)+x_padding}
                y={yScale(d) + y_padding}
                style = {{fill: "Black", textAlign: "left", fontSize: 12}} 
              >
              {DisplayScore(GetPlayerScoreFromId({game_data}, frame, team_1_ids[i]))}
            </text>
        </g>


    )
)


  return <>{scores}</>
}

export {BarPlayerScores}