import { Link } from 'react-router-dom';

import { icons } from '../icons';

export const menuItemNavbar = [
    {
        label: <Link to='/' className='flex flex-row items-center justify-center'><span className='pr-2'>{icons.home}</span> HOME</Link>,
        key: 'home',
    },
    {
        label: <Link to='/#' className='flex flex-row items-center uppercase'>hot</Link>,
        key: 'hot'
    },
    {
        label: <Link to='/follow' className='flex flex-row items-center uppercase'>theo dõi</Link>,
        key: 'follow'
    },
    {
        label: <Link to='/search' className='flex flex-row items-center uppercase'>tìm truyện</Link>,
        key: 'search'
    },
    {
        label: <Link to='/#' className='flex flex-row items-center uppercase'>manga</Link>,
        key: 'manga'
    },
    {
        label: <Link to='/#' className='flex flex-row items-center uppercase'>manhua</Link>,
        key: 'manhua'
    },
    {
        label: <Link to='/#' className='flex flex-row items-center uppercase'>manhwa</Link>,
        key: 'manhwa'
    },
    {
        label: <Link to='/search' className='flex flex-row items-center uppercase'>thể loại<span className='pl-2'>{icons.down}</span></Link>,
        key: 'category',
        children: [
            {
                label: <Link to='/#' className='flex flex-row items-center '>Manga</Link>,
                key: 'manga-category',
            },
            {
                label: <Link to='/#' className='flex flex-row items-center '>Manhua</Link>,
                key: 'manhua-category',
            },
            {
                label: <Link to='/#' className='flex flex-row items-center '>Manhwa</Link>,
                key: 'manhwa-category',
            },
        ],
    },
]