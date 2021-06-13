import React from "react"
import { Layout, SEO, Title } from "../components/"

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Title type="h2">404: Not Found</Title>
    <p>お探しのページは見つかりませんでした</p>
  </Layout>
)

export default NotFoundPage
