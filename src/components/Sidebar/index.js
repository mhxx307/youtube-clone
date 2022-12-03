import { Stack } from '@mui/material';
import { categories } from '~/utils/constants';

function Sidebar({ selectedCategory, setSelectedCategory }) {
    return (
        <Stack
            direction="row"
            sx={{
                overflowY: 'auto',
                height: { sx: 'auto', md: '95%' },
                flexDirection: { md: 'column' },
            }}
        >
            {categories.map((category) => (
                <button
                    className="category-btn"
                    key={category.name}
                    style={{
                        backgroundColor:
                            category.name === selectedCategory && '#FC1503',
                        color: '#fff',
                        fontSize: '1.4rem',
                    }}
                    onClick={() => setSelectedCategory(category.name)}
                >
                    <span
                        style={{
                            marginRight: 15,
                            color:
                                category.name === selectedCategory
                                    ? 'white'
                                    : 'red',
                        }}
                    >
                        {category.icon}
                    </span>
                    <span
                        style={{
                            opacity:
                                category.name === selectedCategory
                                    ? '1'
                                    : '0.8',
                        }}
                    >
                        {category.name}
                    </span>
                </button>
            ))}
        </Stack>
    );
}

export default Sidebar;
