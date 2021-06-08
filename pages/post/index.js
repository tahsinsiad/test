import axios from 'axios';
import Container from '@/components/core/Container';
import PageTitle from '@/components/core/PageTitle';
import PostListing from '@/components/core/PostListing';
import { postPerPage, publicPostCategories } from '@/configs/config';

const { REST_PATH } = process.env;

export default function Latest({ posts }) {
  return (
    <>
      <PageTitle>ALL PUBLICATIONS</PageTitle>
      <Container>
        <PostListing
          posts={posts}
          isHome={false}
          withPagination
          postsPerPage={10}
        />
      </Container>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const posts = await axios.get(
    `${REST_PATH}posts?categories=${publicPostCategories}&per_page=${postPerPage}`,
  );
  const postsData = await posts.data;

  // console.log(posts);
  return {
    props: {
      posts: postsData,
      //   totalPosts: posts.headers["X-WP-Total"],
      //   totalPages: posts.headers["X-WP-TotalPages"],
    },
    revalidate: 300,
  };
}
