// src/components/CustomAvatar.js
import Avatar from '@mui/material/Avatar';

const CustomAvatar = ({ skin, color, ...props }) => {
  let bgColor;

  switch (color) {
    case 'primary':
      bgColor = 'bg-blue-500';
      break;
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      break;
    case 'warning':
      bgColor = 'bg-yellow-500';
      break;
    case 'info':
      bgColor = 'bg-teal-500';
      break;
    case 'secondary':
      bgColor = 'bg-gray-500';
      break;
    default:
      bgColor = 'bg-gray-500';
      break;
  }

  return <Avatar {...props} className={skin === 'light' ? `${bgColor} text-white` : ''} />;
};

export default CustomAvatar;
