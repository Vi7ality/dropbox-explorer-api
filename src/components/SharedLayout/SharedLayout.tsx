import { Title } from 'pages/ContentPage/Content.styled';
import Toolbar from 'components/Toolbar';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'reusableComponents/Container/Container.styled';

type Proops = {
isAuthorised: Boolean
}

export const SharedLayout:React.FC<Proops> = ({ isAuthorised }) => {
  return (
    <>
      <Toolbar isAuthorised={isAuthorised} />
            <Container>
        <Title>File Explorer</Title>
        
      </Container>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
