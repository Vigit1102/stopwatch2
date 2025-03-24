import { Button, Card, Typography } from '@mui/material';
import { useEffect } from 'react';
import { addLap, reset, start, stop, tick } from '../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';

export const Stopwatch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { time, running, laps } = useSelector((state:RootState) => state.stopwatch);
    const getMinutes = (ms: number) => ('0' + Math.floor((ms / 60 / 1000) % 60)).slice(-2);
    const getSeconds = (ms: number) => ('0' + Math.floor((ms / 1000) % 60)).slice(-2);
    const getMilliSeconds = (ms: number) => ('0' + (ms / 10) % 100).slice(-2);
    const formatTime = (ms: number) => `${getMinutes(ms)}:${getSeconds(ms)}:${getMilliSeconds(ms)}`;
    useEffect(() => {
        let interval: any;
        if (running) {
            interval = setInterval(() => {
                dispatch(tick());
            }, 10);}
             else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, dispatch]);

    return (
        <>
            <br/><br/><br/>
            <Card
                sx={{
                    padding: 2,
                    textAlign: 'center',
                    width: '450px',
                    marginLeft: 40,
                    backgroundColor: 'rgb(134, 137, 146)',
                }}>
                <Typography variant="h5" gutterBottom>
                    Stopwatch
                </Typography>
                <hr />
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    {formatTime(time)}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
                    {running ? (
                        <Button variant="contained" color="error" size="small" onClick={() => dispatch(stop())}>
                            Stop
                        </Button>
                    ) : (
                        <Button variant="contained" color="error" size="small" onClick={() => dispatch(start())}>
                            Start
                        </Button>
                    )}
                    <Button variant="contained" color="error" size="small" onClick={() => dispatch(reset())}>
                        Reset
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={() => dispatch(addLap())}>
                        Lap
                    </Button>
                </div>
                <div style={{ marginTop: '16px', maxHeight: '200px', overflowY: 'auto' }}>
                    {laps.map((lapTime: any, i: number) => (
                        <Typography key={i} variant="body2">
                            Lap {i + 1}: {formatTime(lapTime)}
                        </Typography>
                    ))}
                </div>
            </Card>
        </>
    );
};
