import axios from 'axios';
import _ from 'lodash';

const { REST_PATH } = process.env;
export default function handler(req, res) {
  const slug = req.query.slug;
  const [category, tag] = slug;

  let result = Promise.all([
    axios.get(`${REST_PATH}categories?slug=${category}`).then((res) => _.head(res.data)),
    axios.get(`${REST_PATH}tags?slug=${tag}`).then((res) => _.head(res.data))
  ]);

  let [getCategory, getTag] = result;

  console.log(getCategory);
  console.log(getTag);
  const tId = getTag.id;

  res.end(`Post: ${cId} / ${tId}`);
}
