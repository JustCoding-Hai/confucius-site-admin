import request from '@/utils/request'

export default {

  removeByVodId(id) {
    return request({
      baseURL: 'http://127.0.0.1:8130',
      url: '/admin/vod/media?vodId='+id,
      method: 'delete'
    })
  }
}