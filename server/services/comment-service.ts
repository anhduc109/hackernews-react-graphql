import { debug } from 'debug';

import { CacheSingleton } from '../database/cache';
import * as HNDB from '../database/hn-data-api';
import { CommentModel, NewsItemModel } from '../../src/data/models';
import { IGraphQlSchemaContext } from '../graphql-resolvers';

const logger = debug('app:Comment');

export abstract class CommentService {
  static getComment(id: number): CommentModel | Promise<CommentModel | void> {
    return (
      CacheSingleton.getComment(id) ||
      HNDB.fetchComment(id).catch((reason) => logger('Rejected comment:', reason))
    );
  }

  static getComments(ids: number[]): Promise<Array<CommentModel> | void> {
    return Promise.all(ids.map((commentId) => CommentService.getComment(commentId)))
      .then((comments): CommentModel[] =>
        comments.filter((comment): comment is CommentModel => comment !== undefined)
      )
      .catch((reason) => logger('Rejected comments:', reason));
  }

  static async postComment(
    comment: CommentModel,
    submitterId: string,
    context: IGraphQlSchemaContext
  ) {
    const id = Math.floor(Math.random() * 10000);

    const newComment = new CommentModel({
      id,
      parent: comment.parent,
      text: comment.text,
      creationTime: Date.now(),
      submitterId,
    });

    // console.log('news', await context.NewsItemService.getNewsItem(id));
    const parentNews = await context.NewsItemService.getNewsItem(comment.parent);

    if (parentNews) {
      parentNews.comments.unshift(id);
      CacheSingleton.setNewsItem(id, parentNews);
    }

    CacheSingleton.setComment(id, newComment);

    return newComment;
  }
}
