import { Title } from 'pages/ContentPage/Content.styled';
import Toolbar from 'components/Toolbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'reusableComponents/Container/Container.styled';

export const SharedLayout = ({ onMainBtnClick, onGoBack }) => {
  return (
    <>
      <Toolbar onMainBtnClick={onMainBtnClick} onGoBack={onGoBack} />
            <Container>
        <Title>File Explorer</Title>
        
      </Container>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
