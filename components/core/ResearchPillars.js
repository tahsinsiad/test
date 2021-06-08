import styled from '@emotion/styled';
import { Popup } from 'semantic-ui-react';

export default function ResearchPillars() {
  return (
    <>
      <Popup
        className="research-pillars"
        trigger={<TriggerText>RESEARCH PILLARS</TriggerText>}
        on="click"
        flowing
        hideOnScroll
        style={{
          background: 'transparent'
        }}>
        <BurgerContent width="100%">
          <BurgerLinks>
            <a style={{ background: '#F2C53D' }} href="/research-pillars/public-goods">
              Public Goods
            </a>
            <a style={{ background: '#F07E5A' }} href="/research-pillars/safety-nets">
              Safety Nets
            </a>
            <a style={{ background: '#BF8844' }} href="/research-pillars/societal-contracts">
              Societal Contracts
            </a>
            <a style={{ background: '#BABABA' }} href="/research-pillars/others">
              Others
            </a>
          </BurgerLinks>
        </BurgerContent>
      </Popup>
    </>
  );
}

const BurgerContent = styled.div`
  padding: 0;
  width: 250px;
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
