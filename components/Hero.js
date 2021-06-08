import styled from '@emotion/styled';
import parse from 'html-react-parser';
import Link from 'next/link';
import HeroTitle from './core/HeroTitle';
import PostExcerpt from './core/PostExcerpt';
import PostMeta from './core/PostMeta';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export default function Hero({ hero, isEt = false }) {
  return (
    <HeroContainer>
      <HeroPost>
        <ImageContainer>
          <Link as={`/post/${hero.slug}`} href={`/post/${hero.slug}`}>
            <a>
              <img alt={parse(hero.title.rendered)} src={hero.featured_image_url} />
            </a>
          </Link>
        </ImageContainer>
        <ExcerptContainer>
          <HeroHeader bgColor={isEt === false ? hero.post_categories[0].color : '#fff'}>
            <PostMeta tags={hero.post_tags} cats={hero.post_categories} />

            <Link as={`/post/${hero.slug}`} href={`/post/${hero.slug}`}>
              <a>
                <HeroTitle>{parse(hero.title.rendered)}</HeroTitle>
                {hero.wps_subtitle ? (
                  <SubTitle dangerouslySetInnerHTML={{ __html: hero.wps_subtitle }} />
                ) : null}
              </a>
            </Link>
          </HeroHeader>

          <HeroContent>
            {hero.acf.adv_excerpt ? (
              <PostExcerpt excerpt={hero.acf.adv_excerpt} isPrimary acf={false} />
            ) : (
              <PostExcerpt excerpt={hero.excerpt.rendered} isPrimary isHero />
            )}

            <Author>
              <span>By {hero.acf.authors ? parse(hero.acf.authors) : hero.post_author}</span>
              <p>
                {`${new Date(hero.date).getUTCDate()} ${
                  monthNames[new Date(hero.date).getUTCMonth()]
                } ${new Date(hero.date).getUTCFullYear()}`}
              </p>
            </Author>

            {hero.acf.has_link ? (
              <ExternalLink
                bgColor={hero.acf.link_background_color}
                color={hero.acf.label_color}
                href={
                  hero.acf.link_location === 'internal'
                    ? `/post/${hero.acf.link_articles.post_name}`
                    : hero.acf.link_external
                }>
                {hero.acf.link_label}
              </ExternalLink>
            ) : null}
          </HeroContent>
        </ExcerptContainer>
      </HeroPost>
    </HeroContainer>
  );
}

const HeroHeader = styled.div`
  @media only screen and (max-width: 768px) {
    background-color: ${(props) => props.bgColor};
    padding: 1em 1em 0;
    margin-top: -2px;
  }
`;

const HeroContent = styled.div`
  @media only screen and (max-width: 768px) {
    padding: 1em 1em 0;
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    padding: 1em 0 0;
  }
`;

const HeroContainer = styled.div`
  @media only screen and (min-width: 1200px) {
    width: 970px;
    margin: 0 auto;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    width: 940px;
    margin: 0 auto;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    width: 970px;
    margin: 0 auto;
  }

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    width: 940px;
  }

  @media only screen and (max-width: 768px) {
    img {
      width: 100%;
    }
  }
  @media only screen and (max-width: 834px) and (min-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const HeroPost = styled.div`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  img {
    width: 482px;
  }
  @media only screen and (max-width: 768px) {
    img {
      width: 100%;
    }
  }

  @media only screen and (min-width: 1024px) and (max-width: 1366px) {
    width: 460px;
    img {
      width: 100%;
    }
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    width: 100%;
    img {
      width: 100%;
    }
  }

  @media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    img {
      width: 400px;
    }
  }
`;

const ExcerptContainer = styled.div`
  width: 465px;
  a {
    > h1 {
      color: #000;
      margin: 20px 0;
      display: inline-block;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: -4px;
    a {
      > h1 {
        color: #000;
        margin: 20px 0;
        display: inline-block;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  @media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    width: 517px;
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
  }
`;

const Author = styled.div`
  font-family: ${(props) => props.theme.font.primary};
  font-weight: 700;
  font-size: 18px;
  margin-top: 20px;
`;

const InternalLink = styled.a`
  font-size: 21px;
  line-height: 25px;
  font-family: ${(props) => props.theme.font.secondary};
  font-style: italic;
  color: #000;
  display: inherit;
  margin: 20px 0;
  &:hover {
    text-decoration: underline;
    color: #000;
    cursor: pointer;
  }
`;

const EtCeteraSpan = styled.span`
  background: #000;
  padding: 1px 5px;
  color: #fff;
  font-size: 11px;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.font.primary}!important;
  font-weight: 700;
  margin-left: 10px;
  font-style: normal;
`;

const ExternalLink = styled.a`
  background: ${(props) => props.bgColor};
  padding: 0 5px;
  color: ${(props) => props.color};
  font-size: 11px;
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

const SubTitle = styled.h3`
  font-size: 26px;
  font-weight: 600;
  font-family: ${(props) => props.theme.font.primary};
  line-height: 26px;
  margin: -15px 0 0;
  padding-bottom: 15px;
  color: #000;
  @media only screen and (max-width: 768px) {
    margin: -10px 0 15px;
    font-size: 22px;
    line-height: 22px;
  }
`;
