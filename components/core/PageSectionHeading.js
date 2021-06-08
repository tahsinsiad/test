import styled from '@emotion/styled';
import Divider from './Divider';

export default function PageSectionHeading({ title, desc, margin = '0' }) {
  return (
    <>
      <Heading margin={margin}>{title}</Heading>
      <Description>{desc}</Description>
      <Divider />
    </>
  );
}

const Heading = styled.h2`
  font-size: 34px;
  font-weight: 700px;
  font-family: ${(props) => props.theme.font.primary};
  margin: ${(props) => props.margin};
  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
`;
const Description = styled.p`
  font-size: 16px;
  font-weight: 400px;
  font-family: ${(props) => props.theme.font.secondary};
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
