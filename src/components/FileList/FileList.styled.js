import styled from 'styled-components';

export const FileListStyled = styled.ul`
  padding: 15px;
`;

export const FileItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
