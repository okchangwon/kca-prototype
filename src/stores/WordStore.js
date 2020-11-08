export default {
  debug: true,
  state: {
    analysisResults: {},
  },
  setAnalysisResults (data) {
    this.state.analysisResults = data;
  }
}