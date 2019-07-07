var app = new Vue({
  el: '#app',
  data: {
    items: null,
    keyword: '',
    message: ''
  },
  watch: {
    keyword: function(newValue, oldValue){
      this.message = '入力中...'
      this.debouncedGetAnswer()
    }
  },
  created: function(){
    //lodashのdebounceで入力すぐにAPIが実行されないようにする
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 2000)
  },
  methods: {
    getAnswer: function(){
      if(this.keyword === ''){
        this.items = null
        this.message = ''
        return
      }

      this.message = 'Loading...'
      var vm = this
      var params = { page: 1, per_page: 10, query: this.keyword }
      axios.get('https://qiita.com/api/v2/items', { params })
        .then(function(response){
          console.log(response)
          vm.items = response.data
        })
        .catch(function(error){
          vm.message = 'Error!' + error
        })
        .finally(function(){
          vm.message = ''
        })
    }
  }
})
