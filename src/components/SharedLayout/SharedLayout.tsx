import { Title } from 'pages/ContentPage/Content.styled';
import Toolbar from 'components/Toolbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'reusableComponents/Container/Container.styled';

type Proops = {
  onMainBtnClick: Function;
  onGoBack: Function;
}

export const SharedLayout = ({ onMainBtnClick, onGoBack }: Proops) => {
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
