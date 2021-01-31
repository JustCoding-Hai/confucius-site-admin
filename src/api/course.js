import request from '@/utils/request'

const COURSE_API='/admin/edu/courses'

export default {
    saveCourseInfo(courseInfo){
        return request({
            url: COURSE_API,
            method: 'post',
            data: courseInfo
        })

    },    
    getCourseInfoById(id){
        return request({
            url: COURSE_API+`/${id}`,
            method: 'get'
        })

    },
    updateCourseInfo(courseInfo) {
        return request({
            url: COURSE_API,
            method: 'put',
            data: courseInfo
        })
    },   
    getPageList(page, size, searchObj) {
        return request({
            url: COURSE_API+'/page-list?page=' + page + '&size=' + size,
            method: 'get',
            params: searchObj
        })
    },
    deleteById(id){
        return request({
            url: COURSE_API+`/${id}`,
            method: 'delete',
        })
    },
    getCoursePublishInfoById(id) {
        return request({
          url: COURSE_API+`/${id}`+'/publish-info',
          method: 'get'
        })
      },
      
    publishCourseById(id) {
        return request({
          url: COURSE_API+`/${id}`+'/publish-info',
          method: 'put'
        })
      }

}