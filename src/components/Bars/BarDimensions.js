import {GraphDimensions} from "../Graph/GraphDimensions"

function BarDimensions(){

    const graphDimensions = GraphDimensions() //want to make this flexible and have the height rely on the height parameter from graphDimensions. Perhaps other dimensions too?

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    var screenPadding = 50

    const outerWidth = (screenWidth - graphDimensions.outerWidth - screenPadding)/1.895
    const outerHeight = graphDimensions.outerHeight

    const margins = graphDimensions.margins //these are inner margins, not outer margins

    const innerWidth = outerWidth - margins.left - margins.right
    const innerHeight = outerHeight - margins.top - margins.bottom
    
    const barComponentDimensions = {
        y_array : [950,750,550,350,150],
        blue_team_x : 525, // 7-8-2021 note: at some point, going to need to make coordinates more dependent on each other 
                 //(for window size scalability purposes). For now, going to just find values that work for now.
        red_team_x : 425
    }

    const barDimensions = {
        outerWidth,
        outerHeight,
        margins,
        innerWidth,
        innerHeight,
        barComponentDimensions
    }


    return barDimensions

}

export {BarDimensions}