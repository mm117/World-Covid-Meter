import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import './infoBox.css';
import CountUp from 'react-countup';
import { prettyPrintStat } from "../util";

function InfoBox({title, cases, activeClass, active, total, ...props}) {
    return (
        <Card className={`infoBox ${active && activeClass} }`} onClick={props.onClick}>
        <CardContent>
            <Typography className="infoBox_title"  color="textSecondary">
                {title}
            </Typography>
            <h2 className={`infoBox_cases ${props.hightTextClass}`}>
             {cases >= 0 ? '+':''} <CountUp start={0} end={cases}
                                duration={3.5}
                               formattingFn={(value)=> prettyPrintStat(value)}
                            />
            </h2>
            <Typography className="infoBox_total" color="textSecondary">
            <CountUp start={0} end={total}
                                duration={3.5}
                                formattingFn={(value)=> prettyPrintStat(value)}/> Total
            </Typography>
            <Typography className="infoBox_total" color="textSecondary">
            <CountUp start={0} end={props.casesPerOneMillion}
                                duration={3.5}
                                formattingFn={(value)=> prettyPrintStat(value)}/> Per Million
            </Typography>
        </CardContent> 
        </Card>
    )
}

export default InfoBox
