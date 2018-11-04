import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Projects</h1>
    <ul>
      {data.allStrapiProject.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`projects/${document.node.slug}`}>{document.node.title}</Link>
          </h2>
          <Img fixed={document.node.hero.childImageSharp.fixed}/>
          <p>{document.node.description}</p>
        </li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiProject {
      edges {
        node {
          id
          hero {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          title
          description
          slug
        }
      }
    }
  }
`