import styled from 'styled-components';

export const Element = styled.div.attrs(props => ({
  role: props.role ?? 'cell'
}))`
  display: flex;
  justify-content: center;

  flex: 1;
`;

export const Row = styled.div.attrs((props) => ({
  role: props.role ?? 'row',
}))`
  display: flex;

  width: 100%;
`;

export const Group = styled.div.attrs(props => ({
  role: props.role ?? 'rowgroup'
}))`
  width: 100%;
`;