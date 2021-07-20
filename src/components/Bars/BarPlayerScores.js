import { GetPlayerScoreFromId } from "../Data/GetPlayerScoreFromId";
 
function BarPlayerScores({game_data, team_ids, team_lanes, team_y_values, frame, barDimensions, xScale, yScale, team}){

    const dim = barDimensions.barComponentDimensions

    const y_padding = 30.65
    const x_padding = (team == "Blue") ? 190 : -190
    const x = (team == "Blue") ? dim.blue_team_x : dim.red_team_x

    function DisplayScore(score){
      const score_string = score[0] + "-" + score[1] + "-" + score[2]
      return score_string
    }

    const scores = team_y_values.map( (d,i) => (
        <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
            <text
                key={"ScoreForPId" + team_ids[i]}
                x={xScale(x)+x_padding}
                y={yScale(d) + y_padding}
                style = {{fill: "Black", textAlign: "left", fontSize: 12}} 
              >
              {DisplayScore(GetPlayerScoreFromId({game_data}, frame, team_ids[i]))}
            </text>
        </g>


    )
)


  return <>{scores}</>
}

export {BarPlayerScores}