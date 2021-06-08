import {
  postPerPage,
  publicPostCategories,
  watchTag,
  hiddenCategories,
} from "../configs/config";
import axios from "axios";
import _ from "lodash";

const { REST_PATH } = process.env;

export const getHomeData = async function () {
  const result = await Promise.all([
    axios.get(`${REST_PATH}posts?categories=${publicPostCategories}`),
    axios.get(`${REST_PATH}categories?parent=0`),
    axios.get(`${REST_PATH}tags?parent=0`),
  ]);

  let [posts, categories, tags] = result;

  const featured = _.first(_.filter(posts.data, (d) => d.sticky));

  const stickyId = featured.id;

  const data = _.slice(
    _.filter(posts.data, (d) => d.id !== stickyId),
    0,
    6
  );

  tags = _.filter(tags.data, (d) => d.acf.tag_primary);

  const postLink = `${REST_PATH}posts?categories=`;

  return {
    data: data,
    featured: featured,
    categories: _.filter(categories.data, (d) => !d.acf.hidden_cat),
    postLink: postLink,
    tags: tags,
  };
};

export const getTopicData = async function () {
  const cat = await axios.get(`${REST_PATH}categories?parent=0`);
  let data = await cat.data;
  const postLink = `${REST_PATH}posts?categories=`;

  data = _.filter(data, (d) => !d.acf.hidden_cat);

  return {
    topics: data,
    postLink: postLink,
  };
};

export const getLatestPostData = async function (context) {
  const posts = await axios.get(
    `${REST_PATH}posts?categories=${publicPostCategories}&per_page=${postPerPage}`
  );
  const postsData = await posts.data;

  return {
    posts: postsData,
    totalPosts: posts.headers["x-wp-total"],
    totalPages: posts.headers["x-wp-totalpages"],
  };
};

export const getPreviewData = async function (context) {
  // const slug = context.query.slug;

  const posts = await axios.get(`${REST_PATH}posts?categories=31`);
  const postsData = await posts.data;

  return {
    posts: postsData,
  };
};

export const getPageData = async function (context) {
  const slug = context.query.slug;

  const res = await axios.get(`${REST_PATH}pages?slug=${slug}`);
  const data = await res.data;

  return {
    page: _.head(data),
  };
};

export const getSubTopicData = async function (context) {
  let name = context.query.name;
  let desc = context.query.desc;
  let getPost = context.query.getPost;
  const slug = context.query.slug;

  const postLink = `${REST_PATH}posts?categories=`;

  const category = await axios
    .get(`${REST_PATH}categories?slug=${slug}`)
    .then((res) => _.head(res.data));

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
      .catch((error) => console.error(error)),
  ]);

  let [data, videoData, allTags, videoTag] = result;

  let tags = allTags.filter((t) => {
    return t.acf.tag_primary;
  });

  if (videoTag) {
    tags.push(videoTag);
  }

  const myTags = [...tags];

  if (videoData) {
    data = data.concat(videoData);
  }

  if (name == undefined) name = category.name;

  if (desc == undefined) desc = category.description;

  tags.forEach((t, i) => {
    tags[i]["posts"] = [];
    data.forEach((d) => {
      if (d.tags.includes(t.id)) {
        tags[i]["posts"].push(d);
      }
    });
  });

  const dataLength = data.length;

  return {
    tags: tags,
    name: name,
    desc: desc,
    dataLength: dataLength,
    topicTitle: category.name,
  };
};

export const getTopicAllData = async function (context) {
  let topicSlug = context.query.topic,
    tagSlug = context.query.tag,
    topicTitle = context.query.topicTitle,
    tagTitle = context.query.tagTitle;

  let result = await Promise.all([
    axios
      .get(`${REST_PATH}categories?slug=${topicSlug}`)
      .then((res) => _.head(res.data)),
    axios
      .get(`${REST_PATH}tags?slug=${tagSlug}`)
      .then((res) => _.head(res.data)),
  ]);

  let [category, tag] = result;

  let posts = await axios
    .get(`${REST_PATH}posts?categories=${category.id}&tags=${tag.id}`)
    .then((res) => res.data);

  let videos = await axios
    .get(`${REST_PATH}videos?categories=${category.id}&tags=${tag.id}`)
    .then((res) => res.data);

  if (videos) {
    posts = posts.concat(videos);
  }

  if (topicTitle == undefined) topicTitle = category.name;

  if (tagTitle == undefined) tagTitle = tag.name;

  return {
    posts: posts,
    topicTitle: topicTitle,
    tagTitle: tagTitle,
  };
};

