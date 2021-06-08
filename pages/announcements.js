import axios from 'axios';
import _ from 'lodash';
import { Tab } from 'semantic-ui-react';
import Container from '@/components/core/Container';
import PageTitle from '@/components/core/PageTitle';
import TabContent from '@/components/core/TabContent';

const { REST_ACF, JWT_TOKEN, JWT_USER, JWT_PWD } = process.env;

function Announcements({ year, mediaData }) {
  const panes = year.map((y, i) => {
    return {
      menuItem: y,
      render: () => (
        <Tab.Pane attached={false}>
          <TabContent media={mediaData[y]} />
        </Tab.Pane>
      )
    };
  });
  return (
    <>
      <PageTitle>ANNOUNCEMENTS</PageTitle>
      <Container>
        <Tab className="tab-media" menu={{ borderless: true, text: true }} panes={panes} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const tokenRes = await axios.post(`${JWT_TOKEN}`, {
    username: JWT_USER,
    password: JWT_PWD
  });
  const token = await tokenRes.data.data.token;

  const res = await axios.get(`${REST_ACF}announcements?per_page=100`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });

  const data = await res.data;

  data.sort(function (a, b) {
    var c = new Date(a.acf.date);
    var d = new Date(b.acf.date);
    return d - c;
  });

  const mediaData = _.groupBy(data, function (obj) {
    return new Date(obj.acf.date).getFullYear();
  });

  // console.log(mediaData);

  const year = Object.keys(mediaData);
  // const media = Object.values(mediaData);

  return {
    props: {
      year: _.reverse(year),
      // media: _.reverse(media)
      mediaData
    },
    revalidate: 300
  };
}

export default Announcements;
