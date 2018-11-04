import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout' 

const TeacherTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiUser.username}</h1>
    <ul>
      {data.strapiUser.projects.map(project => (
        <li key={project.id}>
          <h2>
            <Link to={`projects/${project.slug}`}>{project.title}</Link>
          </h2>
          <p>{project.description}</p>
        </li>
      ))}
    </ul>
  </Layout>
)

export default TeacherTemplate

export const query = graphql`
  query TeacherTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      projects {
        id
        title
        description
        slug
      }
    }
  }
`