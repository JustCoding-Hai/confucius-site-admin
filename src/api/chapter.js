import request from '@/utils/request'

const CHAPTER_API='/admin/edu/chapters'

export default {

  getNestedTreeList(courseId) {
    return request({
      url: CHAPTER_API+"/nested-list?courseId="+courseId,
      method: 'get'
    })
  },

  removeById(id) {
    return request({
      url: CHAPTER_API+`/${id}`,
      method: 'delete'
    })
  },

  save(chapter) {
    return request({
      url: CHAPTER_API,
      method: 'post',
      data: chapter
    })
  },

  getChapterById(id) {
    return request({
      url: CHAPTER_API+`/${id}`,
      method: 'get'
    })
  },

  updateById(chapter) {
    return request({
      url: CHAPTER_API,
      method: 'put',
      data: chapter
    })
  }
}