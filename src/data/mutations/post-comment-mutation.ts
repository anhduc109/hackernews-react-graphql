import gql from 'graphql-tag';

export const POST_COMMENT_MUTATION = gql`
  mutation PostComment($parent: Int!, submitterId: Int!, text: String!) {
    postComment(id: $id) {
      parent
      submitterId
      text
    }
  }
`;
