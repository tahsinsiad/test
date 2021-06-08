import styled from '@emotion/styled';
import Link from 'next/link';

export default function Logo({ bottom, hideOnMobile }) {
  return (
    <LogoContainer>
      <SiteLogo>
        <Link href="/">
          <Anchor>
            <LogoImage
              bottom
              src={bottom ? `/images/logo-white.svg` : `/images/logo-black.svg`}
              alt="Centre.My Logo"
              hideOnMobile={hideOnMobile}
            />
          </Anchor>
        </Link>
      </SiteLogo>
    </LogoContainer>
  );
}

const Anchor = styled.a`
  color: ${(props) => props.theme.color.primary};
`;
const LogoContainer = styled.div`
  justify-content: center;
  flex: 0 0 100%;
`;

const SiteLogo = styled.div`
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  @media only screen and (max-width: 768px) {
    visibility: ${(props) => (props.hideOnMobile ? 'hidden' : 'visible')};
    width: 100%;
  }
`;
