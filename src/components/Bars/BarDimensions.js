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
    
    const barPlayerInfoDimensions = {
        y_array : [950,750,550,350,150],
        image_padding : 2.5,
        x : 500, // 7-8-2021 note: at some point, going to need to make coordinates more dependent on each other 
                 //(for window size scalability purposes). For now, going to just find values that work for now.
        image_w: 50,
        image_h : 50,
        border_w : 55,
        border_h : 55
    }

    const barDimensions = {
        outerWidth,
        outerHeight,
        margins,
        innerWidth,
        innerHeight,
        barPlayerInfoDimensions
    }


    return barDimensions

}

export {BarDimensions}