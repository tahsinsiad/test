import Link from 'next/link';
import { Reveal } from 'semantic-ui-react';

const Topics = (props) => {
  return (
    <>
      <style jsx>
        {`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: 'Catamaran', sans-serif !important;
            font-weight: 700;
          }

          h2 {
            font-size: 75px;
            font-weight: 800;
            text-align: center;
            margin-bottom: 50px;
          }

          .topics-container {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            margin: 0 auto;
          }

          .topics-container-mobile {
            display: none;
            width: 90%;
            flex-wrap: wrap;
            margin: 0 auto;
          }

          .topic-item-container {
            width: 31.3%;
            margin-right: 3%;
            margin-bottom: 40px;
            cursor: pointer;
          }

          .topics-container .topic-item,
          .topics-container-mobile .topic-item {
            color: #fff;
            width: 100%;
            height: 350px;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            padding: 50px;
          }

          .topic-item.top {
            font-family: 'Catamaran', sans-serif !important;
            font-weight: 800;
            font-size: 3em;
            line-height: 1.2em;
          }

          .topic-item.bottom {
            font-family: 'Catamaran', sans-serif !important;
            font-weight: 400;
            font-size: 30px;
            line-height: 35px;
            z-index: 4;
          }

          h4 {
            font-size: 50px;
            line-height: 50px;
            font-weight: 800;
            text-transform: capitalize;
            margin: 0 30px;
          }

          .topics-container .topic-item-container:nth-child(3n + 3),
          .topics-container-mobile .topic-item-container:nth-child(3n + 3) {
            margin-right: 0;
          }

          .topics-container .topic-item-container:nth-child(odd) .topic-item,
          .topics-container-mobile .topic-item-container:nth-child(odd) .topic-item {
            background-color: #bf8845;
          }

          .topics-container .topic-item-container:nth-child(even) .topic-item,
          .topics-container-mobile .topic-item-container:nth-child(even) .topic-item {
            background-color: #daa466;
          }

          .topics-container a:nth-child(odd) > div > hr,
          .topics-container-mobile a:nth-child(odd) > div > hr {
            border-color: #daa466;
            border-width: 3px;
            border-style: solid;
          }

          .topics-container a:nth-child(even) > div > hr,
          .topics-container-mobile a:nth-child(even) > div > hr {
            border-color: #bf8845;
            border-width: 3px;
            border-style: solid;
          }

          hr {
            border-style: solid;
            border-width: 2px;
          }

          @media all and (min-width: 768px) and (max-width: 1024px) {
            .topics-container {
              display: none;
            }

            .topics-container-mobile {
              display: flex;
            }

            .topics-container-mobile a.topic-link {
              width: 31.3%;
              min-height: 300px;
              padding: 30px 0;
            }
            .topics-container {
              display: none;
            }

            h4 {
              font-size: 25px;
              line-height: 25px;
              font-weight: 800;
              text-transform: capitalize;
            }

            h2 {
              font-size: 55px;
              margin-bottom: 50px;
            }

            .topic-item.top {
              font-size: 1.7em;
              line-height: 1.2em;
            }

            .topic-item.bottom {
              font-size: 1.1em;
              line-height: 1em;
            }

            .topics-container-mobile .topic-item {
              height: 200px;
            }
          }

          @media all and (max-width: 767px) {
            h1.page-title {
              font-size: 3em;
              text-align: center;
              margin: 0 auto 20px;
              padding-left: 0;
              width: 90%;
            }
            h2 {
              text-align: center;
              font-size: 55px;
              margin-bottom: 50px;
              margin-top: 50px;
            }
            .topic-link {
              margin-bottom: 20px;
              padding: 30px;
            }
            .topics-container-mobile a.topic-link {
              width: 31.3%;
              min-height: 300px;
              padding: 30px 0;
            }
            .topics-container {
              display: none;
            }
            .topics-container-mobile {
              display: flex;
              margin-bottom: 50px;
            }

            .topic-item-container {
              width: 48%;
              margin-right: 2%;
              margin-bottom: 10px;
              cursor: pointer;
            }

            .topic-item.top {
              font-size: 1.2em;
              line-height: 1.3em;
            }

            .topic-item.bottom {
              font-size: 1.1em;
              line-height: 1em;
            }

            .topics-container-mobile .topic-item {
              height: 130px;
            }

            .topics-container-mobile .topic-item-container:nth-child(2n + 2) {
              margin-right: 0;
            }
            .topics-container-mobile .topic-item-container:nth-child(3n + 3) {
              margin-right: 2%;
            }
          }
        `}
      </style>

      {props.title ? <h2>Topics</h2> : null}

      {props.topics ? (
        <>
          <div className="topics-container">
            {props.topics.map((topic, i) =>
              topic.parent == 0 ? (
                // <Link href={{ pathname: 'about', query: { name: 'leangchhean' }}}>
                <div key={`topics-${topic.id}`} className="topic-item-container">
                  <Reveal animated="move up">
                    <Reveal.Content visible>
                      <Link
                        key={topic.id}
                        as={`topic/${topic.slug}`}
                        href={{
                          pathname: `topic`,
                          query: {
                            slug: topic.slug,
                            name: topic.name,
                            desc: topic.description,
                            getPost: props.postLink + topic.id
                          }
                        }}>
                        <a>
                          <div className="topic-item top">{topic.name}</div>
                        </a>
                      </Link>
                    </Reveal.Content>
                    <Reveal.Content hidden>
                      <Link
                        key={topic.id}
                        as={`topic/${topic.slug}`}
                        href={{
                          pathname: `topic`,
                          query: {
                            slug: topic.slug,
                            name: topic.name,
                            desc: topic.description,
                            getPost: props.postLink + topic.id
                          }
                        }}>
                        <div className="topic-item bottom">{topic.description}</div>
                      </Link>
                    </Reveal.Content>
                  </Reveal>
                </div>
              ) : null
            )}
          </div>
          <div className="topics-container-mobile">
            {props.topics.map((topic, i) =>
              topic.parent == 0 ? (
                // <Link href={{ pathname: 'about', query: { name: 'leangchhean' }}}>
                <div key={`topics-${topic.id}`} className="topic-item-container">
                  <Link
                    as={`topic/${topic.slug}`}
                    href={{
                      pathname: `topic`,
                      query: {
                        slug: topic.slug,
                        name: topic.name,
                        desc: topic.description,
                        getPost: props.postLink + topic.id
                      }
                    }}>
                    <a>
                      <div className="topic-item top">{topic.name}</div>
                    </a>
                  </Link>
                </div>
              ) : null
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Topics;
