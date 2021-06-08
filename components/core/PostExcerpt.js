import styled from '@emotion/styled';

export default function PostExcerpt({
  excerpt,
  isPrimary = false,
  isHome = false,
  acf = false,
  isHero = false,
  fontSize = '18px',
  mobileFontSize = '18px'
}) {
  let excerptClass = [`${isPrimary ? 'excerpt-primary' : 'excerpt-secondary'}`];
  isHome && excerptClass.push('isHome');
  isHero && excerptClass.push('isHero');

  excerptClass = excerptClass.join(' ');
  return (
    <Div className={excerptClass} fontSize={fontSize} mobileFontSize={mobileFontSize}>
      <div dangerouslySetInnerHTML={{ __html: excerpt }} />
      {acf.has_link && (
        <ExternalLink
          bgColor={acf.link_background_color}
          color={acf.label_color}
          href={
            acf.link_location === 'internal'
              ? `/post/${acf.link_articles.post_name}`
              : acf.link_external
          }>
          {acf.link_label}
        </ExternalLink>
      )}
    </Div>
  );
}

const Div = styled.div`
  font-family: ${(props) => props.theme.font.secondary};
  font-weight: 400;
  font-size: ${(props) => props.fontSize};
  line-height: 24px;
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => props.mobileFontSize};
  }
`;

const ExternalLink = styled.a`
  background: ${(props) => props.bgColor};
  padding: 2px 5px;
  color: ${(props) => props.color};
  font-size: 11px;
  line-height: 1.4285em;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.font.primary};
  font-weight: 700;
  margin: 10px 0;
  display: inline-block;
  cursor: pointer;
  &:hover {
    color: #000;
  }
  @media only screen and (max-width: 768px) {
  }
`;
