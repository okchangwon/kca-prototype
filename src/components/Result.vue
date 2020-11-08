<template>
  <div class="container">
    <h1>분석 결과</h1>
    <div class="date">
      {{ startDate }} ~ {{ endDate }} 
    </div>
    <div class="tabs">
      <a href="#" class="tab" :class="{selected:tab==='1'}" @click.prevent="tab='1'">개요</a>
      <a href="#" class="tab" :class="{selected:tab==='2'}" @click.prevent="tab='2'">사용자별</a>
      <a href="#" class="tab" :class="{selected:tab==='3'}" @click.prevent="tab='3'">키워드별</a>
    </div>

    <div class="content" v-show="tab==='1'">
      <table align="center">
        <colgroup>
          <col width="100" />
          <col width="150" />
        </colgroup>
        <tr>
            <th>총 대화 수</th><td>{{ comma(count) }}건</td>
        </tr>
        <tr>
            <th>대화자 수</th><td>{{ comma(nameCount) }}명</td>
        </tr>
        <tr>
            <th>분석 단어 수</th><td>{{ comma(wordCount) }}개</td>
        </tr>
      </table>
    </div>

    <div class="content" v-show="tab==='2'">
      <div ref="nameChart"></div>
    </div>

    <div class="content" v-show="tab==='3'">
      <div ref="wordChart"></div>
    </div>
  </div>
</template>

<script>
// base css
import "billboard.js/dist/theme/insight.css";
import bb, {pie} from "billboard.js"

import wordStore from '../stores/WordStore';

export default {
  name: 'Result',
  data: () => ({
    tab: "1",
    analysisResults: wordStore.state.analysisResults,
    nameChart: null,
    wordChart: null,
  }),
  computed: {
    startDate(){
      return this?.analysisResults?.date ? this?.analysisResults?.date[0] : '';
    },
    endDate(){
      return this?.analysisResults?.date ? this?.analysisResults?.date[1] : '';
    },
    count(){
      return this?.analysisResults?.count || 0;
    },
    nameCount() {
      return this?.analysisResults?.names?.length || 0;
    },
    wordCount() {
      return this?.analysisResults?.words?.length || 0;
    },
    nameRanking() {
      return this?.analysisResults?.nameRanking || [];
    },
    wordRanking() {
      return this?.analysisResults?.wordRanking || [];
    }
  },
  watch: {
    tab: function(v) {
      if (v === "2") {
        if (!this.nameChart) {
          this.$nextTick(() => {
            this.nameChart = this.initNameChart();
          });
        }
      }

      if (v === "3") {
        if (!this.wordChart) {
          this.$nextTick(() => {
            this.wordChart = this.initWordChart();
          });
        }
      }
    }
  },
  created() {
    if (!this.analysisResults.date) {
      // this.$router.push({path:'/'});
      return;
    }
  },
  mounted() {
    
  },
  methods: {
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    initNameChart() {
      return bb.generate({
        data: {
          columns: this.nameRanking.slice(0, 5),
          type: pie(), // for ESM specify as: pie()
        },
        bindto: this.$refs.nameChart
      });
    },
    initWordChart() {
      return bb.generate({
        data: {
          columns: this.wordRanking.slice(0, 10),
          type: pie(), // for ESM specify as: pie()
        },
        bindto: this.$refs.wordChart
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position:fixed;
  left:50%;
  top:50%;
  width:500px;
  height:500px;
  margin-left:-250px;
  margin-top:-250px;
  border-radius:20px;
  background-color:#f0f0f0;
}

h1 {
  margin-top:25px;
  text-align:center;
  font-size:17px;
}

.date {
  margin:10px auto;
  text-align:center;
}

.tabs {
  text-align:center;
}

.tab {
  display:inline-block;
  width:80px;
  border-radius:10px;
  background-color:#fff;
  padding:5px 0px;
  text-decoration:none;
  color:#000;
  margin:0 2px;
  border:1px solid #fff;
  box-sizing:border-box;
  font-size:15px;
}

.tab:hover {
  border:1px solid #bbb;
}

.tab.selected {
  background-color:#999;
  font-weight:bold;
  color:#fff;
  border-color:#999;
}

.content {
  margin-top:20px;
}

.content table {
  border-collapse:collapse;
  margin:20px auto;
}

.content th,
.content td {
  padding:10px;
  border:1px solid #ccc;
}
</style>