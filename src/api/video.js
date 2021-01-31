import request from '@/utils/request'

const VIDEO_API='/admin/edu/videos'

export default {

  save(video) {
    return request({
      url: VIDEO_API,
      method: 'post',
      data: video
    })
  },

  getById(id) {
    return request({
      url: VIDEO_API+`/${id}`,
      method: 'get'
    })
  },

  updateById(video) {
    return request({
      url: VIDEO_API,
      method: 'put',
      data: video
    })
  },

  removeById(id) {
    return request({
      url: VIDEO_API+`/${id}`,
      method: 'delete'
    })
  }
}