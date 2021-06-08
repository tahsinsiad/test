import styled from '@emotion/styled';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { SocialIcon } from 'react-social-icons';
import { Icon } from 'semantic-ui-react';
import { facebook, instagram, linkedin, twitter } from '@/utils/social';
import Popup from './Popup';

export default function Burger() {
  return (
    <BurgerWrapper>
      <Popup
        trigger={<Icon style={{ fontSize: '1.5em', marginTop: 3 }} name="content" />}
        on="click"
        flowing
        hideOnScroll
        style={{
          background: '#000'
        }}>
        <BurgerContent>
          <BurgerTitle>Follow the centre</BurgerTitle>
          <SocialMedia>
            <a target="_blank" href={facebook}>
              <FacebookIcon
                iconFillColor="#000000"
                bgStyle={{ fill: '#ffffff' }}
                size={32}
                round={true}
              />
            </a>
            <a target="_blank" href={twitter}>
              <TwitterIcon
                iconFillColor="#000000"
                bgStyle={{ fill: '#ffffff' }}
                size={32}
                round={true}
              />
            </a>
            <SocialIcon
              url={instagram}
              network="instagram"
              bgColor="#ffffff"
              style={{ height: 32, width: 32, marginRight: 5 }}
            />
            <SocialIcon
              url={linkedin}
              network="linkedin"
              bgColor="#ffffff"
              style={{ height: 32, width: 32 }}
            />
          </SocialMedia>
        </BurgerContent>
      </Popup>
    </BurgerWrapper>
  );
}

const BurgerWrapper = styled.span`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
  }
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    display: block;
  }
`;

const BurgerContent = styled.div`
  background-color: #000;
  padding: 20px;
`;

const SocialMedia = styled.div`
  display: flex;
  margin: 20px 0;

  a {
    margin-right: 5px;
  }
  @media only screen and (max-width: 768px) {
    margin: 20px 0 0;
  }
`;

const BurgerLinks = styled.div`
  display: flex;
  flex-direction: column;
  a {
    font-family: ${(props) => props.theme.font.primary};
    color: #fff;
  }

  a:hover {
    color: #dadada !important;
  }
`;
const BurgerTitle = styled.h4`
  font-family: theme.font.primary;
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 3px;
`;
