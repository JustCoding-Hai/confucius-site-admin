import request from '@/utils/request'

export default {
    getNestedTreeList() {
        return request({
            url: '/admin/edu/subject/list',
            method: 'get',
        })
    }
} 