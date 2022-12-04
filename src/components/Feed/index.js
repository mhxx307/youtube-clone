import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Sidebar } from '~/components';
import { Videos } from '~/components';
import { fetchFromApi } from '~/utils/fetchFromApi';

// chứa sidebar và videos
function Feed() {
    const [selectedCategory, setSelectedCategory] = useState('New');
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchFromApi('/search', selectedCategory)
            .then((data) => {
                setVideos(data.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedCategory]);

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

            <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
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
            </Box>
        </Stack>
    );
}

export default Feed;
