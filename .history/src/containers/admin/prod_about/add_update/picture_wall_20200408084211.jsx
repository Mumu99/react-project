import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeletePirture } from '../../../../ajax'

// getBase64 专门用于将图片转为base64编码
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, // 是否展示预览窗
    previewImage: '',// 控制预览的对象(url / base64)
    fileList: [ // 所有已经上传完毕的文件, 所组成的文件列表
      /*  {
         uid: '-1', // 图片的唯一标识(antd底层遍历时使用)
         name: 'image.png', // 经过服务器改名之后的图片名字(唯一)
         status: 'done', // 文件的状态(done 代表文件已经上传完毕)
         url: 'http://xlsmu.top/images/4.jpg', // 服务器返回图片的查看地址
       }, */
    ],
  };

  // 根据fileList 生成一个由新的图片名所组成的数组
  getImgsNameArr = () => {
    let arr = [];
    this.state.fileList.forEach((imgObj) => {
      arr.push(imgObj.name)
    })
    return arr
  }

  // 关闭预览按钮的回调
  handleCancel = () => this.setState({ previewVisible: false });

  // 点击预览按钮的回调
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  // 图片状态发生变化的回调(一个图片上传, 需要经历很多次自身状态的改变)
  /*
    1. handleChange 被调用的时候, 一定接受到了一个对象.
    2. 这个对象中一定包含fileList这个属性
  */
  handleChange = async ({ file, fileList }) => {
    const { status } = file
    if (status === 'done') { //*图片上传完毕
      if (file.response.status === 0) {
        message.success('图片上传成功');
        const { name, url } = file.response.data
        fileList[fileList.length - 1].name = name
        fileList[fileList.length - 1].url = url
      }

    }
    if (status === 'removed') { //*图片需要删除
      // 发送ajax请求, 告诉服务器根据图片名, 删除图片
      let result = await reqDeletePirture(file.name)
      const { status, msg } = result
      if (status === 0) message.success('图片删除成功!')
      else message.error(msg);
    }
    this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"// 图片上传给哪个服务器
          name='image' // 发送后台的文件参数名
          listType="picture-card" // 照片墙视图
          fileList={fileList} // 配置要展示哪些要展示
          onPreview={this.handlePreview} // 点击 '小眼睛' 的回调
          onChange={this.handleChange} // 点击关闭预览的回调
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
