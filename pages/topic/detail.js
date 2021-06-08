import { withRouter } from 'next/router';
import Layout from '../../components/core/Layout';
import PostList from '../../components/PostList';
import { getTopicAllData as topicAllData } from '../../utils/api';

const Latest = (props) => {
  return (
    <Layout title={`${props.topicTitle} | ${props.tagTitle}`}>
      <style jsx>{`
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Catamaran", sans-serif;
        font-weight: 700;
      }

      .page-heading {
        padding-left: 30px;
        border-left: 10px solid #bf8845;
        margin-bottom: 50px;
      }
      h2 {
        margin: 0;
        font-weight: 500;
        font-size: 40px;
        line-height: 40px;
      }
      h1 {
        font-size: 70px;
        line-height: 70px;
        margin-bottom: 0;
        margin-top: 0;
        margin-left: -4px;
      }
      p {
        font-family: "Poly", serif;
        font-size: 19px;
        line-height: 25px;
      }
      .latest-container {
        margin: 100px auto;
        width: 100%;
      }

      @media all and (min-width: 768px) and (max-width: 1024px) {
      }

      @media all and (max-width: 767px) {
        h1.page-title {
          font-size: 35px;
          line-height: 35px;
          padding-left: 0
          line-height: 35px;
          margin: 0;
          width: 90%;
        }

        h2 {
          font-size: 20px;
          line-height: 20px;
        }

        .latest-container {
          margin: 20px auto;
          width: 100%;
        }
      }
    `}</style>
      <div className="latest-container">
        <div className="page-heading">
          <h1 className="page-title">{props.topicTitle}</h1>
        </div>

        <PostList post={props.posts} />
      </div>
    </Layout>
  );
};

Latest.getInitialProps = topicAllData;

export default withRouter(Latest);