export const getAboutData = async function (context) {
  let lang = context.query.lang;

  if (lang == undefined) lang = "en";

  lang = lang.toLowerCase();

  const about = await axios.get(`${REST_PATH}pages?slug=about`);
  const aboutData = await about.data;

  const team = await axios.get(`${REST_PATH}team`);
  const teamData = await team.data;

  const teamGroup = await axios.get(`${REST_PATH}acf_team_group`);
  const teamGroupData = await teamGroup.data;

  teamGroupData.forEach((g, i) => {
    teamGroupData[i]["members"] = [];
    teamData.forEach((t) => {
      if (t.acf_team_group.includes(g.id)) {
        teamGroupData[i]["members"].push(t);
      }
    });
  });

  return {
    about: _.head(aboutData),
    teams: teamGroupData,
    lang,
  };
};

export const getSinglePostData = async function (context) {
  const slug = context.query.slug;

  // get current post data
  const singlePost = await axios
    .get(`${REST_PATH}posts?slug=${slug}`)
    .then((res) => res.data);
  const post = _.head(singlePost);

  if (post === undefined) {
    return { errorCode: 404 };
  }

  // get current post tags details
  const postTags = post.tags.map((pid) =>
    axios
      .get(`${REST_PATH}tags/${pid}`)
      .then((res) => res.data)
      .catch((e) => console.error(e))
  );

  // End result of get current post tags details
  const finalTags = await Promise.all(postTags);

  //  filter only primary tag to show only primary tags on current post page
  const primaryTag = finalTags.filter((t) => t.acf.tag_primary == true);

  // get primary tag id only
  const primaryTagId = primaryTag.map((t) => t.id);

  // get single/current post tags id only in string format
  const postTagsIds = _.join(post.tags, ",");

  // get only current tag id without primary tags id
  const noPrimaryPostTagsId = _.pullAll([...post.tags], primaryTagId);

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

  const postLink = "${REST_PATH}posts?categories=";

  const previewPost = post.post_categories.findIndex((c) => c.term_id == 31);
  let isNotPreview = true;

  if (previewPost != -1) {
    isNotPreview = false;
  }

  return {
    post,
    relatedPost,
    postLink,
    primaryTag,
    isNotPreview,
  };
};

export const getSingleVideoData = async function (context) {
  const slug = context.query.slug;

  // get current post data
  const singlePost = await axios
    .get(`${REST_PATH}videos?slug=${slug}`)
    .then((res) => res.data);
  const post = _.head(singlePost);

  // get current post tags details
  const postTags = post.tags.map((pid) =>
    axios
      .get(`${REST_PATH}tags/${pid}`)
      .then((res) => res.data)
      .catch((e) => console.error(e))
  );

  // End result of get current post tags details
  const finalTags = await Promise.all(postTags);

  //  filter only primary tag to show only primary tags on current post page
  const primaryTag = finalTags.filter((t) => t.acf.tag_primary == true);

  // get primary tag id only
  const primaryTagId = primaryTag.map((t) => t.id);

  // get single/current post tags id only in string format
  const postTagsIds = _.join(post.tags, ",");

  // get only current tag id without primary tags id
  const noPrimaryPostTagsId = _.pullAll([...post.tags], primaryTagId);

  // get any related post based on current post tag id
  const getRelatedPost = await axios
    .get(`${REST_PATH}videos?tags=${postTagsIds}`)
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

  const postLink = "${REST_PATH}videos?categories=";

  return {
    post,
    relatedPost,
    postLink,
    primaryTag,
  };
};

export const getSearchResult = async function (context) {
  const q = context.query.q;

  const res = await axios.get(`${REST_PATH}posts?search=${q}`);
  const data = await _.filter(
    res.data,
    (d) => !d.categories.includes(hiddenCategories)
  );

  return {
    posts: data,
    keywords: q,
    resultLen: data.length,
  };
};
