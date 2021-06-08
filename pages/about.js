import styled from '@emotion/styled';
import axios from 'axios';
import _ from 'lodash';
// import Team from "../components/Team";
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import Container from '@/components/core/Container';
import Divider from '@/components/core/Divider';
import PageTitle from '@/components/core/PageTitle';

const { REST_PATH } = process.env;

export default function About({ about, teams }) {
  const [isEn, setIsEn] = useState(true);
  const SEO = {
    title: `About Us | The Centre`,
    description: 'About Us',
    canonical: about.slug
  };

  return (
    <>
      <NextSeo {...SEO} />
      <Container>
        <LanguageChoose>
          <span>
            <span
              onClick={() => (isEn == false ? setIsEn(true) : null)}
              disabled={isEn ? true : null}
              className={isEn ? 'active' : ''}>
              {' '}
              ENG
            </span>{' '}
            |{' '}
            <span
              onClick={() => (isEn == true ? setIsEn(false) : null)}
              disabled={!isEn ? true : null}
              className={!isEn ? 'active' : ''}>
              BM
            </span>
          </span>
        </LanguageChoose>

        <PageTitle>{isEn ? 'ABOUT US' : 'LATAR BELAKANG'}</PageTitle>

        <AboutContent>
          {isEn ? (
            <div dangerouslySetInnerHTML={{ __html: about.acf.content_en }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: about.acf.content_bm }} />
          )}
        </AboutContent>

        <TeamDescription>
          {isEn ? (
            <div
              dangerouslySetInnerHTML={{
                __html: about.acf.team_description_en
              }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: about.acf.team_description_bm
              }}
            />
          )}
        </TeamDescription>

        <Team>
          {teams.map((team) => (
            <div key={team.id}>
              <TeamHeading>
                <h2
                  dangerouslySetInnerHTML={{ __html: isEn ? team.name : team.acf.group_name_bm }}
                />
              </TeamHeading>

              {team.name === 'Founders' ? (
                <TeamContainerFounders>
                  {team.members.map((member) => (
                    <PersonContainerFounders key={member.id}>
                      <img src={member.acf.picture.sizes.medium} />
                      <h4>{member.title.rendered}</h4>
                      <Divider margin="10px 0" />
                      <Designation>
                        {isEn ? member.acf.designation : member.acf.designation_bm}
                      </Designation>
                      <PersonContent
                        className="bio"
                        dangerouslySetInnerHTML={{
                          __html: isEn ? member.acf.bio : member.acf.bio_bm
                        }}
                      />
                    </PersonContainerFounders>
                  ))}
                </TeamContainerFounders>
              ) : (
                <TeamContainer justifyContent={team.members.length == 2 ? 'center' : 'flex-start'}>
                  {team.members.map((member) => (
                    <PersonContainer
                      key={member.id}
                      justifyContent={team.members.length == 2 ? 'center' : 'flex-start'}>
                      <img src={member.acf.picture.sizes.medium} />
                      <h4>{member.title.rendered}</h4>
                      <Divider margin="10px 0" />
                      <Designation>
                        {isEn ? member.acf.designation : member.acf.designation_bm}
                      </Designation>
                      <PersonContent
                        className="bio"
                        dangerouslySetInnerHTML={{
                          __html: isEn ? member.acf.bio : member.acf.bio_bm
                        }}
                      />
                    </PersonContainer>
                  ))}
                </TeamContainer>
              )}
            </div>
          ))}
        </Team>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const about = await axios.get(`${REST_PATH}pages?slug=about`);
  const aboutData = await about.data;

  const team = await axios.get(`${REST_PATH}team?per_page=20`);
  const teamData = await team.data;

  const teamGroup = await axios.get(`${REST_PATH}acf_team_group`);
  const teamGroupData = await teamGroup.data;

  teamGroupData.forEach((g, i) => {
    teamGroupData[i]['members'] = [];
    teamData.forEach((t) => {
      if (t.acf_team_group.includes(g.id)) {
        teamGroupData[i]['members'].push(t);
      }
    });
  });

  return {
    props: {
      about: _.head(aboutData),
      teams: teamGroupData
    },
    revalidate: 300
  };
}

const LanguageChoose = styled.div`
  display: flex;
  justify-content: flex-end;
  span {
    color: #000;
    font-weight: 700;
    font-size: 16px;
    font-family: ${(props) => props.theme.font.primary};
    cursor: pointer;
    &.active {
      text-decoration: underline;
    }
  }
`;

const AboutContent = styled.div`
  margin-bottom: 1.5em;
  p {
    font-size: 19px;
    font-weight: 400;
    font-family: ${(props) => props.theme.font.secondary};
    line-height: 32px;
    margin-bottom: 1.5em;
  }
  @media only screen and (max-width: 768px) {
    p {
      font-size: 18px;
      line-height: 30px;
    }
  }
`;

const TeamDescription = styled.div`
  margin-bottom: 80px;

  p {
    font-size: 19px;
    font-weight: 400;
    font-family: ${(props) => props.theme.font.secondary};
    line-height: 32px;
  }
  @media only screen and (max-width: 768px) {
    p {
      font-size: 18px;
      line-height: 30px;
    }
  }
`;

const TeamHeading = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 70px;
  h2 {
    font-size: 28px;
    font-weight: 700;
    font-family: ${(props) => props.theme.font.primary};
    color: #000;
    padding: 0 15px;
    text-transform: uppercase;
  }
  @media only screen and (max-width: 768px) {
    h2 {
      text-align: center;
    }
  }
`;

const Team = styled.div``;

const PersonContainer = styled.div`
  width: 250px;
  margin-bottom: 70px;
  margin-right: 110px;
  text-align: center;
  img {
    width: 135px;
  }
  h4 {
    font-family: ${(props) => props.theme.font.primary};
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
    margin: 10px 0;
  }
  &:nth-of-type(3n + 3) {
    margin-right: 0;
  }
  &:last-child {
    margin-right: ${(props) => (props.justifyContent == 'centre' ? '0' : 'inherit')};
  }
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    margin-right: 95px;
  }
  @media only screen and (max-width: 768px) {
    margin-right: 0;
  }
`;

const PersonContainerFounders = styled.div`
  width: 250px;
  margin-bottom: 70px;
  margin-right: 100px;
  text-align: center;
  img {
    width: 135px;
  }
  h4 {
    font-family: ${(props) => props.theme.font.primary};
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
    margin: 10px 0;
  }
  &:nth-of-type(2n + 2) {
    margin-right: 0;
  }
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
  }
  @media only screen and (max-width: 768px) {
    margin-right: 0;
  }
`;

const Designation = styled.p`
  font-size: 16px;
  font-weight: regular;
  font-style: italic;
  font-family: ${(props) => props.theme.font.primary};
  line-height: 19px;
  margin: 0;
`;

const PersonContent = styled.div`
  margin-top: 20px;
  p {
    font-size: 18px;
    font-weight: 400;
    font-family: ${(props) => props.theme.font.secondary};
    line-height: 27px;
    text-align: left;
  }
`;

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => props.justifyContent};
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TeamContainerFounders = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
