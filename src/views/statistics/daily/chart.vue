<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="请选择">
          <el-option label="学员登录数统计" value="login_num"/>
          <el-option label="学员注册数统计" value="register_num"/>
          <el-option label="课程播放数统计" value="video_view_num"/>
          <el-option label="每日课程数统计" value="course_num"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChartData()">查询</el-button>
    </el-form>

    <div class="chart-container">
      <div id="chart" class="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

import daily from '@/api/statistics/daily'

export default {
  data() {
    return {
      searchObj: {
        type: '',
        begin: '',
        end: ''
      },
      btnDisabled: false,
      chart: null,
      title: '',
      xData: [],
      yData: []
    }
  },

  methods: {
    showChartData() {
      this.initChartData()
    },

    // 初始化图表数据
    initChartData() {
      daily.showChart(this.searchObj).then(response => {
        // 设置图表数据
        this.yData = response.data.dataList
        this.xData = response.data.dateList

        // 设置图标标题,当前统计类别
        switch (this.searchObj.type) {
          case 'register_num':
            this.title = '学员注册数统计'
            break
          case 'login_num':
            this.title = '学员登录数统计'
            break
          case 'video_view_num':
            this.title = '课程播放数统计'
            break
          case 'course_num':
            this.title = '每日课程数统计'
            break
        }
        // 先将数据查询出来，再将数据设置到表中
        this.setChartData()
      })
    },

    // 设置图表数据
    setChartData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: this.title
        },
        tooltip: {},
        legend: {
          data: [this.title]
        },
        xAxis: {
          data: this.xData
        },
        yAxis: {},
        series: [{
          name: this.title,
          type: 'line',
          data: this.yData
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }

  }

}
</script>
