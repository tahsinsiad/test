import parse from 'html-react-parser';
import Link from 'next/link';

const categoryLinkStyle = {
  fontSize: 16,
  textTransform: 'uppercase',
  fontFamily: "'Catamaran', sans-serif",
  fontWeight: '700'
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const FeaturedPost = (props) => (
  <>
    <style jsx>{`
      .featured-container {
        width: 1200px;
        margin: 100px auto 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Catamaran', sans-serif;
        font-weight: 700;
      }

      .featured-tag {
        font-size: 15px;
        line-height: 15px;
        color: #000;
        text-transform: uppercase;
        font-family: 'Catamaran', sans-serif;
        font-weight: 600;
      }

      .text {
        font-family: 'Poly', serif;
        font-size: 20px;
        line-height: 30px;
        margin: 20px 0;
      }

      .featured-post {
        display: flex;
        margin-bottom: 95px;
      }

      .img-container {
        width: 50%;
        margin-right: 40px;
      }

      .excerpt-container {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .img-container img {
        cursor: pointer;
        width: 100%;
      }
      .featured-post a {
        font-family: 'Catamaran', sans-serif;
        font-weight: 600;
        color: #bf8844;
        text-decoration: none;
        font-size: 15px;
        line-height: 15px;
        text-transform: uppercase;
      }
      .featured-post h1 {
        font-size: 50px;
        font-weight: 800;
        line-height: 50px;
        margin-bottom: 0;
        margin-top: 5px;
        margin-left: -2px;
        cursor: pointer;
      }

      .featured-post h1:hover {
        text-decoration: underline;
      }

      .tagseperator {
        color: #bf8844;
        margin: 0 10px;
        height: 15px;
        line-height: 15px;
        font-size: 15px;
        font-weight: 800;
        position: relative;
        top: -1px;
      }

      @media all and (min-width: 768px) and (max-width: 1024px) {
        .featured-container {
          width: 90%;
          margin: 100px auto 0;
        }

        .featured-post {
          flex-direction: row;
          margin-bottom: 0;
        }

        .img-container {
          width: 100%;
          margin-right: 30px;
        }

        .excerpt-container {
          margin-top: 0;
          width: 100%;
        }
      }

      @media all and (max-width: 767px) {
        .featured-container {
          width: 90%;
          margin: 25px auto 0;
        }

        .featured-post {
          flex-direction: column;
          margin-bottom: 50px;
        }

        .text {
          font-size: 18px;
          margin: 10px 0;
        }

        .featured-post > img {
          width: 100%;
        }

        .featured-post h1 {
          font-size: 35px;
          line-height: 35px;
          margin: 10px 0;
        }
        .img-container {
          width: 100%;
          margin-right: 0;
        }

        .excerpt-container {
          margin-top: 30px;
          width: 100%;
        }

        .byAuthor {
          font-size: 16px;
        }
      }

      @media all and (min-width: 767px) and (max-width: 1280px) {
        .featured-container {
          width: 100%;
          margin: 100px auto 0;
        }
      }
    `}</style>
    <div className="featured-container">
      <div className="featured-post">
        <div key="container" className="img-container">
          <Link as={`/post/${props.featured.slug}`} href={`/post/${props.featured.slug}`}>
            <a>
              <img
                alt={parse(props.featured.title.rendered)}
                src={props.featured.featured_image_url}
              />
            </a>
          </Link>
        </div>
        <div key="excerpt" className="excerpt-container">
          <div>
            {props.featured.post_tags.map((tag, i) =>
              i === 0 ? (
                <span key={`featured-tag-${i}`} className="featured-tag">
                  {tag.name}
                </span>
              ) : null
            )}{' '}
            <span className="tagseperator">|</span>{' '}
            {props.featured.post_categories.map((cat, i) => (
              <Link
                key={`featured-cat-${i}`}
                as={`topic/${cat.slug}`}
                href={{
                  pathname: `topic`,
                  query: {
                    slug: cat.slug,
                    name: cat.name,
                    desc: cat.description,
                    getPost: props.postLink + cat.cat_ID
                  }
                }}>
                <a className="featured-post-cat">
                  {cat.name}
                  {i == props.featured.post_categories.length - 1 ? null : `, `}
                </a>
              </Link>
            ))}
          </div>

          <Link as={`/post/${props.featured.slug}`} href={`/post/${props.featured.slug}`}>
            <h1>{props.featured.title.rendered}</h1>
          </Link>

          {props.featured.acf.adv_excerpt ? (
            <div
              className="text"
              dangerouslySetInnerHTML={{
                __html: props.featured.acf.adv_excerpt
              }}
            />
          ) : (
            <div
              className="text"
              dangerouslySetInnerHTML={{
                __html: props.featured.excerpt.rendered
              }}
            />
          )}

          <div className="text byAuthor">
            By <span style={{ fontStyle: 'italic' }}>{props.featured.post_author}</span> |{' '}
            <span style={{ fontStyle: 'italic' }}>
              {`${new Date(props.featured.date).getUTCDate()} ${
                monthNames[new Date(props.featured.date).getUTCMonth()]
              } ${new Date(props.featured.date).getUTCFullYear()}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default FeaturedPost;
