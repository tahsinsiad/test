import styled from '@emotion/styled';

export default function PageTitle(props) {
  return (
    <Heading>
      <h1>{props.children}</h1>
    </Heading>
  );
}

const Heading = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  h1 {
    font-family: ${(props) => props.theme.font.primary};
    font-weight: 700;
    font-size: 62px;
    color: #000;
    display: inline-block;
    padding: 10px 50px;
    margin: 0 auto;
  }
  @media only screen and (max-width: 768px) {
    margin: 25px 0;
    h1 {
      font-size: 25px;
      padding: 10px 25px;
    }
  }
`;
