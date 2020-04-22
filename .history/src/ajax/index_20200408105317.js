/*
  该文件用于管理员项目中所有的ajax请求, 每一个API接口都匹配一个函数, 专门用于发送请求
*/
import Ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';
import { WEATHER_BASE_URL, WEATHER_AK, WEATHER_LOCATION } from '../config'

// 请求登录
export const reqLogin = (loginObj) => Ajax.post('/login', loginObj)
// 请求天气
export const reqWeatherDate = () => {
  const url = `${WEATHER_BASE_URL}?location=${WEATHER_LOCATION}&output=json&ak=${WEATHER_AK}`
  return new Promise((resolve) => {
    jsonp(url, { timeout: 3000 }, (err, data) => {
      if (!err) {
        const { error } = data
        if (error === 0) resolve(data.results[0].weather_data[0])
        else message.error('百度服务器返回天气信息有误，请联系管理员');
      } else {
        message.error('获取天气信息失败，请联系理员！');
      }
    })
  })
}
// 请求列表
export const reqCategoryList = () => Ajax.get('/manage/category/list')
// 请求添加
export const reqAddCategoryList = (categoryName) => Ajax.post('/manage/category/add', { categoryName })
// 请求修改分类
export const reqUpdateCategory = (categoryId, categoryName) => Ajax.post('/manage/category/update', { categoryId, categoryName })
// 请求商品列表(分页数据)
export const reqProductList = (pageNum, pageSize) => Ajax.get('/manage/product/list', { params: { pageNum, pageSize } })
//请求搜索商品
export const reqSearchProduct = (searchType, keyWord, pageNum, pageSize) =>
  Ajax.get('/manage/product/search', { params: { [searchType]: keyWord, pageNum, pageSize } })
// 请求商品详细信息(通过id)
export const reqProductDetailById = productId => Ajax.get('/manage/product/info', { params: { productId } })
// 请求上架下架商品
export const reqChangeProductStatus = (productId, status) => Ajax.post('/manage/product/updateStatus', { productId, status })
// 请求删除图片
export const reqDeletePirture = name => Ajax.post('/manage/img/delete', { name })
// 请求添加商品
export const reqAddProduct = (productObj) => Ajax.post('/manage/product/add', productObj)
// 请求修改商品
export const reqUpdateProduct = (productObj) => Ajax.post('/manage/product/update', productObj)
// 请求角色列表
export const reqRoleList = () => Ajax.get('/manage/role/list')
// 请求添加角色
export const reqRoleAdd = (roleName) => Ajax.post('/manage/role/add', { roleName })