import styled from 'styled-components';

export const Title = styled.h2`
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const PathWrap = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`;

export const ContentList = styled.ul`
  padding: 15px;
`;

export const ContentItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
