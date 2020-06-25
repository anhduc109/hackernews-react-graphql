import gql from 'graphql-tag';

export const POST_COMMENT_MUTATION = gql`
  mutation PostComment($id: Int!, $parent: Int!, $submitterId: Int!, $text: String!) {
    postComment(id: $id, parent: $parent, submitterId: $submitterId, text: $text) {
      parent
      submitterId
      text
    }
  }
`;
