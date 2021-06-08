import styled from '@emotion/styled';

export default function Container(props) {
  const {
    textcenter,
    fluid,
    background,
    margin = '0 auto',
    mobileMargin = '0 auto',
    children
  } = props;
  return (
    <Div
      {...props}
      fluid={fluid}
      background={background}
      textcenter={textcenter}
      margin={margin}
      mobileMargin={mobileMargin}>
      {children}
    </Div>
  );
}

const Div = styled.div`
  background-color: ${(props) => (props.background ? props.background : 'transparent')};

  @media only screen and (min-width: 1200px) {
    width: ${(props) => (props.fluid ? '100%' : '970px')};
    padding: ${(props) => (props.fluid ? '25px 0' : '0')};
    margin: ${(props) => props.margin};
    text-align: ${(props) => (props.textcenter ? 'center' : 'left')};
  }

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    width: 100%;
    margin: auto;
    padding: 0 20px;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 0 1em;
    text-align: ${(props) => (props.textcenter ? 'center' : 'left')};
    margin: ${(props) => props.mobileMargin};
  }
`;
