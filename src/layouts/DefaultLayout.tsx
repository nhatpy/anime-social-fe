import { Layout } from "antd"
import { Footer, Header } from "./partials"
import { Outlet } from "react-router-dom"
import { ScrollToTop } from "../components"

const {Content} = Layout

export const DefaultLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Content className="text-black ">
                <ScrollToTop />
                <Outlet />
            </Content>
            <Footer />
        </Layout>
    )
}