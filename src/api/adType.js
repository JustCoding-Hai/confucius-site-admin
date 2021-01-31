import request from '@/utils/request'

export default {

  list() {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: '/cms/ad-types',
      method: 'get'
    })
  },

  pageList(page, limit) {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: '/cms/ad-types/page-list?page='+page+"&limit="+limit,
      method: 'get'
    })
  },

  removeById(id) {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: `/cms/ad-types/${id}`,
      method: 'delete'
    })
  },

  save(adType) {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: '/cms/ad-types',
      method: 'post',
      data: adType
    })
  },

  getById(id) {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: `/cms/ad-types/${id}`,
      method: 'get'
    })
  },

  updateById(adType) {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: '/cms/ad-types',
      method: 'put',
      data: adType
    })
  }
}