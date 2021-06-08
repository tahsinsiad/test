import styled from '@emotion/styled';
import Container from '../core/Container';

export default function SiteDesc() {
  return (
    <Container textcenter>
      <DescText>Research and advocacy of progressive and pragmatic policy ideas.</DescText>
    </Container>
  );
}

const DescText = styled.p`
  font-family: ${(props) => props.theme.font.primary};
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2em;
  text-align: center;
  @media only screen and (max-width: 768px) {
    display: inline;
    font-size: 18px;

    &:last-child:before {
      content: ' ';
    }
  }
`;
