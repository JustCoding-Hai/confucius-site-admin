<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="入驻时间">
        <el-date-picker v-model="teacher.joinDate" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
            -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" />
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" :rows="10" type="textarea" />
      </el-form-item>
      <!-- 讲师头像-->
      <el-form-item label="讲师头像">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API+'/admin/oss/file/upload?module=avatar'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate()"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from "@/api/teacher";

export default {
  data() {
    return {
      BASE_API: process.env.BASE_API,
      // 初始化讲师默认数据
      teacher: {
        sort: 0,
        level: 1,
        avatar:'',
      },
      saveBtnDisabled: false, // 保存按钮是否禁用，防止表单重复提交
    };
  },
  created() {
    console.log("teacher form created");
    if (this.$route.params.id) {
      this.getTeacherById(this.$route.params.id);
    }
  },
  methods: {
    saveOrUpdate() {
      this.saveBtnDisabled = true;
      if (this.$route.params.id) {
        this.updateTeacher();
      } else {
        this.saveData();
      }
    },
    saveData() {
      teacherApi.save(this.teacher).then((response) => {
        this.$router.push({ path: "/teacher/list" });
      });
    },
    getTeacherById(id) {
      teacherApi.getById(id).then((response) => {
        this.teacher = response.data;
      });
    },
    updateTeacher() {
      teacherApi.updateById(this.teacher).then((response) => {
        this.$router.push({ path: "/teacher/list" });
      });
    },
    //文件上传前的校验
    beforeAvatarUpload(file){

        const isJPG = file.type === 'image/jpeg'
        const isPNG =file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        console.log(!(isJPG||isPNG));

        if (!(isJPG||isPNG)) {
          this.$message.error('上传头像图片只能是JPG或PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return (isJPG || isPNG) && isLt2M
    },
    //文件上传成功
    handleAvatarSuccess(response){
      if(response.success){
              this.teacher.avatar=response.data;
      //强制页面重新渲染
      this.$forceUpdate();
      }else{
        this.$message.error(response.message);
      }
    },
    handleAvatarError(){
      this.$message.error('http请求失败！')
    }
  },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader img {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>