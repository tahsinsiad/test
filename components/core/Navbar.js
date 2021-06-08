import styled from '@emotion/styled';
import LeftMenu from './LeftMenu';
import Logo from './Logo';
import RightMenu from './RightMenu';
import SiteDesc from './SiteDesc';

export default function Navbar() {
  return (
    <NavContainer>
      <RowDiv>
        <LeftDiv>
          <Div textAlign="left">
            <LeftMenu id="left-menu" />
          </Div>
        </LeftDiv>
        <LogoDiv>
          <Logo bottom />
        </LogoDiv>
        <RightDiv>
          <Div textAlign="right">
            <RightMenu id="right-menu" />
          </Div>
        </RightDiv>
      </RowDiv>
      <SiteDesc />
    </NavContainer>
  );
}

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LeftDiv = styled.div`
  position: absolute;
  left: 64px;
  top: 0;
  @media only screen and (max-width: 768px) {
    left: 20px;
  }
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    left: 40px;
  }
`;

const RightDiv = styled.div`
  position: absolute;
  right: 64px;
  top: 0;
  @media only screen and (max-width: 768px) {
    right: 20px;
  }

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    right: 40px;
  }
`;
const LogoDiv = styled.div`
  margin: 0 auto;
  width: 210px;
`;
const Div = styled.div`
  width: 100%;
`;
const NavContainer = styled.div`
  width: 100%;
  padding: 0 50px;
  @media only screen and (max-width: 768px) {
    padding: 0;
    #left-menu,
    #right-menu {
      display: none;
    }
  }

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    padding: 0;
  }
`;
