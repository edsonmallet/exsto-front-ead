import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query GetCourses($limit: Int) {
    courses(limit: $limit) {
      id
      title
      description
    }
  }
`;
