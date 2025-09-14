// import { useEffect } from "react";
// import { findAll } from "../../apis/commom";
import { Col, Layout, Row } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import "./index.css";
import Main from "../Main";

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  maxWidth: "calc(100% - 8px)",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "black",
  backgroundColor: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  fontWeight: "bold",
  fontSize: "24px",
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const Home = () => {
  const currentYear = new Date().getFullYear();
  // useEffect(() => {
  //   //TODO: login account email
  //   (async function doCall() {
  //     const user = (await findAll()).data;
  //   })();
  // }, []);
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <span>{`${currentYear}年高考志愿学校推荐`}</span>
      </Header>
      <Content style={contentStyle}>
        <Row className="main">
          <Col span={24}>
            <Main />
          </Col>
        </Row>
      </Content>
      {/*<Footer style={footerStyle}>Footer</Footer>*/}
      {/*<Footer className="footer"> Footer</Footer>*/}
    </Layout>
  );
};

export default Home;
