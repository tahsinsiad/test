import axios from 'axios';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { Embed, Tab } from 'semantic-ui-react';
import { base, publicPostCategories, REST_PATH, watchTag } from '@/configs/config';

const Watch = () => {
  const [panes, setPanes] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      const getPanes = async () => {
        try {
          const videos = await axios.get(
            `${REST_PATH}videos?categories=${publicPostCategories}&tags=${watchTag}&per_page=5`
          );
          const videosData = await videos.data;

          const thePanes = await videosData.map((video) => {
            const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

            const yt_id = video.acf.youtube_link.match(VID_REGEX)[1];
            return {
              menuItem: parse(video.title.rendered),
              render: () => (
                <Tab.Pane>
                  <Embed
                    id={yt_id}
                    placeholder={
                      video.featured_image_url
                        ? video.featured_image_url
                        : `${base}/images/home-featured-image.jpg`
                    }
                    source="youtube"
                  />
                </Tab.Pane>
              )
            };
          });

          setPanes([...thePanes]);
        } catch (e) {
          console.log(e);
        }
      };

      getPanes();
    }

    return () => (isCancelled = true);
  }, []);

  return (
    <>
      <h2>Watch</h2>
      <Tab
        grid={{ paneWidth: 11, tabWidth: 5 }}
        className="centreWatch"
        menu={{ fluid: true, vertical: true, tabular: 'right' }}
        panes={panes}
      />
      <hr key="hr3" />
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Catamaran', sans-serif;
          font-weight: 700;
        }

        h2 {
          font-size: 75px;
          font-weight: 800;
          text-align: center;
          line-height: 75px;
          margin-bottom: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        hr {
          margin: 100px auto 50px;
          width: 100%;
          border-style: solid;
          border-color: rgb(196, 190, 190);
        }

        @media all and (max-width: 767px) {
          .centreWatch > .ui.grid {
            flex-direction: column;
          }

          h2 {
            text-align: center;
            font-size: 55px;
            margin-bottom: 30px;
            margin-top: 50px;
          }

          hr {
            margin: 80px auto 20px;
            width: 90%;
          }
        }

        @media all and (min-width: 768px) and (max-width: 1024px) {
          hr {
            width: 90%;
          }
        }
      `}</style>
    </>
  );
};

export default Watch;
