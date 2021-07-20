import React from "react"
import * as d3 from 'd3'

import {BarPlayerInfo} from "./BarPlayerInfo"
import {BarPlayerMetrics} from "./BarPlayerMetrics"
import {BarPlayerScores} from "./BarPlayerScores"
import {BarPlayerItems} from "./BarPlayerItems"
import { BarPlayerSS } from "./BarPlayerSS"

import {GetBlueTeamIds} from "../Data/GetBlueTeamIds"
import {GetTeamLaneAssignments} from "../Data/GetTeamLaneAssignments"
import {GetTeamYValuesFromLanes} from "../Data/GetTeamYValuesFromLanes"
import { GetPlayerItemsFromId } from "../Data/GetPlayerItemsFromId"




function LeftBar({game_data, champ_data, item_data, ss_data, frame, frame_list, barDimensions}){

    console.log("LeftBar.js is rendering")

    const xScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([0, barDimensions.outerWidth])
    
    const yScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([barDimensions.outerHeight, 0])

    const team_1_ids = GetBlueTeamIds({game_data})
    const team_1_lanes = GetTeamLaneAssignments({game_data, champ_data, item_data, ss_data, frame, frame_list}, team_1_ids)
    const team_1_y_values = GetTeamYValuesFromLanes({game_data, barDimensions}, team_1_lanes)
    const team_1_items = team_1_ids.map( (d,i) => GetPlayerItemsFromId({game_data, item_data}, frame, d, frame_list))
    

    return (
        <svg width = {barDimensions.outerWidth} height = {barDimensions.outerHeight} className="leftBar">
            <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`}>
                <BarPlayerInfo game_data={game_data} champ_data ={champ_data} team_ids = {team_1_ids} 
                team_lanes = {team_1_lanes} team_y_values = {team_1_y_values} 
                barDimensions={barDimensions} xScale={xScale} yScale={yScale} team={"Blue"} 
                className ="leftBarPlayerInfo"/>
                <BarPlayerMetrics game_data = {game_data} team_ids = {team_1_ids} 
                team_lanes = {team_1_lanes} team_y_values = {team_1_y_values} 
                frame={frame} barDimensions={barDimensions} xScale={xScale} yScale={yScale} 
                team={"Blue"} className ="leftBarPlayerMetrics"/>

                <BarPlayerSS game_data={game_data} champ_data ={champ_data} ss_data={ss_data} 
                team_ids = {team_1_ids} team_lanes = {team_1_lanes} team_y_values = {team_1_y_values} 
                barDimensions={barDimensions} xScale={xScale} yScale={yScale} team = {"Blue"}
                className ="leftBarPlayerSS"/>





                <BarPlayerScores game_data = {game_data} team_ids = {team_1_ids} 
                team_lanes = {team_1_lanes} team_y_values = {team_1_y_values} 
                frame={frame} barDimensions={barDimensions} xScale={xScale} yScale={yScale}
                team={"Blue"} className ="leftBarPlayerScores"/>
                <BarPlayerItems game_data = {game_data} team_ids = {team_1_ids} 
                team_lanes = {team_1_lanes} team_y_values = {team_1_y_values}
                team_items = {team_1_items} frame={frame} barDimensions={barDimensions} xScale={xScale} 
                yScale={yScale} team={"Blue"} className ="leftBarPlayerItems"/>
            </g>
        </svg>
    
    )
    
}

export {LeftBar}