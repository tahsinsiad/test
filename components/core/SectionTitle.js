import styled from '@emotion/styled';

export default function SectionTitle({
  invert,
  background = '#000',
  color = '#fff',
  children,
  fontSize = '40px'
}) {
  return (
    <Heading invert={invert} background={background} color={color} fontSize={fontSize}>
      <h2>{children}</h2>
    </Heading>
  );
}

const Heading = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 50px;
  h2 {
    font-family: ${(props) => props.theme.font.primary};
    font-weight: 700;
    font-size: ${(props) => props.fontSize};
    background: ${(props) => props.background};
    color: ${(props) => props.color};
    display: inline-block;
    padding: 10px 30px;
    margin: 0 auto;
    text-transform: uppercase;
  }

  @media only screen and (max-width: 768px) {
    h2 {
      text-align: center;
    }
  }
`;
