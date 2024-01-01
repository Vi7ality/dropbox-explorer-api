import Toolbar from 'components/Toolbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const SharedLayout = ({setCurrentPath, currentPath}) => {
  return (
    <>
      <Toolbar             setCurrentPath={setCurrentPath}
            currentPath={currentPath} />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
