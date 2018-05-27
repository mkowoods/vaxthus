
import React from 'react'
import { BarChart, Grid } from 'react-native-svg-charts'

export default props => {
    return(
        <BarChart
            style={{ height: 200 }}
            data={ props.data }
            svg={{ fill : props.fill }}
            contentInset={{ top: 30, bottom: 30 }}
        >
        <Grid/>
        </BarChart>
    )
}

