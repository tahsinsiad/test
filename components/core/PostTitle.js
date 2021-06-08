import styled from '@emotion/styled';

export default function PostTitle({ title }) {
  return <Heading dangerouslySetInnerHTML={{ __html: title }}></Heading>;
}

const Heading = styled.h2`
  font-family: ${(props) => props.theme.font.primary};
  font-weight: 700;
  font-size: 26px;
  line-height: 28px;
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    line-height: 20px;
  }
`;
