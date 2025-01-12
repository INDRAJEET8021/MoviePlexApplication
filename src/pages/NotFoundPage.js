import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <Typography variant="h3" className="font-bold text-red-500">
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" className="mt-4 text-gray-600">
          The page you are looking for does not exist.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          className="mt-6"
          component={Link}
          to="/"
        >
          Go back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
