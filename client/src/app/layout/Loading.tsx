import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Backdrop } from '@mui/material';

interface Props {
    message?: string;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number } & { deger: string }
) {
  return (
    <Backdrop open={true} invisible={true}>
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
            <CircularProgress size={100} variant="determinate" {...props} />
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                fontSize={16}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
        <Typography variant='h4' sx={{justifyContent: 'center', position: 'fixed', top: '60%'}}>
            {props.deger}
        </Typography>
    </Backdrop>
  );
}

export default function Loading({message = 'Loading...'}: Props) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} deger={message} />;
}
