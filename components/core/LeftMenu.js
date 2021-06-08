import styled from '@emotion/styled';
import Link from 'next/link';
import Burger from './Burger';
import ResearchPillars from './ResearchPillars';

export default function LeftMenu() {
  return (
    <Menu>
      <Burger />
      <MenuLink>
        <ResearchPillars />
        <Link href="/post">
          <a className="navbar-link">ALL PUBLICATIONS</a>
        </Link>
      </MenuLink>
    </Menu>
  );
}

const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 25px;
  a {
    margin-right: 30px;
    font-family: ${(props) => props.theme.font.primary};
    color: #000;
    font-size: 16px;
    font-weight: 700;
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
  align-items: center;

  @media only screen and (max-width: 768px) {
    display: none;
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    display: none;
  }
`;
