// @ 符号在build/webpack.base.conf.js 中配置 表示 'src' 路径
import request from '@/utils/request'

export default {

  pageList(page, limit) {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: '/cms/ads/page-list?page='+page+"&limit="+limit,
      method: 'get'
    })
  },

  removeById(id) {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: `/cms/ads/${id}`,
      method: 'delete'
    })
  },

  save(ad) {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: '/cms/ads',
      method: 'post',
      data: ad
    })
  },

  getById(id) {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: `/cms/ads/${id}`,
      method: 'get'
    })
  },

  updateById(ad) {
    return request({
      baseURL: 'http://127.0.0.1:8150',
      url: '/cms/ads',
      method: 'put',
      data: ad
    })
  }
}