import pool from './pool';
import setup from './setup';

const setupPool = async (): Promise<void> => await setup(pool);

setupPool();
