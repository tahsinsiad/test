import styled from '@emotion/styled';
import Link from 'next/link';
import PostTitle from './core/LatestOfCategoryTitle';
import PostExcerpt from './core/PostExcerpt';
import PostMeta from './core/PostMeta';
import PostDate from './core/PostDate';
export default function PostColumnListing({ posts }) {
  posts = posts.slice(0, 3);
  return (
    <PostContainer>
      {posts.map((post) => (
        <Post key={post.id}>
          <Link href={`/post/${post.slug}`}>
            <a>
              <img src={post.medium_featured_image_url} />
            </a>
          </Link>
          <PostMeta tags={post.post_tags} cats={post.post_categories} />

          <Link href={`/post/${post.slug}`}>
            <a>
              <PostTitle title={post.title.rendered} />
              {post.wps_subtitle ? (
                <SubTitle dangerouslySetInnerHTML={{ __html: post.wps_subtitle }} />
              ) : null}
            </a>
          </Link>
          <PostExcerpt
            isPrimary
            isHero
            fontSize="17px"
            excerpt={post.excerpt.rendered}
            acf={post.acf}
          />

          <PostDate date={post.date} />
        </Post>
      ))}
    </PostContainer>
  );
}

const Category = styled.h4`
  text-transform: uppercase;
  background: ${(props) => props.bgColor};
  padding: 5px 15px;
  color: #fff;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media only screen and (-webkit-min-device-pixel-ratio: 2) and (max-device-height: 1366px) and (min-device-width: 1024px) and (orientation: portrait) {
    width: 940px;
    margin: 0 auto;
  }

  @media only screen and (-webkit-min-device-pixel-ratio: 2) and (max-device-height: 1366px) and (min-device-width: 1024px) and (orientation: landscape) {
    width: 970px;
    margin: 0 auto;
  }
`;

const Post = styled.div`
  width: 300px;

  h4 {
    margin: 5px 0;
    font-size: 24px;
    font-weight: 700;
    font-family: ${(props) => props.theme.font.primary};
  }

  img {
    width: 300px;
    margin-bottom: 0;
  }

  a > h2 {
    margin: 15px 0;
    color: #000;

    &:hover {
      text-decoration: underline;
    }
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 40px;
    img {
      width: 100%;
    }
  }

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    width: 31%;
    img {
      width: 100%;
    }
  }
`;

const SubTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  font-family: ${(props) => props.theme.font.primary};
  line-height: 20px;
  margin: -15px 0 0;
  padding-bottom: 15px;
  color: #000;
  @media only screen and (max-width: 768px) {
    margin: -10px 0 15px;
    font-size: 22px;
    line-height: 22px;
  }
`;
