<template>
  <div class="app-container">
    <!-- 添加章节按钮 -->
    <div>
      <el-button type="primary" @click="addChapter()">添加章节</el-button>
    </div>

    <!-- 章节列表 -->
    <ul class="chapterList">
      <li v-for="chapter in chapterList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="addVideo(chapter.id)">添加课时</el-button>
            <el-button type="text" @click="editChapter(chapter.id)">编辑</el-button>
            <el-button type="text" @click="removeChapterById(chapter.id)">删除</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chapterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <el-tag v-if="!video.videoSourceId" size="mini" type="danger">
                {{ "尚未上传视频" }}
              </el-tag>
              <span class="acts">
                <el-tag v-if="video.free" size="mini" type="success">{{
                  "免费观看"
                }}</el-tag>
                <el-button type="text" @click="editVideo(chapter.id,video.id)">编辑</el-button>
                <el-button type="text" @click="deleteVideo(video.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 章节表单对话框 -->
    <chapter-form ref="chapterForm"/>

    <!-- 课时表单对话框  -->
    <video-form ref="VideoForm"/>

    <div style="text-align: center">
      <el-button type="primary" @click="prev()">上一步</el-button>
      <el-button type="primary" @click="next()">下一步</el-button>
    </div>
  </div>
</template>

<script>

// 引入组件
import VideoForm from '@/views/course/components/Video/Form'
import ChapterForm from '@/views/course/components/Chapter/Form'
//引入api
import videoApi from '@/api/video'


import chapterApi from '@/api/chapter'
export default {

  components: {ChapterForm,VideoForm},
  data() {
    return {
      chapterList: [], //章节嵌套列表
    };
  },
  created(){
    this.fetchNodeList()
  },
  methods: {
    // 获取章节数据
    fetchNodeList() {
      chapterApi.getNestedTreeList(this.$parent.courseId).then((response) => {
        this.chapterList = response.data;
      });
    },
    //根据id删除章节信息
    removeChapterById(chapterId) {
      this.$confirm("此操作将永久删除该章节及其课时，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return chapterApi.removeById(chapterId);
        })
        .then((response) => {
          this.fetchNodeList();
        })
        .catch((response) => {
          if (response === "cancel") {
            this.$message.info("取消删除");
          }
        });
    },
    addChapter(){
      this.$refs.chapterForm.open();
    },
    editChapter(chapterId){
      this.$refs.chapterForm.open(chapterId);
    },
    prev() {
      this.$parent.active = 0;
    },
    next() {
      this.$parent.active = 2;
    },
    addVideo(chapterId){
      this.$refs.VideoForm.open(chapterId)
    },
    editVideo(chapterId,videoId){
      this.$refs.VideoForm.open(chapterId,videoId)
    },
    deleteVideo(videoId){
      this.$confirm('此操作将永久删除该课时, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          return videoApi.removeById(videoId)
      }).then(response => {
          this.fetchNodeList()
      }).catch((response) => {
          if (response === 'cancel') {
              this.$message.info('取消删除')
          }
      })
    }
  },
};
</script>

<style>
.chapterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chapterList li {
  position: relative;
}
.chapterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chapterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dashed #ddd;
}
</style>