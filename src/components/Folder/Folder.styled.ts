import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledFolderLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  &:hover,
  &:focus {
    color: orange;
  }
`;
