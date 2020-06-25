import gql from 'graphql-tag';

export const POST_COMMENT_MUTATION = gql`
  mutation PostComment($parent: Int!, $text: String!) {
    postComment(parent: $parent, text: $text) {
      parent
      text
    }
  }
`;
