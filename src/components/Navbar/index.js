import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import images from '~/assets/imgs';
import { SearchBar } from '~/components';

function Navbar() {
    return (
        <Stack
            direction="row"
            alignItems="center"
            p={2}
            sx={{
                position: 'sticky',
                background: '#000',
                top: 0,
                justifyContent: 'space-between',
                zIndex: 100,
            }}
        >
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={images.logo} alt="logo" height={45} />
            </Link>
            <SearchBar />
        </Stack>
    );
}

export default Navbar;
