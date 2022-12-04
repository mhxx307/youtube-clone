import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import {
    ChannelDetail,
    Feed,
    Navbar,
    SearchFeed,
    VideoDetail,
    VideoNotFound,
} from '~/components';

function App() {
    return (
        <BrowserRouter>
            <Box sx={{ backgroundColor: '#000' }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Feed />} exact />
                    <Route path="/video/:id" element={<VideoDetail />} />
                    <Route path="/channel/:id" element={<ChannelDetail />} />
                    <Route
                        path="/search/:searchTerm"
                        element={<SearchFeed />}
                    />
                    <Route path="/videoNotFound" element={<VideoNotFound />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;
