import type {
	NextFunction,
	Request as ExpressRequest,
	Response,
} from 'express';
import type OpenAI from 'openai';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from './supabase/types';

type Supabase = SupabaseClient<Database, 'public', Database['public']>;

type Request = ExpressRequest & {
	ai: OpenAI;
	db: Supabase;
};

export type { NextFunction, Request, Response, Supabase };
