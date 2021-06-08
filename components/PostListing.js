import Link from 'next/link';

const PostListing = (props) => {
  return (
    <>
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

        a {
          font-family: 'Poly', serif;
          font-size: 19px;
          line-height: 25px;
          color: #000;
        }

        .post-list-image {
          width: 100%;
          height: auto;
        }

        .listing-container {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }

        .post-list {
          display: flex;
          flex-direction: column;
          width: 31%;
          margin-right: 3.5%;
          margin-bottom: 80px;
        }

        .post-list:nth-child(3n + 3) {
          margin-right: 0;
        }

        .post-list img {
          cursor: pointer;
        }

        a.categories-link {
          font-size: 15px;
          color: #bf8844;
          text-transform: uppercase;
          font-family: 'Catamaran', sans-serif;
          font-weight: 600;
          text-decoration: none;
        }
        .listing-tags {
          font-size: 15px;
          line-height: 15px;
          text-transform: uppercase;
          font-family: 'Catamaran', sans-serif;
          font-weight: 600;
        }

        .listing-categories {
          color: #bf8844;
          font-size: 15px;
          line-height: 15px;
          text-transform: uppercase;
          font-family: 'Catamaran', sans-serif;
          font-weight: 600;
        }

        h2,
        h4 {
          margin: 0;
        }

        h2 {
          margin: 5px 0 20px;
          font-size: 36px;
          line-height: 36px;
          font-weight: 800;
          cursor: pointer;
        }

        h2:hover {
          text-decoration: underline;
        }

        .latest-post-excerpt {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .listing-excerpt {
          font-family: 'Poly', serif;
          font-size: 20px;
          line-height: 28px;
          -webkit-text-decoration: none;
          text-decoration: none;
          color: #000;
          margin-bottom: 25px;
        }

        .post-list hr {
          margin: 0 0 10px;
        }

        hr {
          border-style: solid;
          border-width: 3px;
          margin-right: 30px;
        }

        .post-list:nth-child(odd) > div:first-child > hr {
          border-color: #daa466;
        }

        .post-list:nth-child(even) > div:first-child > hr {
          border-color: #cc7510;
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
          .listing-container {
            width: 90%;
            margin: 0 auto;
          }
        }

        @media all and (max-width: 767px) {
          h1 {
            text-align: center;
          }

          h2 {
            margin: 5px 0 20px;
            font-size: 36px;
            line-height: 36px;
            font-weight: 800;
          }

          .post-list {
            flex-direction: column;
            margin-bottom: 80px;
          }

          .post-list:last-child {
            margin-bottom: 40px;
          }

          .post-list hr {
            margin: 1px 0 15px;
          }

          hr {
            margin-right: 0;
          }

          .listing-container {
            width: 90%;
            margin: 0 auto;
          }

          .listing-excerpt {
            margin: 0;
            font-size: 18px;
          }

          .post-list-image {
            width: 100%;
          }

          .categories-link {
            font-size: 15px;
            line-height: 15px;
            color: #bf8844;
            text-transform: uppercase;
            font-family: 'Catamaran', sans-serif;
            font-weight: 600;
          }
        }
      `}</style>
      <div className="listing-container">
        {props.post.map((postList) => (
          <div key={postList.id} className="post-list">
            <div>
              <Link href={`/post/${postList.slug}`}>
                <a>
                  <img className="post-list-image" src={postList.medium_featured_image_url} />
                </a>
              </Link>
              <hr />
            </div>

            <div>
              {postList.post_tags.map((tag, i) =>
                i === 0 ? (
                  <span key={tag.id} className="listing-tags">
                    {tag.name}
                  </span>
                ) : null
              )}{' '}
              <span className="tagseperator">|</span>{' '}
              {postList.post_categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  as={`/topic/${cat.slug}`}
                  href={{
                    pathname: `topic`,
                    query: {
                      slug: cat.slug,
                      name: cat.name,
                      desc: cat.description,
                      getPost: props.postLink + cat.id
                    }
                  }}>
                  <a className="listing-categories">
                    {cat.name}
                    {i == postList.post_categories.length - 1 ? null : `, `}
                  </a>
                </Link>
              ))}
            </div>

            <div className="latest-post-excerpt">
              <Link href={`/post/${postList.slug}`}>
                <h2 dangerouslySetInnerHTML={{ __html: postList.title.rendered }} />
              </Link>

              {postList.acf.adv_excerpt ? (
                <div
                  className="listing-excerpt"
                  dangerouslySetInnerHTML={{
                    __html: postList.acf.adv_excerpt
                  }}
                />
              ) : (
                <div
                  className="listing-excerpt"
                  dangerouslySetInnerHTML={{
                    __html: postList.excerpt.rendered
                  }}
                />
              )}

              <Link as={`/post/${postList.slug}`} href={`/post?slug=${postList.slug}`}>
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
          </div>
        ))}
      </div>
    </>
  );
};

export default PostListing;
