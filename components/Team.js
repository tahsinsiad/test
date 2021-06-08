const Team = (props) => (
  <>
    <style jsx>{`
      .team-container {
        width: 1200px;
        margin: 0 auto;
      }

      .container-fluid {
        width: 100%;
        background-color: #fdf9f5;
        height: 100%;
        padding: 30px 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Catamaran', sans-serif;
        font-weight: 700;
      }
      p {
        font-family: 'Poly', serif;
        font-size: 19px;
        line-height: 25px;
      }
      h2 {
        font-size: 70px;
        padding-left: 30px;
        border-left: 10px solid #bf8845;
        line-height: 70px;
      }
      .team-container > h2 {
        margin-bottom: 150px;
      }

      .team-row {
        display: flex;
        margin-bottom: 100px;
      }

      .img-cropper {
        width: 25%;
      }

      .img-cropper > img {
        height: 200px;
        width: 200px;
        border-radius: 100px;
      }
      .team-details {
        width: 75%;
      }

      .team-column {
        width: 80%;
        margin: 0 auto;
      }
      .team-column > h2 {
        font-size: 50px;
        padding-left: 0;
        border-left: 0;
        line-height: 30px;
        margin: 0 0 80px;
      }
      .team-details > h2 {
        font-size: 30px;
        padding-left: 0;
        border-left: 0;
        line-height: 30px;
        margin: 0;
      }

      .team-details > h3 {
        font-size: 20px;
        margin: 0 0 10px;
        color: #bf8844;
      }

      @media all and (min-width: 768px) and (max-width: 1024px) {
        .team-container {
          width: 90%;
          padding: 50px 0;
        }

        .team-container > h2 {
          margin-bottom: 80px;
        }
        .team-row {
          flex-direction: column;
          align-items: center;
        }
        .team-column {
          width: 100%;
        }

        .img-cropper,
        .team-details {
          width: 100%;
        }

        .img-cropper {
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
        }

        h2,
        h3 {
          text-align: center;
          border: 0;
        }
      }

      @media all and (max-width: 767px) {
        h2 {
          font-size: 35px;
          line-height: 35px;
          padding-left: 15px;
        }

        .team-column > h2 {
          font-size: 30px;
        }

        .team-container {
          width: 90%;
        }

        .team-container > h2 {
          font-size: 35px;
          margin-bottom: 30px;
        }

        .team-column {
          width: 100%;
        }

        .team-row {
          flex-direction: column;
        }

        .img-cropper,
        .team-details {
          width: 100%;
        }

        .img-cropper > img {
          margin: 0 auto;
          text-align: center;
        }

        .img-cropper {
          margin-bottom: 30px;
        }
      }
    `}</style>

    <div className="container-fluid">
      <div className="team-container">
        <h2>{props.lang == 'bm' ? props.headingBm : props.headingEn}</h2>

        {props.teams.map((t) => (
          <div className="team-column">
            <h2>{props.lang == 'bm' ? t.acf.group_name_bm : t.name}</h2>
            {t.members.map((m) => (
              <div className="team-row">
                <div className="img-cropper">
                  <img src={m.acf.picture.sizes.medium} />
                </div>

                <div className="team-details">
                  <h2>{m.acf.name}</h2>
                  <h3>{props.lang == 'bm' ? m.acf.designation_bm : m.acf.designation}</h3>
                  <div
                    className="bio"
                    dangerouslySetInnerHTML={{
                      __html: props.lang == 'bm' ? m.acf.bio_bm : m.acf.bio
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </>
);

export default Team;
