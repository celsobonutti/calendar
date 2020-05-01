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

interface GridInterface {
  numberOfRows: number
};

export const CalendarGrid = styled.div.attrs(props => ({
  role: props.role ?? 'grid'
}))<GridInterface>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;