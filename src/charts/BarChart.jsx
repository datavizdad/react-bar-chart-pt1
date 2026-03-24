import { scaleBand, scaleLinear, max } from 'd3';

export default function BarChart({ data }) {
  // Chart dimensions

  const width = 700;
  const height = 400;
  const margin = { top: 20, right: 5, bottom: 40, left: 50 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;



  // D3 scales convert data values → pixel positions
  // scaleBand: evenly spaces categories along the x-axis
  const xScale = scaleBand()
    .domain(data.map(d => d.label))
    .range([0, chartWidth])
    .padding(0.15);

  // scaleLinear: maps numeric values to the y-axis
  // Note: SVG y=0 is the TOP, so range is [bottom, top]
  const yScale = scaleLinear()
    .domain([0, max(data, d => d.value)])
    .range([chartHeight, 0])

  const yTicks = yScale.ticks(5);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {yTicks.map(tick => (
          <line
            key={tick}
            x1={0} x2={chartWidth}
            y1={yScale(tick)} y2={yScale(tick)}
            stroke="#e5e7eb"
          />
        ))}

        {data.map(d => (
          <rect
            key={d.label}
            x={xScale(d.label)}
            y={yScale(d.value)}
            width={xScale.bandwidth()}
            height={chartHeight - yScale(d.value)}
            fill="#3b82f6"
          />
        ))}

        {data.map(d => (
          <text
            key={d.label}
            x={xScale(d.label) + xScale.bandwidth() / 2}
            y={yScale(d.value) - 5}
            textAnchor="middle"
            fontSize={12}
            fill="#3b82f6"
          >
            {d.value}
          </text>
        ))}

        <g transform={`translate(0,${chartHeight})`}>
          <line x1={0} x2={chartWidth} stroke="#9ca3af" />
          {data.map(d => (
            <g key={d.label} transform={`translate(${xScale(d.label) + xScale.bandwidth() / 2},0)`}>

              <text
                y={18}
                textAnchor="middle"
                fontSize={10}
                fill="#6b7280"
              >
                {d.label}
              </text>
            </g>
          ))}
        </g>
        <g>
          <line y1={0} y2={chartHeight} stroke="#9ca3af" />
          {yTicks.map(tick => (
            <g key={tick} transform={`translate(0,${yScale(tick)})`}>
              <line x2={-6} stroke="#9ca3af" />
              <text x={-10} textAnchor="end" alignmentBaseline="middle" fontSize={12} fill="#6b7280">
                {tick}
              </text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
