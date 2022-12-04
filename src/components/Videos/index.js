import { Box, Stack } from '@mui/material';
import { VideoCard, ChannelCard } from '~/components';

function Videos({ videos, direction }) {
    if (!videos?.length === 0) {
        return 'loading...';
    }
    return (
        <Stack
            direction={direction || 'row'}
            flexWrap="wrap"
            justifyContent="start"
            gap={2}
        >
            {videos.map((item, index) => {
                return (
                    <Box key={index}>
                        {item.id.videoId && <VideoCard video={item} />}
                        {item.id.channelId && (
                            <ChannelCard channelDetail={item} />
                        )}
                    </Box>
                );
            })}
        </Stack>
    );
}

export default Videos;
