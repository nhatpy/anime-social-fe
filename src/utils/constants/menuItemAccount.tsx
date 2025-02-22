import { Link } from 'react-router-dom';

import { icons } from '../icons';

export const items = [
    {
      key: 'login',
      label: (
        <Link to='/login' className='flex flex-row items-center gap-2'>
          <span>{icons.user}</span> Đăng nhập
        </Link>
      ),
    },
    {
      key: 'register',
      label: (
        <Link to='/register' className='flex flex-row items-center gap-2'>
          <span>{icons.create}</span> Đăng ký
        </Link>
      ),
    }
  ];