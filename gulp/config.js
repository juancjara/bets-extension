var dest = './build/css';
var src = './src/css';

module.exports = {
  less: {
    src: src + '/main.less',
    dest: dest,
    watch: src + '/src/**'
  }
}