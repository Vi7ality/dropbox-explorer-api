import { Container } from 'reusableComponents/Container/Container.styled';
import {
  Header,
  NavItem,
  NavList,
  Navigation,
  Stub,
  StubItem,
} from './Toolbar.styled';
import { Notify } from 'notiflix';
import { StyledButton } from 'reusableComponents/Button/Button.styled';
import { IoMdArrowBack, IoMdHome } from 'react-icons/io';
import { FaUser } from "react-icons/fa";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Proops = {
  isAuthorised: Boolean
}

export const Toolbar: React.FC<Proops> = ({ isAuthorised }) => {
   const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
    const navigate = useNavigate();
    const onGoBack = () => {
    navigate(backLinkHref);
  };

  const onMainBtnClick = () => {
    isAuthorised && navigate('');
  };
  const handleStubClick = () => {
    Notify.warning('Not implemented');
  };
  return (
    <Header>
      <Container>
        <Navigation>
          <NavList>
            <NavItem>
              <StyledButton
                onClick={() => {
                  onGoBack();
                }}
              >
                <IoMdArrowBack />
                Back
              </StyledButton>
            </NavItem>
            <NavItem>
              <StyledButton onClick={() => onMainBtnClick()}>
                <IoMdHome />
                Main
              </StyledButton>
            </NavItem>
          </NavList>
          <NavList>
            <StubItem>

              <Stub onClick={() => handleStubClick()}><FaUser/>User</Stub>
            </StubItem>
            <StubItem>
              <Stub onClick={() => handleStubClick()}>Options</Stub>
            </StubItem>
          </NavList>
        </Navigation>
      </Container>
    </Header>
  );
};
