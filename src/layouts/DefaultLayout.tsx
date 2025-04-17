import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import { Chatbot, ScrollToTop } from "../components";

import { Footer, Header } from "./partials";

const { Content } = Layout;

export const DefaultLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content className="text-black ">
        <ScrollToTop />
        <Chatbot />
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};
