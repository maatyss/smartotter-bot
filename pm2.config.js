module.exports = {
  apps : [
    {
    name      : 'smartotter-bot',
    script    : 'src/index.js',
    node_args : '-r dotenv/config',
  }
  ],
}