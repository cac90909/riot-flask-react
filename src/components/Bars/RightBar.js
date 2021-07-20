import React, {useEffect, useState} from "react"
import * as d3 from 'd3'

import { GetRedTeamIds} from "../Data/GetRedTeamIds"
import { GetTeamLaneAssignments} from "../Data/GetTeamLaneAssignments"
import { GetTeamYValuesFromLanes} from "../Data/GetTeamYValuesFromLanes"
import { GetPlayerItemsFromId} from "../Data/GetPlayerItemsFromId"

import {BarPlayerInfo} from "./BarPlayerInfo"
import {BarPlayerMetrics} from "./BarPlayerMetrics"
import {BarPlayerScores} from "./BarPlayerScores"
import {BarPlayerItems} from "./BarPlayerItems"
import { BarPlayerSS } from "./BarPlayerSS"


function RightBar({game_data, champ_data, item_data, ss_data, frame, frame_list, barDimensions}){


    console.log("LeftBar.js is rendering")

    const xScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([0, barDimensions.outerWidth])
    
    const yScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([barDimensions.outerHeight, 0])

    const team_2_ids = GetRedTeamIds({game_data})
    const team_2_lanes = GetTeamLaneAssignments({game_data, champ_data, item_data, ss_data, frame, frame_list}, team_2_ids)
    const team_2_y_values = GetTeamYValuesFromLanes({game_data, barDimensions}, team_2_lanes)
    const team_2_items = team_2_ids.map( (d,i) => GetPlayerItemsFromId({game_data, item_data}, frame, d, frame_list))



    return (
        <svg width = {barDimensions.outerWidth} height = {barDimensions.outerHeight} className="rightBar">
            <g transform={`translate(${barDimensions.margins.right},${barDimensions.margins.top})`}>
                <BarPlayerInfo game_data={game_data} champ_data ={champ_data} team_ids = {team_2_ids} 
                team_lanes = {team_2_lanes} team_y_values = {team_2_y_values} 
                barDimensions={barDimensions} xScale={xScale} yScale={yScale} team={"Red"} 
                className ="rightBarPlayerInfo"/>
                <BarPlayerMetrics game_data = {game_data} team_ids = {team_2_ids} 
                team_lanes = {team_2_lanes} team_y_values = {team_2_y_values} 
                frame={frame} barDimensions={barDimensions} xScale={xScale} yScale={yScale} 
                team={"Red"} className ="rightBarPlayerMetrics"/>
                <BarPlayerSS game_data={game_data} champ_data ={champ_data} ss_data={ss_data} 
                team_ids = {team_2_ids} team_lanes = {team_2_lanes} 
                team_y_values = {team_2_y_values} barDimensions={barDimensions} xScale={xScale} yScale={yScale} 
                team = {"Red"} className ="rightBarPlayerSS"/>
                <BarPlayerScores game_data = {game_data} team_ids = {team_2_ids} 
                team_lanes = {team_2_lanes} team_y_values = {team_2_y_values} 
                frame={frame} barDimensions={barDimensions} xScale={xScale} yScale={yScale}
                team={"Red"} className ="rightBarPlayerScores"/>
                <BarPlayerItems game_data = {game_data} team_ids = {team_2_ids} 
                team_lanes = {team_2_lanes} team_y_values = {team_2_y_values}
                team_items = {team_2_items} frame={frame} barDimensions={barDimensions} xScale={xScale} 
                yScale={yScale} team = {"Red"} className ="rightBarPlayerItems"/>
            </g>
        </svg>
    )
}

export {RightBar}