import { Fragment, React, useEffect, useState } from 'react';
import axios from '../axios/axios-core'
import { Card, Avatar, Col, Row, Divider, Select, Button } from 'antd';
import { TrophyTwoTone } from '@ant-design/icons';
import { CdnEndPoint } from '../shared/cdn.constants'
import { OscarSeasons } from '../shared/oscar.constants'
const { Meta } = Card;
const { Option } = Select

const OscarMovies = props => {
  const [movies, setMovies] = useState([]);
  const [oscarSeason, setOscarSeason] = useState(92);

  useEffect(() => {
    fetchMovieData();
  }, [])

  const fetchMovieData = async () => {
    const url = props.filter ? `/oscar/${oscarSeason}/${props.filter}` : `/oscar/${oscarSeason}/`;
    const response = await axios.get(url);
    setMovies(response.data)
  }

  const getMoviePosterCdnUri = (movie) => {

    let moviePicName = movie.movieName.toLowerCase().replaceAll(' ', '_');
    moviePicName = moviePicName.replaceAll(':','');
    moviePicName = moviePicName.normalize("NFD").replace(/\p{Diacritic}/gu, "")
    console.log(moviePicName)
    return `${CdnEndPoint}/oscar_${movie.seasonOfOscar}/movie_posters/${moviePicName}.jpg`;
  }

  const getCandidatePicUri = (movie) => {
    const candidateName = movie.candidate.toLowerCase().replaceAll(' ', '_');
    return `${CdnEndPoint}/oscar_${movie.seasonOfOscar}/candidates/${candidateName}.jpg`;
  }

  const movieByCategory = movies.reduce((groups, movie) => {
    const group = (groups[movie.category] || []);
    group.push(movie)
    groups[movie.category] = group;
    return groups;
  }, {})

  const getOscarSeasonSelectionView = () => {
    console.log(OscarSeasons)
    const options = OscarSeasons.map(season => (
      <Option value={season}>{season}</Option>
    ));
    return (<Fragment>
      <div style={{ margin: 10, display: 'inline-flex' }}>
        Oscar Season:
      </div>
      <Select
        showSearch
        style={{
          width: 200,
        }}
        placeholder="Select an Oscar season"
        optionFilterProp="children"
        onChange={onOscarSeasonChange}
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) => parseInt(optionA.children) - parseInt(optionB.children)
        }
      >
        {options}
      </Select>
      <Button onClick={onFilterButtonClicked}>
        Query
      </Button>
    </Fragment>)
  }

  const onOscarSeasonChange = (value) => {
    setOscarSeason(value)
  }

  const onFilterButtonClicked = () => {
    fetchMovieData()
  }

  const movieViewList = Object.values(movieByCategory).map(movies => {
    const category = movies[0].category;

    const movieView = movies.map(movie => {
      const moviePosterUri = getMoviePosterCdnUri(movie)
      const candidatePicUri = getCandidatePicUri(movie)
      const title = movie.isWinner ? 
        <Fragment><TrophyTwoTone twoToneColor="#eb2f96"/> Winner <TrophyTwoTone twoToneColor="#52c41a"/></Fragment>
        : 'Nominees(s)'
      return <Col lg={6} xl={4} md={8} sm={24}>
        <Card
          size='small'
          title={movie.movieName}
          key={movie.id}
          style={{ width: 225, margin: 5, padding: 10 }}
          cover={
            <img
              alt={movie.movieName}
              src={moviePosterUri}
            />
          }
        >
          <Meta
            avatar={<Avatar style={{ width: 40, height: 40, padding: 0 }} src={candidatePicUri} />}
            title={title}
            description={movie.candidate}
          />
        </Card>
      </Col>
    })

    return (
      <Fragment>
        <Divider>{category}</Divider>
        <Row gutter={16} style={{ justifyContent: 'space-evenly', margin: '20px' }}>
          {movieView}
        </Row>
      </Fragment>
    )
  });

  return (
    <div className="App">
      <div className='site-card-wrapper'>
        {getOscarSeasonSelectionView()}

        {movieViewList}
      </div>
    </div>
  );
}

export default OscarMovies