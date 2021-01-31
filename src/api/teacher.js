import request from '@/utils/request'

const TEACHER_API='/admin/edu/teachers'

export default {
    list() {
        return request({
            url: TEACHER_API,
            method: 'get'
        })
    },
    pageList(page, size, teacherQueryVO) {
        return request({
            url: TEACHER_API+'/page-list?page=' + page + '&size=' + size,
            method: 'get',
            params: teacherQueryVO
        })
    },
    deleteById(id) {
        return request({
            url: TEACHER_API+`/${id}`,
            method: 'delete',
        })
    },
    deleteByIds(idList) {
        return request({
            url: TEACHER_API,
            method: 'delete',
            data: idList
        })
    },
    save(teacher){
        return request({
            url: TEACHER_API,
            method:'post',
            data:teacher
        })
    },
    getById(id){
        return request({
            url: TEACHER_API+`/${id}`,
            method: 'get'
        })
    },
    updateById(teacher){
        return request({
            url: TEACHER_API,
            method: 'put',
            data:teacher
        })
    },
    selectNameListByKey(key) {
        return request({
            url: TEACHER_API+'/name?keyword='+key,
            method: 'get'
        })
    }

}