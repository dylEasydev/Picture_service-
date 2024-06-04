import path from 'path'

export const __basedir = path.dirname(__dirname);

export const __baseurl = `http://${process.env.HOSTNAME}:${process.env.PORT}`
