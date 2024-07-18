import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material";

const SideBarItemComponent = ({ name, username }) => {
  let path = '';

  switch(name) {
    case 'Home':
      path = '/';
      break;
    case 'Explore':
      path = '/explore';
      break;
    case 'Notifications':
      path = '/notifications';
      break;
    case 'Messages':
      path = '/messages';
      break;
    case 'Bookmarks':
      path = '/bookmarks';
      break;
    case 'Profile':
      path = `/profile/${username}`;
      break;
    default:
      path = '/';
  }

  return (
    <Box sx={{ margin: 1 }}>
      <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="h6">{name}</Typography>
      </Link>
    </Box>
  );
};

export default SideBarItemComponent;
