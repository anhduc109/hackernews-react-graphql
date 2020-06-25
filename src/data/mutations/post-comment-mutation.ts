import gql from 'graphql-tag';

export const POST_COMMENT_MUTATION = gql`
  mutation PostComment($id: Int!) {
    postComment(id: $id) {
      id
      upvoteCount
      upvoted
    }
  }
`;
