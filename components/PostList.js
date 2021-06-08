import Link from 'next/link';
import { watchTag } from '@/configs/config';

const PostList = (props) => {
  return (
    <>
      <div className="related-container">
        {props.post.map((rel) => (
          <div key={rel.id} className="related-post">
            <div className="thumb-column">
              {rel.tags.includes(watchTag) ? (
                <Link href={`/video/${rel.slug}`}>
                  <img className="related-image" src={rel.medium_featured_image_url} />
                </Link>
              ) : (
                <Link href={`/post/${rel.slug}`}>
                  <img className="related-image" src={rel.medium_featured_image_url} />
                </Link>
              )}

              <hr />
            </div>

            <div className="latest-post-excerpt">
              <div>
                {rel.post_tags.map((tag, i) =>
                  i === 0 ? (
                    <span key={`related-tag-${i}`} className="related-tags">
                      {tag.name}
                    </span>
                  ) : null
                )}{' '}
                <span className="tagseperator">|</span>{' '}
                {rel.post_categories.map((cat, i) => (
                  <Link
                    key={`related-cat-${i}`}
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
                    <a className="related-categories">
                      {cat.name}
                      {i == rel.post_categories.length - 1 ? null : `, `}
                    </a>
                  </Link>
                ))}
              </div>
              {rel.tags.includes(watchTag) ? (
                <Link href={`/video/${rel.slug}`}>
                  <h2 dangerouslySetInnerHTML={{ __html: rel.title.rendered }} />
                </Link>
              ) : (
                <Link href={`/post/${rel.slug}`}>
                  <h2 dangerouslySetInnerHTML={{ __html: rel.title.rendered }} />
                </Link>
              )}

              {rel.acf.adv_excerpt ? (
                rel.tags.includes(watchTag) ? (
                  <Link href={`/video/${rel.slug}`}>
                    <a
                      className="related-excerpt"
                      dangerouslySetInnerHTML={{
                        __html: rel.acf.adv_excerpt
                      }}
                    />
                  </Link>
                ) : (
                  <Link href={`/post/${rel.slug}`}>
                    <a
                      className="related-excerpt"
                      dangerouslySetInnerHTML={{
                        __html: rel.acf.adv_excerpt
                      }}
                    />
                  </Link>
                )
              ) : rel.tags.includes(watchTag) ? (
                <Link href={`/video/${rel.slug}`}>
                  <a
                    className="related-excerpt"
                    dangerouslySetInnerHTML={{
                      __html: rel.excerpt.rendered
                    }}
                  />
                </Link>
              ) : (
                <Link href={`/post/${rel.slug}`}>
                  <a
                    className="related-excerpt"
                    dangerouslySetInnerHTML={{
                      __html: rel.excerpt.rendered
                    }}
                  />
                </Link>
              )}
            </div>
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

        a {
          font-family: 'Poly', serif;
          font-size: 19px;
          line-height: 25px;
          color: #000;
        }

        .thumb-column {
          margin-right: 30px;
        }

        .related-image {
          width: 300px;
          height: auto;
        }

        .related-container {
          display: flex;
          flex-direction: column;
        }

        .related-post {
          display: flex;
          margin-bottom: 40px;
        }

        .related-post img {
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

        h2,
        h4 {
          margin: 0;
        }

        h2 {
          margin: 5px 0 5px -2px;
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

        .related-excerpt {
          font-size: 20px;
          line-height: 30px;
          text-decoration: none;
          color: #000;
          margin: 0;
        }

        .related-post hr {
          margin: 0 30px 15px 0;
        }

        hr {
          border-style: solid;
          border-width: 3px;
          margin-right: 30px;
          width: 100%;
          box-sizing: border-box;
        }

        .related-post:nth-child(odd) > div:first-child > hr {
          border-color: #daa466;
        }

        .related-post:nth-child(even) > div:first-child > hr {
          border-color: #cc7510;
        }

        .related-tags {
          font-size: 15px;
          line-height: 15px;
          text-transform: uppercase;
          font-family: 'Catamaran', sans-serif;
          font-weight: 600;
        }

        .related-categories {
          color: #bf8844;
          font-size: 15px;
          line-height: 15px;
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

        @media all and (min-width: 768px) and (max-width: 1024px) {
          .related-container {
            width: 90%;
            margin: 0 auto;
          }
        }

        @media all and (max-width: 767px) {
          h1 {
            text-align: center;
          }

          .thumb-column {
            margin-right: 0;
          }

          h2 {
            margin: 5px 0;
            font-size: 36px;
            line-height: 36px;
            font-weight: 800;
          }

          .related-post {
            flex-direction: column;
            margin-bottom: 80px;
          }

          .related-post:last-child {
            margin-bottom: 40px;
          }

          .related-post hr {
            margin: 1px 0 15px;
          }

          hr {
            margin-right: 0;
          }

          .related-container {
            width: 90%;
            margin: 0 auto;
          }

          .related-excerpt {
            margin: 0;
            font-size: 18px;
          }

          .related-image {
            width: 100%;
            margin-right: 0;
          }

          .categories-link {
            font-size: 15px;
            line-height: 15px;
            color: #bf8844;
            text-transform: uppercase;
            font-family: 'Catamaran', sans-serif;
            font-weight: 600;
          }

          a {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
};

export default PostList;
