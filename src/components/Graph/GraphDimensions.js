function GraphDimensions(){

    const outerWidth = 512
    const outerHeight = 512
    const margins = {top:0, right: 0, bottom: 0, left: 0}

    const innerWidth = outerWidth - margins.left - margins.right
    const innerHeight = outerHeight - margins.top - margins.bottom

    const graphDimensions = {
        outerWidth,
        outerHeight,
        margins,
        innerWidth,
        innerHeight
    }

    return graphDimensions

}

export {GraphDimensions}