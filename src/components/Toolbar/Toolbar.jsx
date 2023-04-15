import { Container } from 'reusableComponents/Container/Container.styled';
import { Header, NavList } from './Toolbar.styled';
import { Notify } from 'notiflix';

export const Toolbar = ({ setCurrentPath, currentPath }) => {
  const handleStubClick = () => {
    Notify.warning('Not implemented');
  };
  return (
    <Header>
      <Container>
        <nav>
          <NavList>
            <li>
              <button
                onClick={() =>
                  setCurrentPath(
                    currentPath.substring(0, currentPath.lastIndexOf('/'))
                  )
                }
              >
                Back
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPath('')}>Main</button>
            </li>
            <li>
              <button onClick={() => handleStubClick()}>User</button>
            </li>
            <li>
              <button onClick={() => handleStubClick()}>Options</button>
            </li>
          </NavList>
        </nav>
      </Container>
    </Header>
  );
};
