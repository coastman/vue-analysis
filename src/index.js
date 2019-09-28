import Vue from './core/index'

new Vue({
  el: '#app',
  data: {
    a: 1,
  },
  render() {
    return <div id="app">
      <h1>
        <p>hello</p>
      </h1>  
    </div>
  }
})