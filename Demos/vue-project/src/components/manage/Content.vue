<template>
  <div :class="[classNames + '-container']">
    <router-link to="/manage/test1">test1</router-link>
    <router-link to="/manage/test2">test2</router-link>
    <router-link to="/manage/testy">tesy</router-link>
    <router-link to="/manage/test2/test222">test222</router-link>
    <router-link to="/manage/test2/test2-2">test2-2</router-link>
    <router-view />
    <div class="edit_container">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
      <button v-on:click="saveHtml">保存</button>
    </div>
  </div>
</template>

<script>
const classNames = "his-manage-content";
export default {
  data() {
    return {
      content: `<p>hello world</p>`,
      editorOption: {},
      classNames: classNames
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml: function(event) {
      alert(this.content);
    }
  }
};
</script>
