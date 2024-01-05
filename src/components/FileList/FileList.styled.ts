import styled from 'styled-components';

export const FileListStyled = styled.ul`
  padding: 15px;
`;

export const FileItem = styled.li`
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
