import { StyledButton } from 'reusableComponents/Button/Button.styled';
import { AuthMessage, AuthMsgWrap } from './AuthPage.styled';
import { makeAuth } from 'services/dropbox/dbxAuth';
import { Container } from 'reusableComponents/Container/Container.styled';
import React from 'react';

export const AuthPage: React.FC = () => {
  const handleAuthBtnClick = async () => {
    makeAuth();
  };
  return (
    <Container>
      <AuthMsgWrap>
        <AuthMessage>
          Please, provide access to your Dropbox account:
        </AuthMessage>
        <StyledButton
          onClick={() => {
            handleAuthBtnClick();
          }}
        >
          Authorize
        </StyledButton>
      </AuthMsgWrap>
    </Container>
  );
};
