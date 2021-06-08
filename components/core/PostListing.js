import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';
import { Icon, Pagination } from 'semantic-ui-react';
import PostExcerpt from '@/components/core/PostExcerpt';
import PostTitle from '@/components/core/PostTitle';
import Divider from './Divider';
import PostMeta from './PostMeta';
import PostDate from './PostDate';

export default function PostListing({
  posts,
  withPagination,
  isHome = false,
  margin = '0',
  viewmore = false,
  postsPerPage = 1000000
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // const paginate = (pageNumber) => setCurrentPage(pagenumber);
  const onChange = (e, pageInfo) => {
    console.log(pageInfo);
    setCurrentPage(pageInfo.activePage);
  };
  return (
    <>
      <Posts margin={margin}>
        {currentPosts.map((post, i, arr) => (
          <PostItem key={post.id}>
            <Post key={post.id}>
              <PostLeft>
                <Link href={`/post/${post.slug}`}>
                  <a>
                    <img src={post.medium_featured_image_url} />
                  </a>
                </Link>
              </PostLeft>
              <PostRight>
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
                  excerpt={post.excerpt.rendered}
                  isHome={isHome}
                  acf={post.acf}
                />
                <PostDate date={post.date} />
              </PostRight>
            </Post>
            <PostBottom>
              <PostExcerpt
                excerpt={post.excerpt.rendered}
                isHome={isHome}
                acf={post.acf}
                mobileFontSize="16px"
              />
            </PostBottom>
            {arr.length - 1 !== i ? (
              <Divider color="#E0E0E0" />
            ) : (
              <>
                <Divider color="#E0E0E0" style={{ margin: '2rem 0 0' }} />
                {viewmore && (
                  <Link
                    href={`/research-pillars/${post.post_categories[0].name.toLowerCase()}/${post.post_tags[0].name.toLowerCase()}`}>
                    <a>View more</a>
                  </Link>
                )}
              </>
            )}
          </PostItem>
        ))}
      </Posts>

      {withPagination && (
        <PaginationContainer>
          <Pagination
            activePage={currentPage}
            firstItem={indexOfFirstPost}
            lastItem={indexOfLastPost}
            pointing
            secondary
            totalPages={totalPages}
            ellipsisItem={{
              content: <Icon name="ellipsis horizontal" />,
              icon: true
            }}
            firstItem={{
              content: <Icon name="angle double left" />,
              icon: true
            }}
            lastItem={{
              content: <Icon name="angle double right" />,
              icon: true
            }}
            boundaryRange={0}
            siblingRange={1}
            prevItem={null}
            nextItem={null}
            onPageChange={onChange}
          />
        </PaginationContainer>
      )}
    </>
  );
}

const PostItem = styled.div`
  width: 100%;
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    width: 100%;
  }

  @media only screen and (max-width: 1280px) and (min-width: 1024px) {
    width: 940px;
  }
`;

const Posts = styled.div`
  display: flex;
  margin: ${(props) => props.margin};
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 768px) {
  }
`;

const Post = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    // flex-direction: column;
  }
`;
const PostBottom = styled.div``;
const PostLeft = styled.div`
  width: 300px;
  img {
    width: 300px;
  }
  @media only screen and (max-width: 768px) {
    width: 40%;
    img {
      width: 100%;
    }
  }
`;

const PostRight = styled.div`
  width: 653px;
  a > h2 {
    margin: 15px 0;
    color: #000;

    &:hover {
      text-decoration: underline;
    }
  }
  @media only screen and (max-width: 768px) {
    width: 57%;
    a > h2 {
      margin: 5px 0;
    }
  }
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    margin-left: 25px;
  }
  @media only screen and (max-width: 1280px) and (min-width: 1024px) {
    width: 66%;
  }
`;

const PaginationContainer = styled.div`
  text-align: center;
  padding: 50px 0 0;
  .ui.secondary.pointing.menu {
    border-bottom: 0 !important;
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
    margin: 0 0 15px;
    font-size: 16px;
    line-height: 16px;
  }
`;
