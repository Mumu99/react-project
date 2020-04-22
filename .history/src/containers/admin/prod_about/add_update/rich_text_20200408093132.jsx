import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(), // 创建一个空的编辑器
  }


  // 获取富文本
  getRichText = () => {
    const { editorState } = this.state;
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  // 根据富文本还原一个编辑器, 且编辑器的有内容和状态一致
  setRichText = (html) => {
    const { editorState } = this.state;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState
      })
    }
  }
  // 编辑器改变的回调(输入了字符, 点击了工具栏的按钮等~)
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          //wrapperClassName="demo-wrapper"
          //editorClassName="demo-editor"
          editorStyle={{ border: '1px solid #ccc', minHeight: 300, paddingLeft: 15 }}
          onEditorStateChange={this.onEditorStateChange}
        />

      </div>
    );
  }
}