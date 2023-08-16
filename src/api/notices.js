import api from '../utils/api'
import { transformData } from '../utils/utils'

// 获取通知信息
export const getNoticeData = data => {
  return api({
    url: '/notices?' + transformData(data),
    method: 'GET',
  })
}

// 根据ID获取通知信息
export const getNoticeDataById = noticeId => {
  return api({
    url: '/notices/' + noticeId,
    method: 'GET',
  })
}

// 搜索通知
export const searchNotice = data => {
  return api({
    url: '/notices/search?' + transformData(data),
    method: 'GET',
  })
}

// 新增通知
export const addNotice = data => {
  return api({
    url: '/notices',
    method: 'POST',
    data,
  })
}

// 编辑通知
export const editNotice = (noticeId, data) => {
  return api({
    url: '/notices/' + noticeId,
    method: 'PUT',
    data,
  })
}

// 删除通知
export const deleteNotice = noticeId => {
  return api({
    url: '/notices/' + noticeId,
    method: 'DELETE',
  })
}
