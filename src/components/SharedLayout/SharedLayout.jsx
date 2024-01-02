import Toolbar from 'components/Toolbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const SharedLayout = ({ onMainBtnClick, currentPath,
setCurrentPath}) => {
  return (
    <>
      <Toolbar onMainBtnClick={onMainBtnClick} 
        setCurrentPath={setCurrentPath}
            currentPath={currentPath} />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
