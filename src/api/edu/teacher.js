import request from '@/utils/request'

export default {
  getList() {
    return request({
      url: '/admin/edu/teacher',
      method: 'get'
    })
  },

  getPageList(page, limit, searchObj) {
    return request({
      url: `/admin/edu/teacher/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  removeById(id) {
    return request({
      url: `/admin/edu/teacher/${id}`,
      method: 'delete'
    })
  },

  save(teacher) {
    return request({
      url: `/admin/edu/teacher`,
      method: 'post',
      data: teacher
    })
  },

  getById(id) {
    return request({
      url: `/admin/edu/teacher/${id}`,
      method: 'get'
    })
  },

  updateById(teacher) {
    return request({
      url: `/admin/edu/teacher/${teacher.id}`,
      method: 'put',
      data: teacher
    })
  },

  // 通过json传，使用data
  removeRows(idList) {
    return request({
      url: `/admin/edu/teacher`,
      method: 'delete',
      data: idList
    })
  },

  selectNameByKey(key) {
    return request({
      url: `/admin/edu/teacher/name/${key}`,
      method: 'get'
    })
  }

}

