import request from '@/utils/request'

const api_name = '/admin/vod/video'

export default {

  removeVideoById(videoSourceId) {
    return request({
      url: `${api_name}/${videoSourceId}`,
      method: 'delete'
    })
  }
}
