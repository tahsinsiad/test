import styled from '@emotion/styled';
import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import { facebook, instagram, linkedin, twitter } from '@/utils/social';
import Container from '../core/Container';
import InTheNews from './InTheNews';
import ResearchPillars from './ResearchPillars';
import Subscribe from './Subscribe';

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterLeft>
            <AboutCentre>
              The Centre is a centrist think tank driven by research and advocacy of progressive and
              pragmatic policy ideas. We are a not-for-profit and a mostly remote working
              organisation.
            </AboutCentre>
            <AboutCentre>
              For general inquiries, please write to us at{' '}
              <a href="mailto:info@centre.my">info@centre.my</a>.
            </AboutCentre>
            <AboutCentre>
              For job and internship applications, please write to us at{' '}
              <a href="mailto:careers@centre.my">careers@centre.my</a>.
            </AboutCentre>
          </FooterLeft>

          <FooterRight>
            <SocialLink>
              <li>
                <a href={facebook} target="_blank" rel="noopener noreferrer">
                  <Icon name="facebook" /> FACEBOOK
                </a>
              </li>
              <li>
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  <Icon name="instagram" /> INSTAGRAM
                </a>
              </li>
              <li>
                <a href={twitter} target="_blank" rel="noopener noreferrer">
                  <Icon name="twitter" /> TWITTER
                </a>
              </li>
              <li>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <Icon name="linkedin" /> LINKEDIN
                </a>
              </li>
            </SocialLink>
            <SiteLink>
              <li>
                <a href="/about">ABOUT US</a>
              </li>
              <li>
                <a href="/terms-and-conditions">TERMS & CONDITIONS</a>
              </li>
              <li>
                <a href="/privacy-policy">PRIVACY POLICY</a>
              </li>
            </SiteLink>

            <Subscribe />
          </FooterRight>
        </FooterContent>
      </Container>
      <MobileMenu>
        <ResearchPillars />

        <div>
          <Link href="/post">
            <a>
              <span>ALL PUBLICATIONS</span>
            </a>
          </Link>
        </div>

        <div>
          <Link href="/about">
            <a>
              <span>ABOUT US</span>
            </a>
          </Link>
        </div>

        <InTheNews />
      </MobileMenu>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  width: 100%;
  background: #000;
  margin-top: 50px;
  @media only screen and (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

const AboutCentre = styled.p`
  font-family: ${(props) => props.theme.font.primary};
  font-size: 18px;
  line-height: 26px;
  font-weight: 600;
  color: #fff;
  a {
    color: #fff;
    text-decoration: underline;

    &:hover {
      color: #fff !important;
    }
  }

  @media only screen and (max-width: 768px) {
    font-size: 18px;
    line-height: 26px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 2) and (max-device-height: 1366px) and (min-device-width: 1024px) and (orientation: portrait) {
    width: 940px;
    margin: 0 auto;
  }
`;

const FooterLeft = styled.div`
  width: 336px;
  img {
    width: 300px;
    margin-bottom: 15px;
  }
  @media only screen and (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const FooterRight = styled.div`
  @media only screen and (max-width: 768px) {
  }
`;

const ListStyle = styled.ul`
  list-style-type: none;
  font-family: ${(props) => props.theme.font.primary};
  font-weight: 700;
  font-size: 20px;
  padding: 0;
  margin-top: 0;
  li {
    line-height: 24px;
  }
  a {
    color: #fff;
  }
`;
const SocialLink = styled(ListStyle)`
  a:hover {
    color: #dadada !important;
  }
`;

const SiteLink = styled(ListStyle)`
  a:hover {
    color: #dadada !important;
  }
`;

const MobileMenu = styled.div`
  display: none;
  @media only screen and (max-width: 1023px) {
    display: flex;
    background: #fff;
    border-top: 1px solid #707070;
    border-bottom: 1px solid #707070;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: space-around;
    padding: 15px 0;
    color: #000000;
    z-index: 1;
    width: 100vw;
    font-size: 12px;
    line-height: 20px;
    font-weight: 700;
    font-family: ${(props) => props.theme.font.primary};
    a {
      color: #000;
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 768px) {
    a {
      color: #000;
      font-size: 12px;
    }
  }
`;
