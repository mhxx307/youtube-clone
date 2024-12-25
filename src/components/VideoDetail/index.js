import { CheckCircle } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { fetchFromApi } from '~/utils/fetchFromApi';
import { Videos } from '~/components';

function VideoDetail() {
    const { id } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    const [recommendedVideos, setRecommendedVideos] = useState([]);

    const { snippet, statistics } = videoDetail || {};
    const { title, channelId, channelTitle } = snippet || {};
    const { viewCount, likeCount } = statistics || {};

    useEffect(() => {
        const params = {
            part: 'snippet,statistics',
            id: id,
        };
        fetchFromApi('/videos', params)
            .then((data) => {
                setVideoDetail(data.items[0]);
            })
            .catch((err) => {
                console.log(err);
            });

        const params2 = {
            part: 'id,snippet',
            relatedToVideoId: id,
            type: 'video',
            maxResults: 50,
        };
        fetchFromApi('/search', params2)
            .then((data) => {
                setRecommendedVideos(data.items);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    if (!videoDetail?.snippet) return 'Loading...';

    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: 'column', md: 'row' }}>
                <Box flex={1}>
                    <Box
                        sx={{ width: '100%', position: 'sticky', top: '86px' }}
                    >
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            className="react-player"
                            controls
                        />
                        <Typography
                            color="#fff"
                            variant="h5"
                            fontWeight="bold"
                            p={2}
                        >
                            {title}
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ color: '#fff' }}
                            py={1}
                            px={2}
                        >
                            <Link to={`/channel/${channelId}`}>
                                <Typography
                                    variant={{ sm: 'subtitle1', md: 'h6' }}
                                    color="#fff"
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {channelTitle}
                                        <CheckCircle
                                            sx={{
                                                fontSize: '1.4rem',
                                                color: 'gray',
                                                ml: '5px',
                                            }}
                                        />
                                    </div>
                                </Typography>
                            </Link>
                            <Stack
                                direction="row"
                                gap="20px"
                                alignItems="center"
                            >
                                <Typography
                                    variant="body1"
                                    sx={{ opacity: 0.7 }}
                                    fontSize={{ sm: '1rem', md: '1.2rem' }}
                                >
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ opacity: 0.7 }}
                                    fontSize={{ sm: '1rem', md: '1.2rem' }}
                                >
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>

                {/* recommend videos */}
                <Box
                    px={2}
                    py={{ md: 1, xs: 5 }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Videos videos={recommendedVideos} direction="column" />
                </Box>
            </Stack>
        </Box>
    );
}

export default VideoDetail;
