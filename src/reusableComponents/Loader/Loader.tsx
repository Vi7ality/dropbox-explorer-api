import React from 'react';

const { RotatingLines } = require('react-loader-spinner');

export const Loader = () => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  );
};
