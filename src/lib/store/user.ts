import { writable } from 'svelte/store';
import type { User } from '../models/user';

export const user = writable<User>();
