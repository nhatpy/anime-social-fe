import { icons } from '../icons';
import { Link } from 'react-router-dom';

export const itemsLogin = [
    {
      key: 'dashboard',
      label: (
        <Link to='/dashboard' className='flex flex-row items-center gap-2'>
          <span>{icons.user}</span> Trang cá nhân
        </Link>
      ),
    },
    {
      key: 'history',
      label: (
        <Link to='/history' className='flex flex-row items-center gap-2'>
          <span>{icons.book}</span> Truyện đang đọc
        </Link>
      ),
    },
    {
      key: 'logout',
      label: (
        <Link to='/#' className='flex flex-row items-center gap-2'>
          <span>{icons.logout}</span> Thoát
        </Link>
      ),
    }
  ];