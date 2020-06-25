import gql from 'graphql-tag';

export const POST_COMMENT_MUTATION = gql`
  mutation PostComment($parent: Int!, $text: String!, $isGif: Boolean!) {
    postComment(parent: $parent, text: $text, isGif: $isGif) {
      parent
      text
      isGif
    }
  }
`;
