import styled from '@emotion/styled';

export default function Divider({ hideOnMobile, color = '#E0E0E0', margin = '30px 0' }) {
  return <Div hideOnMobile={hideOnMobile} color={color} margin={margin} />;
}

const Div = styled.hr`
  border: 1px solid ${(props) => props.color};
  margin: ${(props) => props.margin};
  @media only screen and (max-width: 768px) {
    display: ${(props) => (props.hideOnMobile ? 'none' : 'block')};
  }
`;
