// components/SuspenseBoundary.js
import React, { Suspense } from 'react';

const SuspenseBoundary = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
};

export default SuspenseBoundary;
