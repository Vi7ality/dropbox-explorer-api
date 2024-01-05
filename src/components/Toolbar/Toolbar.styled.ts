import { StyledButton } from 'reusableComponents/Button/Button.styled';
import styled from 'styled-components';

export const Header = styled.header`
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: #34568b;
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const NavList = styled.ul`
  display: flex;
`;

export const NavItem = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;
export const StubItem = styled.li`
  &:not(:first-child) {
    margin-left: 10px;
  }
`;

export const Stub = styled(StyledButton)`
  background-color: #ff5733;
`;
