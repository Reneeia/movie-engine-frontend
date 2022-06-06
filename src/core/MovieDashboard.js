import React, { Fragment, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Route } from "react-router-dom";
import {
  VideoCameraOutlined,
  PieChartOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import OscarMovies from '../OscarMovies/OscarMovies';
import { HashRouter } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const rootUrl = '/oscar-movie'

const defaultContent = (
  <div>
    <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
      Renee is an egg
    </div>
  </div>
);

const content = (
  <Content style={{ margin: "0 16px" }}>
    <Route path={rootUrl} exact render={() => defaultContent} />
    <Route
      path={`/oscar-movie/winner-movies`}
      render={() => <OscarMovies filter="winner"/>}
    />
    <Route
      path={`/oscar-movie/all-movies`}
      render={() => <OscarMovies/> }
    />
  </Content>
);

const items = [
  getItem((<Fragment><span>Oscar Movies</span> <Link to={`${rootUrl}/all-movies`} /></Fragment>), '1', <VideoCameraOutlined />),
  getItem((<Fragment><span>Oscar Winners</span> <Link to={`${rootUrl}/winner-movies`} /></Fragment>), '2', <TrophyOutlined />),
  getItem('By Category', 'sub1', <PieChartOutlined />, [
    getItem('Leading Actress', '3'),
    getItem('Leading Actor', '4'),
    getItem('Supporting Actress', '5'),
    getItem('Supporting Actor', '6'),
    getItem('Animated', '7'),
    getItem('Directing', '8'),
    getItem('Documentary', '9'),
    getItem('Short Documentary', '10'),
    getItem('Film Editing', '11'),
    getItem('International', '12'),
    getItem('...', '13'),
  ])
];

const MovieDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <HashRouter>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
          {content}
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Movie Engine ©2022 Created by Renee
          </Footer>
        </Layout>
      </HashRouter>
    </Layout>
  );
};

export default MovieDashboard;