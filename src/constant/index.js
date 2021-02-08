// export const folderRoot = "/";
export const folderRoot = process.env.NODE_ENV === 'production' ? '/' : '/';
// api root
export const apiRoot =
  process.env.NODE_ENV === 'production'
    ? 'https://api.jibannet.dev/workflow'
    : 'https://api.jibannet.dev/workflow';
