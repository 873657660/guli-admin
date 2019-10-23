import request from '@/utils/request'

export default {
  getNestedTreeList2() {
    return request({
      url: '/admin/edu/subject/list2',
      method: 'get'
    })
  }
}
