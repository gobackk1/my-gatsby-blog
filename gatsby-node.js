/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const {
    data: { posts, tags },
    errors,
  } = await graphql(
    `
      {
        posts: allContentfulBlogPost {
          edges {
            node {
              id
              slug
              updatedAt(formatString: "YYYY-MM-DD", locale: "ja")
              tags {
                name
                slug
              }
              body {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
        tags: allContentfulTag {
          totalCount
          nodes {
            name
            slug
          }
        }
      }
    `
  )

  if (errors) console.log(result.errors)

  posts.edges.forEach(edge => {
    actions.createPage({
      path: `/posts/${edge.node.slug}/`,
      component: path.resolve("./src/template/Post.tsx"),
      context: {
        slug: edge.node.slug,
        id: edge.node.id,
      },
    })
  })

  tags.nodes.forEach(tag => {
    actions.createPage({
      path: `/tags/${tag.slug}/`,
      component: path.resolve("./src/template/Tag.tsx"),
      context: {
        slug: tag.slug,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    },
  })
}
