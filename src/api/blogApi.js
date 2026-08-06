import axiosClient from './axiosClient';
export const getBlogs = (params) => axiosClient.get('/blogs', { params }).then((r) => r.data.data);
export const getBlogBySlug = (slug) => axiosClient.get(`/blogs/${slug}`).then((r) => r.data.data);