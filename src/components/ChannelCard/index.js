import { CheckCircle } from '@mui/icons-material';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import images from '~/assets/imgs';

function ChannelCard({ channelDetail, marginTop }) {
    const channelTitle = channelDetail?.snippet?.title;
    const channelThumbnail = channelDetail?.snippet?.thumbnails?.high?.url;
    const subCount = channelDetail?.statistics?.subscriberCount;
    return (
        <Box
            sx={{
                boxShadow: 'none',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '356px', md: '320px' },
                height: '326px',
                margin: 'auto',
                marginTop,
            }}
        >
            <Link to={`/channel/${channelDetail?.id?.channelId}`}>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#fff',
                    }}
                >
                    <CardMedia
                        image={channelThumbnail || images.logo}
                        alt={channelTitle}
                        sx={{
                            borderRadius: '50%',
                            height: '180px',
                            width: '180px',
                            mb: 2,
                            border: '1px solid #e3e3e3',
                        }}
                    />
                    <Typography variant="h6">
                        {channelTitle}
                        <CheckCircle
                            sx={{ fontSize: 14, color: 'gray', ml: '5px' }}
                        />
                    </Typography>
                    {subCount && (
                        <Typography variant="subtitle2">
                            {parseInt(subCount).toLocaleString()} Subscribers
                        </Typography>
                    )}
                </CardContent>
            </Link>
        </Box>
    );
}

export default ChannelCard;
