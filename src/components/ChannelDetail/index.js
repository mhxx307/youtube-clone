import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromApi } from '~/utils/fetchFromApi';
import { ChannelCard, Videos } from '~/components';

// chứa channel detail và videos của channel đó
function ChannelDetail() {
    const { id } = useParams();
    const [channelDetail, setChannelDetail] = useState(null);
    const [channelVideos, setChannelVideos] = useState([]);

    console.log('channel detail', channelDetail);
    console.log('channel videos', channelVideos);

    useEffect(() => {
        const params1 = {
            id: id,
            part: 'snippet',
            maxResults: '50',
        };
        fetchFromApi('/channels', params1)
            .then((data) => {
                setChannelDetail(data?.items[0]);
            })
            .catch((error) => {
                console.log(error);
            });

        const params2 = {
            channelId: id,
            part: 'snippet',
            maxResults: '50',
            order: 'date',
        };
        fetchFromApi('/search', params2)
            .then((data) => {
                setChannelVideos(data?.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <Box minHeight="95vh">
            <Box>
                <div
                    style={{
                        background:
                            'linear-gradient(90deg, rgba(0, 238, 247, 1) 0%, rgba(206, 3, 184, 1) 100%, rgba(0, 212, 255, 1) 100%)',
                        zIndex: 10,
                        height: '300px',
                    }}
                ></div>
                <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
            </Box>
            <Box display="flex" p="2">
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={channelVideos} />
            </Box>
        </Box>
    );
}

export default ChannelDetail;
