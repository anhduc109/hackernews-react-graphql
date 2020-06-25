import * as React from 'react';
import { useMutation } from 'react-apollo';
import Router from 'next/router';

import { NewsItemModel } from '../data/models';
import { POST_COMMENT_MUTATION } from '../data/mutations/post-comment-mutation';

export interface ICommentsBoxProps {
  newsItem: NewsItemModel;
}

export function CommentBox(props: ICommentsBoxProps): JSX.Element {
  const { newsItem } = props;

  const [postComment] = useMutation(POST_COMMENT_MUTATION, {
    onError() {
      Router.push('/login');
    },
    variables: { parent: 1, submitterId: 1, text: 'hi' },
  });

  return (
    <tr>
      <td colSpan={2} />
      <td>
        <form
          method="post"
          action="comment"
          onSubmit={(e): Promise<any> => {
            e.preventDefault();
            return postComment();
          }}
        >
          <input type="hidden" name="parent" value="15237896" />
          <input type="hidden" name="goto" value="item?id=15237896" />
          <input type="hidden" name="hmac" value="02641d0660c89c1a83ccf0d171e42497d10d2135" />
          <textarea name="text" rows={6} cols={60} />
          <br />
          <br />
          <input type="submit" value="add comment" />
        </form>
      </td>
    </tr>
  );
}
