import styled from '@emotion/styled';
import { Popup } from 'semantic-ui-react';

export default function InTheNews() {
  return (
    <>
      <Popup
        className="in-the-news"
        trigger={<TriggerText>IN THE NEWS</TriggerText>}
        on="click"
        flowing
        hideOnScroll
        position="bottom right"
        style={{
          background: 'transparent'
        }}>
        <BurgerContent width="100%">
          <BurgerLinks>
            <a style={{ background: '#777268' }} href="/media-coverage">
              Media Coverage
            </a>
            <a style={{ background: '#777268' }} href="/announcements">
              Announcements
            </a>
          </BurgerLinks>
        </BurgerContent>
      </Popup>
    </>
  );
}

const BurgerContent = styled.div`
  padding: 0;
`;

const BurgerLinks = styled.div`
  display: flex;
  flex-direction: column;
  a {
    font-family: ${(props) => props.theme.font.primary};
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    padding: 5px 10px;
    &:hover {
      color: #000;
    }
  }
`;

const TriggerText = styled.a`
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  font-family: ${(props) => props.theme.font.primary};
  color: #000;
  cursor: pointer;
  margin: 0;
  @media only screen and (max-width: 768px) {
    margin: 0;
    font-size: 12px;
  }
`;
