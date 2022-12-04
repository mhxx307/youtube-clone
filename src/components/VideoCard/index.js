import { CheckCircle } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function VideoCard({
    video: {
        id: { videoId },
        snippet,
    },
}) {
    console.log(videoId, snippet);
    return (
        <Card
            sx={{
                width: { md: '320px', xs: '100%' },
                boxShadow: 'none',
                borderRadius: 0,
            }}
        >
            <Link to={videoId ? `/video/${videoId}` : '/videoNotFound'}>
                <CardMedia
                    image={snippet?.thumbnails?.high?.url}
                    alt={snippet?.title}
                    sx={{ width: 358, height: 180 }}
                />
            </Link>
            <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
                <Link to={videoId ? `/video/${videoId}` : '/videoNotFound'}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="#fff"
                        fontSize="1.4rem"
                    >
                        {snippet?.title.slice(0, 70) ||
                            'video do not have title'}
                    </Typography>
                </Link>
                <Link
                    to={
                        snippet?.channelId
                            ? `/channel/${snippet?.channelId}`
                            : '/videoNotFound'
                    }
                >
                    <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color="gray"
                        fontSize="1.4rem"
                    >
                        {snippet?.channelTitle ||
                            'video do not have channel title'}
                        <CheckCircle
                            sx={{ fontSize: 12, color: 'gray', ml: '5px' }}
                        />
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
}

export default VideoCard;
