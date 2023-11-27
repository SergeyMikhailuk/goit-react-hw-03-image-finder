import React from 'react';

const LoadMoreButton = ({ onClick, children }: LoadMoreButtonType) => {
  return (
    <button type="button" className={'Button'} onClick={onClick}>
      {children}
    </button>
  );
};
export default LoadMoreButton;

type LoadMoreButtonType = {
  onClick: () => void;
  children: React.ReactNode;
};
