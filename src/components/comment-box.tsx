import * as React from 'react';
import { useMutation } from 'react-apollo';
import Router from 'next/router';
import Picker from 'react-giphy-picker';

import { NewsItemModel } from '../data/models';
import { POST_COMMENT_MUTATION } from '../data/mutations/post-comment-mutation';

export interface ICommentsBoxProps {
  newsItem: NewsItemModel;
}

export function CommentBox(props: ICommentsBoxProps): JSX.Element {
  const { newsItem } = props;

  const [text, setText] = React.useState<string>('');
  const [isGif, setIsGif] = React.useState<boolean>(false);

  const [postComment] = useMutation(POST_COMMENT_MUTATION, {
    onError(error) {
      Router.push('/login');
    },
    variables: { id: 999, parent: newsItem.id, text, isGif },
  });

  return (
    <tr>
      <td colSpan={2} />
      <td>
        <form
          method="post"
          action="comment"
          onSubmit={(e) => {
            e.preventDefault();
            text.trim() !== '' ? postComment() : alert('Cannot post an empty comment!');
            // return Router.reload();
          }}
        >
          <input type="hidden" name="parent" value="15237896" />
          <input type="hidden" name="goto" value="item?id=15237896" />
          <input type="hidden" name="hmac" value="02641d0660c89c1a83ccf0d171e42497d10d2135" />
          <textarea
            value={text}
            name="text"
            onChange={(e) => setText(e.target.value)}
            rows={6}
            cols={60}
          />
          <br />
          <br />
          <input type="submit" value="add comment" />
          {/* <Pickers
            onSelected={(item) => {
              setText(item.downsized.url);
              setIsGif(true);
            }}
          /> */}
        </form>
      </td>
    </tr>
  );
}
