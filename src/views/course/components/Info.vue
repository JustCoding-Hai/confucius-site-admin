<template>
  <div class="app-container">
    <!-- 课程信息表单 -->
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <!-- 所属分类 TODO 后期改成三级联动下拉选择-->
      <el-form-item label="课程类别">
        <!-- 一级分类 -->
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="changeLeveloneSubject"
        >
          <el-option
            v-for="subject in subjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subjectLevelTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 -->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面 -->
      <el-form-item label="课程封面">
        <el-upload
          class="cover-uploader"
          :action="BASE_API+'/admin/oss/file/upload?module=conver'"
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :on-error="handleCoverError"
          :before-upload="beforeCoverUpload"
        >
          <img v-if="courseInfo.cover" :src="courseInfo.cover" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button
        :disabled="saveBtnDisabled"
        type="primary"
        @click="saveAndNext()"
        >保存并下一步</el-button
      >
    </div>
  </div>
</template>

<script>
import courseApi from "@/api/course";
import teacherApi from "@/api/teacher";
import subjectApi from "@/api/subject";
import Tinymce from "@/components/Tinymce";

export default {
  components: {
    Tinymce,
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false,
      courseInfo: {
        price: 0,
        lessonNum: 0,
        // 以下解决表单数据不全时insert语句非空校验
        teacherId: "",
        subjectId: "",
        subjectParentId: "",
        cover: "",
        description: "",
      },
      teacherList: [], //讲师列表
      subjectList: [], //课程分类列表
      subjectLevelTwoList: [], //课程二级分类列表
    };
  },
  created() {
    this.initSubjectList();
    this.initTeacherList();
    if(this.$parent.courseId){
      this.fetchCourseInfoById(this.$parent.courseId);
    }

  },
  methods: {
    initTeacherList() {
      teacherApi.list().then((response) => {
        this.teacherList = response.data;
      });
    },
    initSubjectList() {
      subjectApi.getNestedTreeList().then((response) => {
        this.subjectList = response.data;
      });
    },
    saveAndNext() {
      this.saveBtnDisabled = true;
      if(this.$parent.courseId){
        this.updateCourseInfo()
      }else{
        this.saveData();
      }
      this.$parent.active = 1;
    },
    saveData() {
      courseApi.saveCourseInfo(this.courseInfo).then((response) => {
        this.$parent.courseId = response.data;
      });
    },
    changeLeveloneSubject(subjectId) {
      this.courseInfo.subjectId = "";
      this.subjectList.forEach((subject) => {
        if (subject.id === subjectId) {
          this.subjectLevelTwoList = subject.children;
        }
      });
    },
    // 上传成功回调
    handleCoverSuccess(res, file) {
      if (res.success) {
        // console.log(res)
        this.courseInfo.cover = res.data;
        // 强制重新渲染
        this.$forceUpdate();
      } else {
        this.$message.error("上传失败!");
      }
    },

    // 上传校验
    beforeCoverUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      console.log(!(isJPG || isPNG));

      if (!(isJPG || isPNG)) {
        this.$message.error("上传头像图片只能是JPG或PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    // 错误处理
    handleCoverError() {
      this.$message.error("上传失败!");
    },
    fetchCourseInfoById(id) {
      courseApi.getCourseInfoById(id).then((response) => {
        this.courseInfo = response.data;
        //回填课程二级分类信息
        subjectApi.getNestedTreeList().then((response) => {
        this.subjectList = response.data;
        this.subjectList.forEach(subject=>{
          if(subject.id==this.courseInfo.subjectParentId){
            this.subjectLevelTwoList=subject.children;
          }
        });
        })
        // console.log("the subjectList"+this.subjectList)
        //  this.subjectList.forEach(subject=>{
        //   if(subject.id==this.courseInfo.subjectParentId){
        //     this.subjectLevelTwoList=subject.children;
        //   }
        // });
      });
    },
    updateCourseInfo(){
      courseApi.updateCourseInfo(this.courseInfo)
    }
  },
};
</script>

<style>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader .el-upload:hover {
  border-color: #409eff;
}
.cover-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 640px;
  height: 357px;
  line-height: 357px;
  text-align: center;
}
.cover-uploader img {
  width: 640px;
  height: 357px;
  display: block;
}
</style>