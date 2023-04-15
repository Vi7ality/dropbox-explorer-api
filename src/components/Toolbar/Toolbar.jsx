import { Container } from 'reusableComponents/Container/Container.styled';
import { Header, NavItem, NavList, Navigation, Stub, StubItem } from './Toolbar.styled';
import { Notify } from 'notiflix';
import { StyledButton } from 'reusableComponents/Button/Button.styled';

export const Toolbar = ({ setCurrentPath, currentPath }) => {
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
                onClick={() =>
                  setCurrentPath(
                    currentPath.substring(0, currentPath.lastIndexOf('/'))
                  )
                }
              >
                Back
              </StyledButton>
            </NavItem>
            <NavItem>
              <StyledButton onClick={() => setCurrentPath('')}>Main</StyledButton>
            </NavItem>

          </NavList>
          <NavList>
                   <StubItem>
              <Stub onClick={() => handleStubClick()}>User</Stub>
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
