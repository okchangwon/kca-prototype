<template>
  <div class="container">
    <h1>카카오톡 대화 분석기</h1>
    <div class="input-wrap">
      <input type="button" id="uploadButtonView" :value="isUploading ? '업로드중...': '파일첨부'" class="input-button" />
      <input type="file" ref="upload" class="input-hidden" @change="onChange" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Uploader',
  data: () => ({
    isUploading: false,
  }),
  methods: {
    onChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      // if (file.type !== "text/plain" && file.type !== "text/csv") {
      //   alert(file.type + " - 잘못된 파일입니다.")
      //   return;
      // }

      this.isUploading = true;

      reader.onload = data => {
        this.isUploading = false;
        this.$emit("load", data.target.result);
      };
      reader.readAsText(file);

      this.$refs.upload.value = "";

      e.preventDefault();
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
  width:300px;
  height:120px;
  margin-left:-150px;
  margin-top:-60px;
  border-radius:20px;
  background-color:#f0f0f0;
}

h1 {
  margin-top:25px;
  text-align:center;
  font-size:17px;
}

.input-wrap
{
  position: relative; 
  width: 90px; 
  height: 30px; 
  overflow: hidden;
  margin:15px auto 0;
}

.input-button
{
  position: absolute; 
  top: 0px;
  width: 100%;
  height:100%;
  background-color: #33BB00;
  color: #FFFFFF;
  border: none;
  border-radius:10px;
  font-size:14px;
}

.input-hidden
{
  font-size: 45px; 
  position: absolute; 
  right: 0px; 
  top: 0px; 
  opacity: 0; 
  cursor:pointer;
  
  filter: alpha(opacity=0); 
  -ms-filter: "alpha(opacity=0)"; 
  -khtml-opacity: 0; 
  -moz-opacity: 0;
}

</style>
