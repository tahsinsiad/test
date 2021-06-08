import styled from '@emotion/styled';
import axios from 'axios';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Container from '@/components/core/Container';
import Divider from '@/components/core/Divider';
import PostListing from '@/components/core/PostListing';
import PostMeta from '@/components/core/PostMeta';
import SocialShare from '@/components/SocialShare';
import parse from 'html-react-parser';
import { NextSeo } from 'next-seo';

import { hiddenCategories, publicPostCategories } from '@/configs/config';

const { REST_PATH } = process.env;

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

export default function Post({ post, relatedPost, preview }) {
  let [hasPermission, setPermission] = useState(true);

  const handleGivePermission = (e) => {
    e.preventDefault();

    if (e.target.elements.passToView.value == process.env.preview_password) {
      setPermission(true);
    } else {
      Swal.fire({
        title: 'Sorry!',
        text: "You don't have access to this post",
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  const router = useRouter();
  if (router.isFallback) {
    // your loading indicator
    return <ArticleContainer>loading...</ArticleContainer>;
  }

  return hasPermission ? (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          url: 'https://www.example.com/page',
          title: `${
            post.title
              ? post.title.rendered + ' | The Centre'
              : 'The Centre | A Malaysian think-tank dedicated to centrist thought'
          } `,
          description: post.title.rendered,
          images: [
            {
              url: post.featured_image_url,
              width: 1280,
              height: 768,
              alt: post.title.rendered
            }
          ]
        }}
      />
      <ArticleContainer>
        <PostMeta
          margin="0 0 10px"
          fontSize="14px"
          tags={post.post_tags}
          cats={post.post_categories}
        />
        <FeaturedImage src={post.featured_image_url} />

        <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        {post.wps_subtitle ? (
          <SubTitle dangerouslySetInnerHTML={{ __html: post.wps_subtitle }} />
        ) : null}

        {post.acf.adv_excerpt ? (
          <Excerpt
            dangerouslySetInnerHTML={{
              __html: post.acf.adv_excerpt
            }}
          />
        ) : (
          <Excerpt
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered
            }}
          />
        )}
        <Byline>
          <span>By {post.acf.authors ? parse(post.acf.authors) : post.post_author}</span>
          <span style={{ display: 'block' }}>
            {`${new Date(post.date).getUTCDate()} ${
              monthNames[new Date(post.date).getUTCMonth()]
            } ${new Date(post.date).getUTCFullYear()}`}
          </span>
        </Byline>
        <Divider color="#E0E0E0" />
        {post.acf.has_link ? (
          <ExternalLink
            bgColor={post.acf.link_background_color}
            color={post.acf.label_color}
            href={
              post.acf.link_location === 'internal'
                ? `/post/${post.acf.link_articles.post_name}`
                : post.acf.link_external
            }>
            {post.acf.link_label}
          </ExternalLink>
        ) : null}

        <Content
          className="content"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&#8221;/g, '"')
              .replace(/&#8220;/g, '"')
              .replace(' </ iframe', '</iframe')
          }}
        />

        <SocialShare url={post.slug} />
      </ArticleContainer>
      <Container>
        <Divider color="#E0E0E0" />

        {relatedPost.length > 0 ? (
          <>
            <div className="related-section-container">
              <RelatedTitle>Related Articles</RelatedTitle>

              <PostListing posts={relatedPost} />
            </div>
          </>
        ) : null}
      </Container>
    </>
  ) : (
    <Container>
      <form onSubmit={handleGivePermission}>
        <input name="passToView"></input>
        <button>Access</button>
      </form>
    </Container>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const slug = params.slug;
  // get current post data
  const singlePost = await axios.get(`${REST_PATH}posts?slug=${slug}`).then((res) => res.data);
  const post = singlePost[0];

  // get single/current post tags id only in string format

  if (post.tags !== undefined) {
    if (post.tags.length == 1) {
      var postTagsIds = post.tags[0];
    } else if (post.tags.length > 1) {
      var postTagsIds = post.tags.join(',');
    } else {
      var postTagsIds = '';
    }
  } else {
    var postTagsIds = '';
  }

  // get only current tag id without primary tags id
  const noPrimaryPostTagsId = _.map(
    _.filter(post.post_tags, (t) => !t.primary),
    (t) => t.term_id
  );

  // get any related post based on current post tag id
  const getRelatedPost = await axios
    .get(`${REST_PATH}posts?tags=${postTagsIds}`)
    .then((res) => res.data);

  // get all related post data exclude current post
  const allRelatedPost = _.filter(getRelatedPost, (r) => r.id !== post.id);

  // get related post which has at least 2 same tags with current current post tags
  const crossTagRelatedPost = allRelatedPost.filter(
    (r) =>
      noPrimaryPostTagsId.filter(
        (t) => r.tags.includes(t) && !r.categories.includes(hiddenCategories)
      ).length >= 2
  );

  // get only 3 related post and shuffle the result
  const relatedPost = _.slice(_.shuffle(crossTagRelatedPost), 0, 3);

  const previewPost = post.post_categories.findIndex((c) => c.term_id == 31);

  let isNotPreview = true;

  if (previewPost != -1) {
    isNotPreview = false;
  }

  return {
    props: {
      post,
      relatedPost,
      isNotPreview
    },
    revalidate: 300
  };
}

