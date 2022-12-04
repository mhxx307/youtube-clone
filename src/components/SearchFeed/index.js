import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Videos } from '~/components';
import { fetchFromApi } from '~/utils/fetchFromApi';

// chứa  videos
function SearchFeed() {
    const [videos, setVideos] = useState([]);
    const { searchTerm } = useParams();

    useEffect(() => {
        const params = {
            q: searchTerm,
            part: 'snippet',
            maxResults: '50',
        };
        fetchFromApi('/search', params)
            .then((data) => {
                setVideos(data.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchTerm]);

    return (
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
                Search result for:
                <span
                    style={{
                        color: 'var(--primary-color)',
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                >
                    {searchTerm}
                </span>
                videos
            </Typography>

            <Videos videos={videos} />
        </Box>
    );
}

export default SearchFeed;
