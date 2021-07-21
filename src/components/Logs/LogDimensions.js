import {GraphDimensions} from "../Graph/GraphDimensions"
import {BarDimensions} from "../Bars/BarDimensions"

function LogDimensions(){

    const bar_dim = BarDimensions()
    const graph_dim = GraphDimensions()

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    var outer_width = bar_dim.outerWidth
    var outer_height = bar_dim.outerHeight - 40
    var margins = bar_dim.margins
    var inner_width = bar_dim.innerWidth
    var inner_height = bar_dim.innerHeight

    const log_dimensions = {
        outer_width,
        outer_height,
        margins,
        inner_width,
        inner_height,

    }

    return log_dimensions
}

export { LogDimensions}