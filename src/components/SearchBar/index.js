import { IconButton, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';

function SearchBar() {
    const [keyword, setKeyword] = useState('');
    return (
        <Paper
            component="form"
            onSubmit={() => {}}
            sx={{
                borderRadius: 20,
                border: '1px solid #e3e3e3',
                pl: 2,
                boxShadow: 'none',
                mr: { sm: 5 },
            }}
        >
            <input
                className="search-bar"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: '10px', color: 'red' }}>
                <Search sx={{ width: 20, height: 20 }} />
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
