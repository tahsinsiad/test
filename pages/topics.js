import axios from 'axios';
import _ from 'lodash';
import Layout from '@/components/core/Layout';
import TopicComponent from '@/components/Topics';

const { REST_PATH } = process.env;

const Topics = ({ topics, postLink }) => (
  <Layout title="Topics">
    <style jsx>
      {`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Catamaran', sans-serif;
          font-weight: 700;
        }

        h1 {
          font-size: 70px;
          padding-left: 30px;
          border-left: 10px solid #bf8845;
          line-height: 70px;
          margin-bottom: 50px;
        }

        a,
        p {
          font-family: 'Poly', serif;
          font-size: 19px;
          line-height: 25px;
        }
        .topic-container {
          width: 100%;
          margin: 100px auto 0;
        }

        .topic-item > a {
          display: flex;
          text-decoration: none;
          color: #000;
        }

        .topic-name {
          text-transform: uppercase;
        }

        .topic-container > .topic-item {
          margin-bottom: 50px;
        }

        .topic-container > .topic-item > a > div.topic-name {
          min-width: 400px;
          min-height: 300px;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-right: 50px;
        }

        .topic-container > .topic-item > a > div.topic-desc {
          display: flex !important;
          align-items: flex-end;
        }

        .topic-container > .topic-item > a > div.topic-desc > span {
          margin-top: auto;
        }

        .topic-container > .topic-item > a > div.topic-name > hr {
          border-width: 3px;
          border-style: solid;
          width: 20%;
        }

        .topic-container > .topic-item:nth-child(odd) > a > div.topic-name {
          background-color: #bf8845;
        }

        .topic-item:nth-child(even) a > div.topic-name {
          background-color: #daa466;
        }

        @media all and (min-width: 768px) and (max-width: 1024px) {
          .topic-container {
            width: 90%;
            margin: 100px auto;
          }
        }

        @media all and (max-width: 767px) {
          h1 {
            font-size: 35px;
            padding-left: 15px;
            line-height: 35px;
            margin: 20px 0;
          }

          .topic-item > a {
            flex-direction: column;
          }
          .topic-container {
            width: 90%;
            margin: 0 auto;
          }
          .topic-container > .topic-item > a > div.topic-name {
            min-width: unset;
            min-height: unset;
            margin-right: 0;
            padding: 50px 0;
          }
        }
      `}
    </style>

    <div className="topic-container">
      <h1>Topics</h1>
    </div>
    <TopicComponent topics={topics} postLink={postLink} />
  </Layout>
);

export async function getStaticProps() {
  const cat = await axios.get(`${REST_PATH}categories?parent=0`);
  let data = await cat.data;
  const postLink = `${REST_PATH}posts?categories=`;

  data = _.filter(data, (d) => !d.acf.hidden_cat);

  return {
    props: {
      topics: data,
      postLink: postLink
    },
    revalidate: 300
  };
}

export default Topics;
