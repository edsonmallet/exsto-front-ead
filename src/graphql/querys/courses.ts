import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query GetCourses($limit: Int) {
    courses {
      pagination{
        limit: $limit
      }
      data {
        id
        attributes {
          uuid
          name
          authors {
            data {
              id
              attributes {
                uuid
                name
              }
            }
          }
        }
      }
    }
  }
`;
