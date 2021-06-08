import styled from '@emotion/styled';
import axios from 'axios';
import _ from 'lodash';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
import Container from '@/components/core/Container';
import Divider from '@/components/core/Divider';
import PostListing from '@/components/core/PostListing';
import SectionTitle from '@/components/core/SectionTitle';
import Hero from '@/components/Hero';
import PostColumnListing from '@/components/PostColumnListing';
import { etcetera, publicPostCategories } from '@/configs/config';
import Carousel from '@/components/Carousel';

const { REST_PATH } = process.env;

export default function Index({ post, featured, otherFeatured, et = null }) {
  const SEO = {
    title: 'The Centre | A Malaysian think-tank dedicated to centrist thought',
    description: 'A Malaysian think-tank dedicated to centrist thought'
  };
  return (
    <>
      <NextSeo {...SEO} />
      {featured ? <Hero hero={featured} /> : null}

      <Container>
        <PostColumnListing posts={otherFeatured} />
      </Container>
      <Divider hideOnMobile margin="30px 0 0" color="#777268" />
      <Container fluid background="#777268">
        <AboutContainer>
          <SectionTitle background="#777268" color="#fff">
            Who We Are
          </SectionTitle>

          <AboutText>
            The Centre is a centrist think tank based in Kuala Lumpur, Malaysia. Our work is focused
            on understanding the gaps between top-down policy decisions and ground-level impact
            through primary research. We aim to bring data-driven yet accessible research to
            policymakers and to the public.
          </AboutText>

          <Link href="/about">
            <InternalLink fontSize="19px" hoverColor="#fff">
              Learn more about us.
            </InternalLink>
          </Link>
        </AboutContainer>
      </Container>

      <Divider hideOnMobile margin="0 0 30px" color="#777268" />
      {post ? (
        <Container mobileMargin="30px auto 0">
          <SectionTitle background="trasparent" color="#000">
            Latest Publications
          </SectionTitle>
          <PostListing posts={post} isHome />
          <Link href="/post">
            <InternalLink>View all our publications.</InternalLink>
          </Link>
        </Container>
      ) : null}
      {et.length > 0 ? (
        <>
          <Divider />
          <SectionTitle background="trasparent" color="#000">
            EtCetera
          </SectionTitle>
          {et.length < 2 ? (
            <Hero hero={et} isEt />
          ) : (
            <Container className="etcetera">
              <Carousel post={et} />
            </Container>
          )}
        </>
      ) : null}
    </>
  );
}

export async function getStaticProps() {
  const result = await axios.get(`${REST_PATH}posts?categories=${publicPostCategories}`);

  let posts = await result.data;

  const featured = _.find(posts, (d) => d.sticky);

  const dataNoFeatured = _.filter(posts, (d) => d.id != featured.id);

  const et = _.filter(dataNoFeatured, (d) => d.tags.includes(etcetera)).slice(0, 5);

  if (typeof et !== 'undefined') {
    const et_ids = et.map((e) => e.id);
    const dataNoEt = _.filter(dataNoFeatured, (d) => !et_ids.includes(d.id));

    const pg = _.find(dataNoEt, (d) => d.categories.includes(43));
    const sc = _.find(dataNoEt, (d) => d.categories.includes(24));
    const sn = _.find(dataNoEt, (d) => d.categories.includes(30));
    const otherFeatured = [pg, sn, sc];

    const data = _.filter(dataNoEt, (d) => d.id != sn.id && d.id != pg.id && d.id != sc.id);

    return {
      props: {
        post: data.slice(0, 5),
        featured,
        otherFeatured,
        et
      },
      revalidate: 300
    };
  } else {
    const pg = _.find(dataNoFeatured, (d) => d.categories.includes(43));
    const sc = _.find(dataNoFeatured, (d) => d.categories.includes(24));
    const sn = _.find(dataNoFeatured, (d) => d.categories.includes(30));
    const otherFeatured = [pg, sn, sc];

    const data = _.filter(dataNoFeatured, (d) => d.id != sn.id && d.id != pg.id && d.id != sc.id);

    return {
      props: {
        post: data.slice(0, 5),
        featured,
        otherFeatured
      },
      revalidate: 300
    };
  }
}

const AboutText = styled.p`
  font-family: ${(props) => props.theme.font.primary};
  margin: 0;
  font-size: 21px;
  font-weight: 400;
  text-align: center;
  line-height: 30px;
  margin-bottom: 20px;

  a {
    color: #fff;

    &:hover {
      color: #dadada!important;
      text-decoration: underline;
    }
  }

  @media only screen and (max-width: 768px) {
    font-size: 18px;
    line-height: 26px;
`;

const InternalLink = styled.a`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '21px')};
  line-height: 25px;
  font-family: ${(props) => props.theme.font.secondary};
  font-style: italic;
  font-weight: 400;
  text-align: center;
  color: ${(props) => (props.color ? props.color : '#000')};
  display: inherit;
  margin: 30px;
  &:hover {
    text-decoration: underline;
    color: ${(props) => (props.hoverColor ? props.hoverColor + '!important' : '#000')};
    cursor: pointer;
  }
`;

const AboutContainer = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 20px 0;
  a {
    color: #fff;
  }

  @media only screen and (min-width: 1200px) {
    width: 970px;
    margin: 0 auto;
  }

  @media only screen and (max-width: 768px) {
    padding: 1em;
    width: 100%;
  }

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    width: 100%;
    margin: 0 auto;
    padding: 40px 0;
  }

  @media only screen and (max-width: 1388px) and (min-width: 1024px) {
    width: 940px;
  }
`;
