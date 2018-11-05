const path = require(`path`);
const slugify = require('slugify');

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      return result;
    })
  )
});

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  
  const getProjects = makeRequest(graphql, `
    {
      allStrapiProject {
        edges {
          node {
            id,
            slug
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each project.
    result.data.allStrapiProject.edges.forEach(({ node }) => {
      createPage({
        path: `/projects/${node.slug}`,
        component: path.resolve(`src/templates/project.js`),
        context: {
          id: node.id,
        },
      })
    })
  });

  const getTeachers = makeRequest(graphql, `
    {
      allStrapiUser {
        edges {
          node {
            id,
            username
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each teacher.
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/teachers/${slugify(node.username,{lower: true})}`,
        component: path.resolve(`src/templates/teacher.js`),
        context: {
          id: node.id,
        },
      })
    })
  });
  
// Queries for projects and teachers nodes to use in creating pages.
return Promise.all([
    getProjects,
    getTeachers
  ])
};