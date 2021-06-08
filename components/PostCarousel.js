import parse from 'html-react-parser';
import Link from 'next/link';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const categoryLinkStyle = {
  fontSize: 16,
  textTransform: 'uppercase',
  fontFamily: "'Catamaran', sans-serif",
  fontWeight: '700'
};

const excerptStyle = {
  fontSize: 18,
  lineHeight: '25px'
};

const PostCarousel = (props) => {
  return (
    <div className="container">
      <h2>Latest</h2>

      <div className="post-tags">
        {props.tags.map((tag) => (
          <div key={`taginfo-${tag.id}`}>
            <span className="tag">{tag.name}</span> <span className="tagseperatorInfo">|</span>{' '}
            <span className="desc">{tag.description}</span>
          </div>
        ))}
      </div>

      <div className="carousel-container">
        {props.posts.map((post) => (
          <div className="latest-post-card" key={`carousel-${post.id}`}>
            <Link as={`/post/${post.slug}`} href={`/post?slug=${post.slug}`}>
              <img alt={parse(post.title.rendered)} src={post.medium_featured_image_url} />
            </Link>

            <hr />

            <div>
              {post.post_tags.map((tag, i) =>
                i === 0 ? (
                  <span key={`carousel-tag-${i}`} className="carousel-tag">
                    {tag.name}
                  </span>
                ) : null
              )}{' '}
              <span className="tagseperator">|</span>{' '}
              {post.post_categories.map((cat, i) => (
                <Link
                  key={`carousel-cat-${i}`}
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
                  <a className="catLink">
                    {cat.name}
                    {i == post.post_categories.length - 1 ? null : `, `}
                  </a>
                </Link>
              ))}
            </div>

            <Link as={`/post/${post.slug}`} href={`/post?slug=${post.slug}`}>
              <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </Link>

            {post.acf.adv_excerpt ? (
              <div
                className="post-excerpt"
                dangerouslySetInnerHTML={{ __html: post.acf.adv_excerpt }}
              />
            ) : (
              <div
                className="post-excerpt"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            )}

            <Link as={`/post/${post.slug}`} href={`/post?slug=${post.slug}`}>
              <a className="read-more">
                Read more
                <img
                  src="/icons/right-arrow.svg"
                  style={{
                    width: '14px',
                    marginLeft: '10px',
                    marginBottom: '-2px'
                  }}
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Catamaran', sans-serif;
          font-weight: 700;
        }

        .read-more {
          font-family: 'Poly', serif;
          font-size: 14px;
          line-height: 14px;
          background-color: #bf8844;
          color: #fff;
          border-radius: 100px;
          padding: 10px 15px;
          margin-top: auto;
          margin-left: auto;
        }

        .post-excerpt {
          font-family: 'Poly', serif;
          font-size: 20px;
          line-height: 28px;
          text-decoration: none;
          color: #000;
          margin-bottom: 25px;
        }

        h2 {
          font-size: 75px;
          font-weight: 800;
          text-align: center;
          line-height: 75px;
        }

        .post-tags {
          margin: 0 auto 80px;
          width: 80%;
          font-size: 20px;
          line-height: 20px;
          font-family: 'Catamaran', sans-serif;
          font-weight: 600;
          display: flex;
          justify-content: space-around;
        }

        .post-tags span.tag {
          color: #000 !important;
          text-transform: uppercase;
        }

        .post-tags span.desc {
          color: #bf8844 !important;
        }

        h3 {
          margin: 5px 0 20px -2px;
          font-size: 36px;
          line-height: 36px;
          font-weight: 800;
        }

        h3:hover {
          text-decoration: underline;
          cursor: pointer;
        }

        .latest-post-card {
          width: 31%;
          margin-right: 3.5%;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .latest-post-card:nth-child(3n + 3) {
          margin-right: 0;
        }

        .latest-post-card > img,
        .latest-post-card > h4 {
          cursor: pointer;
        }

        hr {
          width: 100%;
          overflow: hidden;
          box-sizing: border-box;
        }

        .latest-post-card > hr {
          border-style: solid;
          border-width: 3px;
          margin: 5px 0 10px;
        }

        .latest-post-card:nth-child(odd) > hr {
          border-color: #daa466;
        }

        .latest-post-card:nth-child(even) > hr {
          border-color: #cc7510;
        }

        .carousel-container {
          width: 100%;
          display: flex;
          margin: auto;
          flex-wrap: wrap;
        }

        p {
          font-size: 18px;
          line-height: 30px;
        }

        img {
          width: 100%;
        }

        .catLink {
          font-size: 15px;
          line-height: 15px;
          color: #bf8844;
          text-transform: uppercase;
          font-family: 'Catamaran', sans-serif;
          font-weight: 600;
        }

        .carousel-tag {
          font-size: 15px;
          line-height: 15px;
          color: #000;
          text-transform: uppercase;
          font-family: 'Catamaran', sans-serif;
          font-weight: 600;
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

        .tagseperatorInfo {
          color: #bf8844;
          margin: 0 10px;
          height: 20px;
          line-height: 20px;
          font-size: 20px;
          font-weight: 800;
          position: relative;
        }

        @media all and (min-width: 768px) and (max-width: 1024px) {
          .carousel-container {
            width: 90%;
          }
          .latest-post-card > hr {
            margin: 5px 0 10px;
          }

          h3 {
            font-size: 33px;
            line-height: 33px;
          }
          .post-tags {
            flex-direction: column;
            align-items: center;
            margin-bottom: 50px;
          }
          .post-tags > div {
            margin-bottom: 10px;
          }
        }

        @media all and (max-width: 767px) {
          h2 {
            font-size: 55px;
            margin-top: 50px;
          }

          .carousel-container {
            width: 90%;
            flex-direction: column;
          }

          .latest-post-card {
            width: 100%;
            margin: 0 0 80px;
          }

          .latest-post-card > hr {
            margin: 5px 0 16px;
          }
          .post-tags {
            flex-direction: column;
            align-items: center;
            margin-bottom: 50px;
            font-size: 15px;
          }
          .post-tags > div {
            margin-bottom: 0;
          }
          .post-excerpt {
            font-size: 18px;
          }
        }

        @media all and (max-width: 320px) {
          .post-tags {
            font-size: 15px;
          }
          .post-tags > div {
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PostCarousel;
