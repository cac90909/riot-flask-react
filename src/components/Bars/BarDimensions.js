import {GraphDimensions} from "../Graph/GraphDimensions"

function BarDimensions(){

    const graphDimensions = GraphDimensions() //want to make this flexible and have the height rely on the height parameter from graphDimensions. Perhaps other dimensions too?

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    var screenPadding = 50

    const outerWidth = (screenWidth - graphDimensions.outerWidth - screenPadding)/2
    const outerHeight = graphDimensions.outerHeight

    const margins = graphDimensions.margins //these are inner margins, not outer margins

    const innerWidth = outerWidth - margins.left - margins.right
    const innerHeight = outerHeight - margins.top - margins.bottom

    const barDimensions = {
        outerWidth,
        outerHeight,
        margins,
        innerWidth,
        innerHeight
    }

    return barDimensions

}

export {BarDimensions}