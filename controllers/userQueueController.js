'use strict';

import { HttpError } from '../helpers/error';

/**
 * @typedef { import('../types').Request } Request
 * @typedef { import('../types').Response} Response
 * @typedef { import('../types').NextFunction } NextFunction
 */

export class UserQueueController {
	/**
	 * @param { Request } req
	 * @param { Response } res
	 * @param { NextFunction } next
	 */
	static async addToQueue(req, res, next) {
		try {
			const { id: userId } = req.user;

			const isInQueue = await req.redis.sismember('user:available', userId);
			if (isInQueue) throw HttpError(400, 'User is already in queue');

			await req.redis.sadd('user:available', userId);
			await req.redis.lpush('user:queue', userId);

			res.status(200).send();
		} catch (err) {
			next(err);
		}
	}

	/**
	 * @param { Request } req
	 * @param { Response } res
	 * @param { NextFunction } next
	 */
	static async removeFromQueue(req, res, next) {
		try {
			const { id: userId } = req.user;

			const isInQueue = await req.redis.sismember('user:available', userId);
			if (!isInQueue) throw HttpError(404, 'User not found');

			await req.redis.srem('user:available', userId);

			res.status(200).send();
		} catch (err) {
			next(err);
		}
	}
}
