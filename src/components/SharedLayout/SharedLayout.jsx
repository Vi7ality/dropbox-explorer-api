import Toolbar from 'components/Toolbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const SharedLayout = ({ onMainBtnClick, onGoBack }) => {
  return (
    <>
      <Toolbar onMainBtnClick={onMainBtnClick} onGoBack={onGoBack} />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
