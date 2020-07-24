import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import './infoBox.css';

function InfoBox({title, cases, activeClass, active, total, ...props}) {
    return (
        <Card className={`infoBox ${active && activeClass} }`} onClick={props.onClick}>
        <CardContent>
            <Typography className="infoBox_title"  color="textSecondary">
                {title}
            </Typography>
            <h2 className={`infoBox_cases ${props.hightTextClass}`}>
                {cases}
            </h2>
            <Typography className="infoBox_total" color="textSecondary">
                {total} Total
            </Typography>
        </CardContent> 
        </Card>
    )
}

export default InfoBox
