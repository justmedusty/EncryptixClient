import React, {FC} from 'react'
import {Paper,Typography} from "@mui/material";

interface InfoBoxProps{
    title:string
    content: string
}
const InfoBox : FC<InfoBoxProps> = ({ title,content}) => {
    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', display : 'flex',alignItems:'center', flexDirection:'column' , marginBottom:'20px'}}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1">
                {content}
            </Typography>
        </Paper>
    );
};
export default InfoBox;