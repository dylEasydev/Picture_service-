import {  dirname } from 'path';

export const __basedir = dirname(__dirname);

export const __baseurl = `http://${process.env.HOSTNAME}:${process.env.PORT}`
