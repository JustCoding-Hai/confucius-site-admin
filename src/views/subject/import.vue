<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a :href="defaultExcelTemplate">点击下载模版</a>
        </el-tag>
      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-exceed="fileUploadExceed"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :limit="1"
          :action="BASE_API+'/admin/edu/subject/import'"
          name="file"
          accept="application/vnd.ms-excel"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            :disabled="importBtnDisabled"
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload()"
            >导入</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API,
      defaultExcelTemplate:
        process.env.OSS_PATH + "/excel/课程分类列表模板.xls", // 默认Excel模板
      importBtnDisabled: false, // 导入按钮是否禁用
    };
  },
  methods: {
    //控制文件上传数量
    fileUploadExceed() {
      this.$message.warning("只能选取一个文件！");
    },
    //提交文件上传
    submitUpload() {
      this.importBtnDisabled = true;
      this.$refs.upload.submit();
    },
    //提交文件成功的回调函数
    fileUploadSuccess(response) {
      if (response.success) {
        this.$message.success(response.message);
        this.importBtnDisabled = false;
        this.$refs.upload.clearFiles();
      }else{
        this.$message.error(response.message);
      }
    },
    //提交文件失败的回调函数
    fileUploadError(err) {
      this.$message.error(response.message);
      this.importBtnDisabled = false;
      this.$refs.upload.clearFiles();
    },
  },
};
</script>