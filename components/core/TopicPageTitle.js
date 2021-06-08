import styled from '@emotion/styled';

export default function TopicPageTitle({ title, desc, color }) {
  return (
    <Heading>
      <TopicPageHeading color={color}>{title}</TopicPageHeading>
      <p>{desc}</p>
    </Heading>
  );
}

const TopicPageHeading = styled.h1`
  font-family: ${(props) => props.theme.font.primary};
  font-weight: 700;
  font-size: 62px;
  text-transform: uppercase;
  color: ${(props) => props.color};
  display: inline-block;
  padding: 10px 50px 0;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    font-size: 32px;
    padding: 10px 17px;
  }
`;
const Heading = styled.div`
  text-align: center;
  margin: 50px 0;

  p {
    font-size: 24px;
    font-family: ${(props) => props.theme.font.primary};
  }
`;
