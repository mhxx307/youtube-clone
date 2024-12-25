import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { Sidebar } from '~/components';
import { Videos } from '~/components';
import { fetchFromApi } from '~/utils/fetchFromApi';

function Feed() {
    const [selectedCategory, setSelectedCategory] = useState('Home');
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const fetchVideos = useCallback(
        (isLoadMore = false) => {
            if (isFetching) return;

            setIsFetching(true);

            const params = {
                q: selectedCategory,
                part: 'snippet',
                maxResults: '20', // Fetch smaller chunks
                pageToken: isLoadMore ? nextPageToken : null,
            };

            fetchFromApi('/search', params)
                .then((data) => {
                    setVideos((prevVideos) =>
                        isLoadMore
                            ? [...prevVideos, ...data.items]
                            : data.items,
                    );
                    setNextPageToken(data.nextPageToken || null);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setIsFetching(false);
                });
        },
        [selectedCategory, nextPageToken, isFetching],
    );

    useEffect(() => {
        fetchVideos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    const handleScroll = useCallback(() => {
        const scrollContainer = document.getElementById(
            'video-scroll-container',
        );
        if (
            scrollContainer.scrollHeight - scrollContainer.scrollTop <=
            scrollContainer.clientHeight + 50 // Add a buffer
        ) {
            fetchVideos(true); // Load more videos
        }
    }, [fetchVideos]);

    useEffect(() => {
        const scrollContainer = document.getElementById(
            'video-scroll-container',
        );
        if (!scrollContainer) return;

        scrollContainer.addEventListener('scroll', handleScroll);
        return () =>
            scrollContainer.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
            <Box
                sx={{
                    height: { sx: 'auto', md: '92vh' },
                    borderRight: '1px solid #3d3d3d',
                    px: { sx: 0, md: 2 },
                }}
            >
                <Sidebar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <Typography
                    className="copyright"
                    variant="body2"
                    sx={{ mt: 1.5, color: '#fff', fontSize: '1rem' }}
                >
                    Copyright 2022 by La Vo Minh Quan
                </Typography>
            </Box>

            <Box
                id="video-scroll-container" // Added ID for scroll container
                p={2}
                sx={{
                    overflowY: 'auto', // Enables vertical scrolling
                    height: '90vh', // Ensures the box height is limited to viewport height
                    flex: 2, // Allows the box to grow proportionally
                    '&::-webkit-scrollbar': {
                        width: '8px', // Customize scrollbar width
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Customize scrollbar thumb color
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Thumb color on hover
                    },
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    mb={2}
                    sx={{
                        color: 'var(--white-color)',
                        marginBottom: 0,
                        fontSize: '2.5rem',
                    }}
                >
                    {selectedCategory}
                    <span
                        style={{
                            color: 'var(--primary-color)',
                            marginLeft: 10,
                        }}
                    >
                        videos
                    </span>
                </Typography>

                <Videos videos={videos} />
                {isFetching && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'var(--gray-color)',
                            textAlign: 'center',
                            mt: 2,
                        }}
                    >
                        Loading more videos...
                    </Typography>
                )}
            </Box>
        </Stack>
    );
}

export default Feed;
