import React from 'react'
import { IgrFinancialChart, IgrFinancialChartModule } from "igniteui-react-charts";


IgrFinancialChartModule.register();

const CandleStickChart = ({data}) => {
  return (
    <div className='container'>
          <IgrFinancialChart
            width="100%"
            height="100%"
            isToolbarVisible={false}
            chartType="Candle"
            titleAlignment="Left"
            titleLeftMargin="25"
            titleTopMargin="10"
            titleBottomMargin="10"
            subtitleAlignment="Left"
            subtitleLeftMargin="25"
            subtitleTopMargin="5"
            subtitleBottomMargin="10"
            yAxisLabelLocation="OutsideLeft"
            yAxisMode="Numeric"
            yAxisTitleLeftMargin="10"
            yAxisTitleRightMargin="5"
            yAxisLabelLeftMargin="0"
            zoomSliderType="None"
            dataSource={data}
            
          />
    </div>
  )
}

export default CandleStickChart