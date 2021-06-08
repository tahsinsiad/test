import styled from '@emotion/styled';
import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import { facebook, instagram, linkedin, twitter } from '@/utils/social';
import Search from '../Search';
import InTheNews from './InTheNews';

export default function RightMenu() {
  return (
    <Menu>
      <MenuLink>
        <Link href="/about">
          <a className="navbar-link">ABOUT US</a>
        </Link>

        <InTheNews />
      </MenuLink>

      <SocialMedia>
        <a target="_blank" rel="noopener noreferrer" href={facebook}>
          <Icon name="facebook" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href={instagram}>
          <Icon name="instagram" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href={twitter}>
          <Icon name="twitter" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href={linkedin}>
          <Icon name="linkedin" />
        </a>
      </SocialMedia>
      <Search />
    </Menu>
  );
}

const SocialMedia = styled.div`
  display: flex;
  margin: 0 30px 0 0;
  a {
    margin-right: 0;
    &:last-child {
      margin-right: 0;
      > i.icon {
        margin-right: 0;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    margin: 0 15px 0 0;
  }
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    display: none;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 25px;
  a {
    margin-right: 30px;
    font-family: ${(props) => props.theme.font.primary};
    color: #000;
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 15px;
  }
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    a {
      margin-right: 15px;
    }
  }
`;

const MenuLink = styled.div`
  display: flex;
  @media only screen and (max-width: 768px) {
    display: none;
  }
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    display: none;
  }
`;
