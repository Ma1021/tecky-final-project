import Canvas from '@antv/f2-react';
import { Chart, Interval, Legend, Axis } from '@antv/f2';
import { useEffect, useState } from "react";

interface AgeChartProps {
    user_id: number
}

const AgeChart: React.FC<AgeChartProps> = (props:AgeChartProps) =>{
    const [data, setData] = useState([]);
    
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_PUBLIC_URL}/analytics/follower_age/${props.user_id}`)
        .then(response => response.json())
        .then(json => setData(json));
    },[])

    return (
        <Canvas>
            <Chart
                data={data.length > 0 && data}
                coord={{
                    transposed: true
                }}
                scale={{
                    age: {
                        tickCount:10
                    }
                }}
            >
                <Axis field="range" />
                <Axis field="amount" />
                <Interval 
                    x="range"
                    y="amount"
                    color="l(180) 0:#ffa930 1:#ff885b"
                />
            </Chart>
        </Canvas>
    )
}

export default AgeChart;