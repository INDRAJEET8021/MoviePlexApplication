import React from 'react';
import { Skeleton } from '@mui/material';

const LoadingPlaceholder = () => {
  return (
    <div className="space-y-4">
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
    </div>
  );
};

export default LoadingPlaceholder;
