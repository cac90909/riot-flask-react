import React from "react";

function AxisBottom({ xScale, height }) {
  const textPadding = 10;

  const axis = xScale.ticks(5).map((d, i) => (
    <g className="x-tick" key={i}>
      <line
        style={{ stroke: "#e4e5eb" }}
        y1={0}
        y2={height}
        x1={xScale(d)}
        x2={xScale(d)}
      />
      {/*<text
        style={{ textAnchor: "middle", fontSize: 12 }}
        dy=".71em"
        x={xScale(d)}
        y={height + textPadding}
      >
        {d}
      </text>*/}
    </g>
  ));
  return <>{axis}</>;
}

export {AxisBottom};
