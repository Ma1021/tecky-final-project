import styled from "styled-components";
import Canvas from '@antv/f2-react';
import { Chart, Interval, Legend, Axis, Line, Tooltip, Point } from '@antv/f2';
import { useEffect, useState } from "react";

interface GenderPieProps {
    user_id: number
}

const GenderPie: React.FC<GenderPieProps> = (props:GenderPieProps) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_PUBLIC_URL}/analytics/follower_gender/${props.user_id}`)
        .then(response => response.json())
        .then(json => setData(json));
    },[])

    return (
        <Canvas>
            <Chart
                data={data.length > 0 && data}
                coord={{
                transposed: true,
                type: 'polar',
                }}
            >
            <Interval 
                x="a"
                y="percent"
                adjust="stack"
                color={{
                    field: 'name',
                    range: ['#F04864', '#1890FF'],
                }}
            />
            <Legend position="right" />
            </Chart>
        </Canvas>
    )
}

export default GenderPie;