export async function getStaticPaths() {
  const res = await axios
    .get(`${REST_PATH}posts?categories=${publicPostCategories}`)
    .then((res) => res.data);
  const allPosts = res;

  return {
    paths: allPosts.map((post) => `/post/${post.slug}`) || [],
    fallback: 'blocking'
  };

  // return {
  //   paths: [],
  //   fallback: true
  // };
}

const ArticleContainer = styled.div`
  @media only screen and (min-width: 1200px) {
    width: 772px;
    margin: 0 auto;
    ${(props) => (props.textcenter ? 'text-align: center;' : null)}
  }

  @media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    width: 772px;
    margin: 0 auto;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    width: 772px;
    margin: 0 auto;
  }

  @media only screen and (max-width: 768px) {
    width: 100vw;
    padding: 0 1em;
  }
`;

const Title = styled.h1`
  font-size: 46px;
  font-weight: 700;
  font-family: ${(props) => props.theme.font.primary};
  line-height: 48px;
  margin: 30px 0;
  @media only screen and (max-width: 768px) {
    margin: 15px 0;
    font-size: 36px;
    line-height: 36px;
  }
`;

const SubTitle = styled.h2`
  font-size: 34px;
  font-weight: 600;
  font-family: ${(props) => props.theme.font.primary};
  line-height: 36px;
  margin: -20px 0 30px;
  @media only screen and (max-width: 768px) {
    margin: -10px 0 15px;
    font-size: 32px;
    line-height: 32px;
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  margin: 10px 0 0;
`;

const ExternalLink = styled.a`
  background: ${(props) => props.bgColor};
  padding: 0 5px;
  color: ${(props) => props.color};
  font-size: 11px;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.font.primary};
  font-weight: 700;
  margin: 0;
  display: inline-block;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const RelatedTitle = styled.h2`
  font-size: 34px;
  line-height: 32px;
  font-weight: 700;
  font-family: ${(props) => props.theme.font.primary};
  margin: 40px 0 !important;
`;
const Excerpt = styled.div`
  p {
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 21px;
    font-weight: 400;
    line-height: 30px;
  }
`;

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
    font-size: 42px;
    line-height: 46px;
    margin-top: 40px;
  }

  h3 {
    margin-top: 40px;
    font-size: 32px;
    line-height: 36px;
  }

  table {
    font-family: ${(props) => props.theme.font.primary};
    font-size: 19px;
    font-weight: 400;
    line-height: 32px;
  }

  h4 {
    margin-top: 24px;
    font-size: 22px;
    line-height: 30px;
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
    padding-inline-start: 20px;
    a {
      text-decoration: underline;
      color: #000;
    }
  }

  p.tc-notes {
    background: #efefef;
    padding: 40px;
    position: relative;
    font-family: ${(props) => props.theme.font.primary};

    strong {
      font-family: ${(props) => props.theme.font.primary}!important;
    }

    img {
      width: 100% !important;
      margin-bottom: 10px;
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background: #efefef;
      bottom: -8px;
      left: 0;
      margin: 0;
    }
  }

  p.tc-questions {
    background: #efefef;
    padding: 40px;
    position: relative;
    font-family: ${(props) => props.theme.font.secondary};

    strong {
      font-family: ${(props) => props.theme.font.secondary}!important;
    }

    img {
      width: 100% !important;
      margin-bottom: 10px;
    }
  }

  blockquote {
    p {
      font-family: ${(props) => props.theme.font.primary};
      font-size: 28px;
      line-height: 41px;
      font-style: italic;
      display: block;
      width: 100%;
      margin: 40px auto;
      background: #efefef;
      padding: 40px 80px;
      position: relative;
    }

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background: #000;
      bottom: 100%;
      left: 0;
      margin: 0px 0px 5px;
    }
  }

  figure {
    margin: 0 0 30px !important;

    img {
      width: 100%;
      height: auto;
    }
  }

  iframe {
    width: 100% !important;
  }

  figcaption {
    font-family: ${(props) => props.theme.font.secondary};
    color: #5f5f5f;
    font-size: 16px;
    line-height: 21px;
    font-style: italic;
  }

  a {
    color: #000;

    &::hover {
      text-decoration: underline;
    }
  }

  @media only screen and (max-width: 768px) {
    p {
      font-size: 18px;
      line-height: 30px;
    }
    h2 {
      margin-top: 72px;
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
    figcaption {
      font-size: 14px;
      line-height: 17px;
    }
    ul {
      font-size: 18px;
      line-height: 30px;
    }
  }
`;

const Byline = styled.p`
  font-family: ${(props) => props.theme.font.primary};
  font-weight: 700;
  font-size: 18px;
  margin: 20px 0;
  line-height: 22px;
`;
