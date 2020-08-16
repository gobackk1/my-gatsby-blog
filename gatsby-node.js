/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.createPages = ({ graphql, actions }) =>
  graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              slug
              body {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    `
  )
    .then(result => {
      if (result.errors) console.log(result.errors)

      result.data.allContentfulBlogPost.edges.forEach(edge => {
        actions.createPage({
          path: `/posts/${edge.node.slug}/`,
          component: path.resolve("./src/views/Post.js"),
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
          },
        })
      })
    })
    .catch(error => {
      console.log(error)
    })
