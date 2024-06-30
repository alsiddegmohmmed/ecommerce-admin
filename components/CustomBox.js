import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const CustomBox = ({ header, title }) => {
    return (
        <Box sx={{ p: 2 }}>
            <Paper elevation={3}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                        {header}
                    </Typography>
                    <Typography variant="body1">
                        {title}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default CustomBox;
