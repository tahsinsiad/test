import styled from '@emotion/styled';

export default function HeroTitle(props) {
  return <Heading>{props.children}</Heading>;
}

const Heading = styled.h1`
  font-family: ${(props) => props.theme.font.primary};
  font-weight: 700;
  font-size: 38px;
  line-height: 36px;
`;
