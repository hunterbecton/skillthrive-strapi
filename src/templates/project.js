import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
const slugify = require('slugify');

const ProjectTemplate = ({ data }) => {
    const username = data.strapiProject.teacher.username;
    const usernameSlug = slugify(username, {
        lower: true
    });
    return (
        <Layout>
          <h1>{data.strapiProject.title}</h1>
          <p>by <Link to={`/teachers/${usernameSlug}`}>{data.strapiProject.teacher.username}</Link></p>
          <p>{data.strapiProject.description}</p>
        </Layout>
      )
}

export default ProjectTemplate

export const query = graphql`
  query ProjectTemplate($id: String!) {
    strapiProject(id: {eq: $id}) {
      title
      description
      teacher {
        id
        username
      }
    }
  }
`