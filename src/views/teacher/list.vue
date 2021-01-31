<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true">

      <el-form-item>
        <!-- <el-input v-model="searchObj.name" placeholder="讲师" /> -->
        <el-autocomplete
         v-model="searchObj.name"
         :fetch-suggestions="querySearch"
         :trigger-on-focus="false"
         class="inline-input"
         placeholder="讲师名称"
         value-key="name" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="头衔">
          <el-option value="1" label="高级讲师" />
          <el-option value="2" label="首席讲师" />
        </el-select>
      </el-form-item>

      <el-form-item label="入驻时间">
        <el-date-picker
          v-model="searchObj.joinDateBegin"
          placeholder="开始时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.joinDateEnd"
          placeholder="结束时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      @selection-change="handlerSelectionChange"
      :data="teacherList"
      border
      stripe
    >
      <el-table-column type="selection" />
      <el-table-column label="#" width="50">
        <template slot-scope="scope">
          {{ (page - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === 1" type="success" size="mini"
            >高级讲师</el-tag
          >
          <el-tag v-if="scope.row.level === 2" size="mini">首席讲师</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="简介" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column prop="joinDate" label="入驻时间" width="160" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: space-between; margin: 30px 0">
      <el-button type="danger" size="mini" @click="deleteBatch()"
        >删除</el-button
      >
      <!-- 分页组件 -->
      <el-pagination
        :current-page="page"
        :total="total"
        :page-size="size"
        :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
        layout="total,sizes, prev, pager, next, jumper"
        @size-change="changePageSize"
        @current-change="changeCurrentPage"
      />
    </div>
  </div>
</template>

<script>
import teacherApi from "@/api/teacher";

export default {
  //定义数据模型
  data() {
    return {
      teacherList: [], //讲师列表
      total: 0, //数据总数
      page: 1, //页数
      size: 5, //每页的数据数
      searchObj: {}, //查询条件
      multipleSelection: [], //批量删除选中记录
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      // teacherApi.list().then(response=>{
      //     this.teacherList=response.data;
      //     console.log(this.teacherList);
      // })
      teacherApi
        .pageList(this.page, this.size, this.searchObj)
        .then((response) => {
          this.teacherList = response.data.records;
          this.total = response.data.total;
        });
    },
    changePageSize(size) {
      this.size = size;
      this.fetchData();
    },
    changeCurrentPage(page) {
      this.page = page;
      this.fetchData();
    },
    resetData() {
      this.searchObj = {};
      this.fetchData();
    },
    deleteById(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return teacherApi.deleteById(id);
        })
        .then((response) => {
          this.fetchData();
        })
        .catch((error) => {
          console.log("error", error);
          // 当取消时会进入catch语句:error = 'cancel'
          // 当后端服务抛出异常时：error = 'error'
          if (error === "cancel") {
            this.$message.info("取消删除");
          }
        });
    },
    handlerSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    deleteBatch() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请选择要删除的数据！");
      }
      this.$confirm("此操作将永久删除【"+this.multipleSelection.length+"】条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var idList=[]
          this.multipleSelection.forEach(item=>{
            idList.push(item.id)
          })
          return teacherApi.deleteByIds(idList);
        })
        .then((response) => {
          this.fetchData();
        })
        .catch((error) => {
          if (error === "cancel") {
            this.$message.info("取消删除");
          }
        });
    },
    querySearch(queryString, cb) {
    teacherApi.selectNameListByKey(queryString).then(response => {
        cb(response.data)
    })
}
  },
};
</script>