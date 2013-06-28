var port  = 8000
var http  = require('http')
var spawn = require('child_process').spawn
var myIp  = require('my-local-ip')()
var fs    = require('fs')
var cp = spawn('tar', ['-cz', process.argv[2]])

var file = '/tmp/dist.tgz'

cp.stdout.pipe(fs.createWriteStream(file))

http.createServer(function (req, res) {
  req.resume()
  if(req.url === '/dist.tgz') {
    console.log('dist')
    fs.createReadStream(file).pipe(res)
  }else
    res.end('curl ' + myIp + ':' + port + '/dist.tgz | tar -zx ; cd distributed\n')
}).listen(port)
