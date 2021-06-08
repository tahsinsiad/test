import Container from '@/components/core/Container';
import PageSectionHeading from '@/components/core/PageSectionHeading';
import PostListing from '@/components/core/PostListing';
import TopicPageTitle from '@/components/core/TopicPageTitle';
import { watchTag } from '@/configs/config';
import styled from '@emotion/styled';
import axios from 'axios';
import _ from 'lodash';
import Link from 'next/link';

const { REST_PATH } = process.env;

export default function ResearchPillars({ tags, name, desc, dataLength, color }) {
  return (
    <>
      <Container>
        <TopicPageTitle title={name} desc={desc} color={color} />

        {dataLength < 1 ? (
          <div>
            <h2 className="notfound">We'll be exploring these topics in future, stay tuned</h2>
          </div>
        ) : null}

        {tags.map((tag, i) => (
          <React.Fragment key={i}>
            {tag.posts.length < 1 ? null : (
              <>
                <TopicBodyInner>
                  <PageSectionHeading
                    title={tag.name}
                    desc={tag.description ? tag.description : null}
                  />

                  <PostListing posts={tag.posts.slice(0, 4)} margin="0 0 45px" />
                  <div
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Link
                      href={`/research-pillars/${name
                        .replace(' ', '-')
                        .toLowerCase()}/${tag.name.replace(' ', '-').toLowerCase()}`}>
                      <span
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center'
                        }}>
                        <InternalLink fontSize="19px">View more</InternalLink>
                        <i style={{ marginLeft: '10px' }} className="chevron right icon"></i>
                      </span>
                    </Link>
                  </div>
                </TopicBodyInner>
              </>
            )}
          </React.Fragment>
        ))}
      </Container>
    </>
  );
}

const TopicBodyInner = styled.div``;

const InternalLink = styled.a`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '21px')};
  line-height: 25px;
  font-family: ${(props) => props.theme.font.secondary};
  font-style: italic;
  font-weight: 700;
  text-align: center;
  color: ${(props) => (props.color ? props.color : '#000')};
  display: inherit;

  &:hover {
    text-decoration: underline;
    color: ${(props) => (props.hoverColor ? props.hoverColor + '!important' : '#000')};
    cursor: pointer;
  }
`;

export async function getStaticProps({ params, preview = false, previewData }) {
  let name = params.name;
  let desc = params.desc;
  let getPost = params.getPost;
  const slug = params.slug;

  const postLink = `${REST_PATH}posts?categories=`;

  const category = await axios
    .get(`${REST_PATH}categories?slug=${slug}`)
    .then((res) => _.head(res.data));

  const color = category.acf.color;

  if (getPost === undefined) getPost = postLink + category.id;

  const getVideos = `${REST_PATH}videos?categories=` + category.id;

  let result = await Promise.all([
    axios
      .get(getPost)
      .then((res) => res.data)
      .catch((error) => console.error(error)),
    axios
      .get(getVideos)
      .then((res) => res.data)
      .catch((error) => console.error(error)),
    axios
      .get(`${REST_PATH}tags`)
      .then((res) => res.data)
      .catch((error) => console.error(error)),
    axios
      .get(`${REST_PATH}tags/${watchTag}`)
      .then((res) => res.data)
      .catch((error) => console.error(error))
  ]);

  let [data, videoData, allTags, videoTag] = result;

  let tags =
    allTags.filter((t) => {
      return t.acf.tag_primary;
    }) || [];

  if (videoTag) {
    tags.push(videoTag);
  }

  if (videoData) {
    data = data.concat(videoData);
  }

  if (name == undefined) name = category.name;

  if (desc == undefined) desc = category.description;

  tags.forEach((t, i) => {
    tags[i]['posts'] = [];
    data.forEach((d) => {
      if (d.tags.includes(t.id)) {
        tags[i]['posts'].push(d);
      }
    });
  });

  const dataLength = data.length;

  // console.log(tags);

  return {
    props: {
      tags: tags,
      name: name,
      desc: desc,
      dataLength: dataLength,
      topicTitle: category.name,
      color
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      '/research-pillars/safety-nets',
      '/research-pillars/societal-contracts',
      '/research-pillars/public-goods',
      '/research-pillars/others'
    ],
    fallback: false
  };
}
