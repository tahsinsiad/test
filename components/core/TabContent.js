import Divider from '../core/Divider';
import styled from '@emotion/styled';

export default function TabContent({ media }) {
  return media.map((m, i) => {
    return (
      <div key={`media-${i}`}>
        <MediaContainer>
          <MediaDate>{m.acf.date}</MediaDate>
          <MediaLink>
            <a target="_blank" href={m.acf.link}>
              {m.acf.label}
            </a>
          </MediaLink>
        </MediaContainer>
        <Divider margin="1.5rem 0" color="#E0E0E0" />
      </div>
    );
  });
}

const MediaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const MediaDate = styled.div`
  font-size: 19px;
  font-weight: 700;
  line-height: 32px;
  font-family: ${(props) => props.theme.font.primary};
`;
const MediaLink = styled.div`
  width: 750px;
  a {
    color: #000;
    font-size: 19px;
    font-weight: 400;
    line-height: 32px;
    font-family: ${(props) => props.theme.font.secondary};
    &:hover {
      text-decoration: underline;
    }
  }
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    width: 730px;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    a {
      font-size: 18px;
      line-height: 30px;
    }
  }
`;

const YearHeading = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  h2 {
    font-size: 40px;
    font-weight: 700;
    font-family: ${(props) => props.theme.font.primary};
    color: #000;
    padding: 10px 20px;
  }
  @media only screen and (max-width: 768px) {
    margin: 25px 0;
    h2 {
      font-size: 36px;
      line-height: 38px;
    }
    h3 {
      font-size: 26px;
      line-height: 28px;
    }
    h4 {
      font-size: 20px;
      line-height: 22px;
    }
  }
`;
