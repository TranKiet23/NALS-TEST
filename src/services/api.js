export default class APIBlogs {
    static getList (params){
        return `https://mock-api.nals.vn/api/v2/blogs${params}`
    }

    static getDetail(id) {
        return `https://mock-api.nals.vn/api/v2/blogs/${id}`;
    }

    static addNewBlog() {
        return `https://mock-api.nals.vn/api/v2/blogs`;
    }

    static updateBlog(id) {
        return `https://mock-api.nals.vn/api/v2/blogs/${id}`;
    }

}