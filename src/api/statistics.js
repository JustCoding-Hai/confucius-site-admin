import request from '@/utils/request'

export default {

  createStatistics(day) {
    return request({
      url: `/admin/statistics/daily/create/${day}`,
      method: 'post'
    })
  },
  showChart(searchObj) {
    return request({
        url: `/admin/statistics/daily/show-chart/${searchObj.begin}/${searchObj.end}`,
        method: 'get'
    })
   }
}