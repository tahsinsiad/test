import styled from '@emotion/styled';
import axios from 'axios';
import _ from 'lodash';
import Container from '@/components/core/Container';
import PageTitle from '@/components/core/PageTitle';

const { REST_PATH } = process.env;
export default function PrivacyPolicy({ page }) {
  return (
    <Container>
      <PageTitle>{page.title.rendered}</PageTitle>

      <div className="page-container">
        <Content dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </div>
    </Container>
  );
}

// Page.getInitialProps = pageData;

export async function getStaticProps() {
  const res = await axios.get(`${REST_PATH}pages?slug=privacy-policy`);
  const data = await res.data;

  return {
    props: {
      page: _.head(data)
    }
  };
}

const Content = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${(props) => props.theme.font.primary};
  }
  h2 {
    font-size: 30px;
    line-height: 30px;
  }

  h3 {
    font-size: 26px;
    line-height: 26px;
  }

  h4 {
    font-size: 22px;
    line-height: 22px;
  }
  margin-top: 30px;
  p {
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 19px;
    font-weight: 400;
    line-height: 32px;
    margin: 0 0 1.5em;

    a {
      text-decoration: underline;
      color: #000;
    }
  }
  ul {
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 19px;
    font-weight: 400;
    line-height: 32px;
    a {
      text-decoration: underline;
      color: #000;
    }
  }

  @media only screen and (max-width: 768px) {
    p {
      font-size: 18px;
      line-height: 30px;
    }
    h2 {
      font-size: 36px;
      line-height: 38px;
    }
    h3 {
      font-size: 26px;
      line-height: 28px;
    }
    h4 {
      font-size: 22px;
      line-height: 24px;
    }
  }
`;
