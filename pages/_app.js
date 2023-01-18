import "../styles/styles.css";
import { Layout } from "antd";
import { Menu } from "../components/App";

const { Header, Footer, Sider, Content } = Layout;
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Sider>
          <Menu></Menu>
        </Sider>
        <Layout>
          {/* <Header>Header</Header> */}
          <Content>
            <Component {...pageProps} className="main"/>
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Layout>
    </>
  );
}
