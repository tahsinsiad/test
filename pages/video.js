import { withRouter } from 'next/router';
import { Embed } from 'semantic-ui-react';
import CategoriesListing from '@/components/CategoriesListing';
import Layout from '@/components/core/Layout';
import PostList from '@/components/PostList';
import SocialShare from '@/components/SocialShare';
import Subscribe from '@/components/Subscribe';
import TagListing from '@/components/TagListing';
import { base } from '../configs/config';
import { getSingleVideoData as singleVideoData } from '../utils/api';

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

const Video = (props) => {
  const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const yt_id = props.post.acf.youtube_link.match(VID_REGEX)[1];

  return (
    <Layout title={props.post.title.rendered}>
      <div className="post-heading-container">
        <h4>
          {props.primaryTag.length > 0 ? (
            <>
              <TagListing tags={props.primaryTag} />
              <span className="tagseperator">|</span>{' '}
            </>
          ) : null}

          <CategoriesListing categories={props.post.post_categories} postLink={props.postLink} />
        </h4>
        <h1 dangerouslySetInnerHTML={{ __html: props.post.title.rendered }} />

        {props.post.wps_subtitle ? (
          <h2 dangerouslySetInnerHTML={{ __html: props.post.wps_subtitle }} />
        ) : null}

        {props.post.acf.adv_excerpt ? (
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: props.post.acf.adv_excerpt
            }}
          />
        ) : (
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: props.post.excerpt.rendered
            }}
          />
        )}

        <p className="author">
          {' '}
          By <span style={{ fontStyle: 'italic' }}>{props.post.post_author}</span> |{' '}
          <span className="text" style={{ fontStyle: 'italic' }}>{`${new Date(
            props.post.date
          ).getUTCDate()} ${monthNames[new Date(props.post.date).getUTCMonth()]} ${new Date(
            props.post.date
          ).getUTCFullYear()}`}</span>
        </p>
      </div>
      <hr style={{ borderStyle: 'solid' }} />
      <div className="content-body">
        <div className="content-container">
          <Embed
            className="singleVideo"
            id={yt_id}
            placeholder={
              props.post.featured_image_url
                ? props.post.featured_image_url
                : `${base}/images/home-featured-image.jpg`
            }
            source="youtube"
            brandedUI
            color="white"
            hd={false}
          />
        </div>
      </div>

      <SocialShare url={props.post.slug} />
      <hr />
      {props.relatedPost.length > 0 ? (
        <>
          <div className="related-section-container">
            <h2 className="article-related-title">Related Articles</h2>
            <PostList post={props.relatedPost} postLink={props.postLink} />
          </div>
          <hr />
        </>
      ) : null}

      <Subscribe />
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Catamaran", sans-serif !important;
          font-weight: 700;
        }
        a,
        p,
        .content {
          font-family: "Poly", serif;
        }

        .content {
          width: 800px;
        }

        .content p {
          font-size: 70px;
        }

        a {
          font-size: 70px;
        }

        .content-container {
          display: flex;
          width: 90%;
          margin: auto;
          position: relative;
        }

        .content-body img {
          width: 100%;
        }

        .content-body {
          justify-content: flex-end;
        }

        .post-heading-container > h4 {
          margin: 0;
          border-left: 5px solid #daa466;
          padding-left: 13px;
          height: 20px;
          padding-top: 3px;
        }

        .post-heading-container > h1 {
          font-size: 55px;
          line-height: 65px!important;
          margin: 0 0 0 -4px;
          font-weight: 800;
          z-index: -1;
          position: relative;
        }

        h2 {
          font-size: 30px;
          margin: 0 0 10px;
          line-height: 30px;
        }

        hr {
          margin: 20px auto 50px;
          border-style: solid;
          border-color: rgb(196, 190, 190);
        }

        .post-heading-container {
          width: 950px;
          margin: 50px auto 50px 0;
        }

        div.content {
          font-size: 20px;
          line-height: 30px;
          margin: 0 auto;
        }

        .wp-block-image > img {
          width: 100% !important;
        }

        .date {
          font-family: "PT Serif", serif;
          font-size: 20px;
          text-decoration: "italic";
          margin: 0;
        }

        .author {
          font-family: "PT Serif", serif;
          font-size: 20px;
          margin: 30px 0 0;
          text-transform: capitalize;
        }

        div.content {
          width: 800px;
        }

        img {
          width: 100%;
        }
        .text {
          font-family: "Poly", sans-serif;
          font-size: 20px;
          line-height: 30px;
          margin-top: 10px;
        }
        .tagseperator {
          color: #bf8844;
          margin: 0 10px;
          height: 20px;
          line-height: 20px;
          font-size: 20px;
        }

        .post-sidebar {
          width: 250px;
          margin-left: 20px;
          padding-top: 600px;
        }

        .post-sidebar hr {
          border-color: #cc7510;
          border-width: 5px;
          margin: 0 0 5px;
        }

        .sidebar-content {
          background-color: #f4f2ed;
          padding: 20px;
          height: 100%;
        }

        .article-related-title {
          margin-bottom: 30px;
        }

        @media all and (min-width: 768px) and (max-width: 1024px) {
          .post-heading-container {
            font-size: 20px;
            line-height: 30px;
            width: 90%;
            margin: 30px auto 0;
          }

          div.content {
              width: 100%;
            }
          .content-body {
            width: 90%;
            margin: 0 auto;
          }

          h1 {
            line-height: 55px;
            margin: 10px 0 20px;
          }
          .content-container {
            width: 100%;
          }

          hr {
            width: 90%;
          }

          .related-section-container {
            width: 90%;
            margin: 0 auto;
          }

       }

          @media all and (max-width: 767px) {
            .post-heading-container {
              font-size: 20px;
              line-height: 30px;
              width: 90%;
              margin: 30px auto 0;
            }

            .content-body {
              width: 90%;
              margin: 0 auto;
            }

            .content-container {
              width: 100%;
            }

            .post-sidebar {
              display: none
            }

            div.content {
              width: 100%;
            }

            h1 {
              font-size: 35px;
              line-height: 35px;
              margin: 5px 0 20px;
              hyphens: auto;
            }

            h2 {
              font-size: 25px;
              line-height: 25px;
            }

            h4 {
              margin-left: unset;
              height: 15px;
              padding-top: 0;
            }

            div.content img {
              width: 100%;
            }

            hr {
              margin: 25px auto;
              width: 90%;
            }

            .text > p {
              margin: 0;
            }

            .tagseperator {
              line-height: 15px;
              font-size: 15px;
            }

            .article-related-title {
              text-align: center;
            }
            .related-section-container {
            width: 90%;
            margin: 0 auto;
          }
          .text {

            font-size: 18px;
            line-height: 28px;
          }
          }
        }
      `}</style>
    </Layout>
  );
};

Video.getInitialProps = singleVideoData;

export default withRouter(Video);
