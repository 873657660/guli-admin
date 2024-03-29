import request from '@/utils/request'

// const api_name = '/admin/edu/course'
const api_name = '/admin/edu/course'

export default {

  saveCourseInfo(courseInfo) {
    return request({
      url: '/admin/edu/course/save-course-info',
      method: 'post',
      data: courseInfo
    })
  },

  getCourseInfoById(id) {
    return request({
      url: `/admin/edu/course/course-info/${id}`,
      method: 'get'
    })
  },

  updateCourseInfoById(courseInfo) {
    return request({
      url: `/admin/edu/course/update-course-info/${courseInfo.id}`,
      method: 'put',
      data: courseInfo
    })
  },

  getPageList(page, limit, searchObj) {
    return request({
      url: `/admin/edu/course/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  removeById(id) {
    return request({
      url: `/admin/edu/course/${id}`,
      method: 'delete'
    })
  },

  getCoursePublishInfoById(id) {
    return request({
      url: `${api_name}/course-publish-info/${id}`,
      method: 'get'
    })
  },

  publishCourse(id) {
    return request({
      url: `${api_name}/publish-course/${id}`,
      method: 'put'
    })
  }
}
