import Link from 'next/link';

const Preview = (props) => {
  // console.log(props.posts.post_tags);
  // console.log(props.posts.post_categories);

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
          color: #ac7a3d !important;
          text-decoration: none;
        }

        .related-image {
          width: 300px;
          height: auto;
          margin-right: 30px;
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
          color: #000 !important;
          margin: 0;
        }

        .related-post hr {
          margin: 0 30px 15px 0;
        }

        hr {
          border-style: solid;
          border-width: 3px;
          margin-right: 30px;
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
      {props.posts.map((post) => (
        <div key={post.id} className="related-post">
          <div>
            <Link href={`/post/${post.slug}`}>
              {post.medium_featured_image_url ? (
                <img className="related-image" src={post.medium_featured_image_url} />
              ) : (
                <img
                  className="related-image"
                  src="https://www.centre.my/images/topic-detail-featured-image.jpg"
                />
              )}
            </Link>
            <hr />
          </div>

          <div className="latest-post-excerpt">
            <div>
              {post.post_tags !== undefined
                ? post.post_tags.map((tag, i) =>
                    i === 0 ? (
                      <span key={`related-tag-${i}`} className="related-tags">
                        {tag.name}
                      </span>
                    ) : null
                  )
                : 'Please add tag'}{' '}
              <span className="tagseperator">|</span>{' '}
              {post.post_categories !== undefined
                ? post.post_categories.map((cat, i) => (
                    // <Link
                    //   key={`related-cat-${i}`}
                    //   as={`/topic/${cat.slug}`}
                    //   href={{
                    //     pathname: `topic`,
                    //     query: {
                    //       slug: cat.slug,
                    //       name: cat.name,
                    //       desc: cat.description,
                    //       getPost: props.postLink + cat.id
                    //     }
                    //   }}
                    // >
                    <a key={`related-cat-${i}`} className="related-categories">
                      {cat.name}
                      {i == post.post_categories.length - 1 ? null : `, `}
                    </a>
                    // </Link>
                  ))
                : 'Please add category'}
            </div>
            <Link href={`/post/${post.slug}`}>
              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </Link>

            {post.acf.adv_excerpt ? (
              <Link href={`/post/${post.slug}`}>
                <a
                  className="related-excerpt"
                  dangerouslySetInnerHTML={{
                    __html: post.acf.adv_excerpt
                  }}
                />
              </Link>
            ) : (
              <Link href={`/post/${post.slug}`}>
                <a
                  className="related-excerpt"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered
                  }}
                />
              </Link>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Preview;
