import React from 'react';
import { Chart, LineAdvance, Point } from 'bizcharts';

const ChartWrapper = ({ data }) => (
  <Chart
    padding={[10, 20, 50, 40]}
    autoFit
    height={400}
    data={data}
    animate={false}
  >
		<LineAdvance
			shape="smooth"
			point
			area
			position="time*point"
		/>
    <Point position="time*point" size={4} />
	</Chart>
)

export default ChartWrapper
