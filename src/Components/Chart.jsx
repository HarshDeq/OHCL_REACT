import React from 'react';
import Chart from 'react-apexcharts';

const CustomChart = (props) => {
    const { data, options, width = '100', height = '100', type } = props;

    return (
        <Chart
            options={options}
            series={[{ data }]}
            type={type}
            width={width}
            height={height}
        />
    );
};

export default CustomChart;
