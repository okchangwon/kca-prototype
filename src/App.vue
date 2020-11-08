<template>
  <router-view @load="onLoadFile" />
</template>

<script>
import WordsParser from './modules/WordsParser';
import wordStore from './stores/WordStore';

export default {
  name: 'App',
  methods: {
    onLoadFile(body) {
      const parser = new WordsParser(body);

      wordStore.setAnalysisResults(parser.data());

      this.$router.push({path:'result'});
    }
  }
}
</script>

