var savePx = require('save-pixels')

function Tiles(opts) {
  var self = this
  if (!(this instanceof Tiles)) return new Tiles(opts)
  opts = opts || {}
  this.size = opts.size || 16
  this.prefix = opts.prefix || 'tile-'
  this.index = Object.create(null)
  this.length = 0
  this.style = document.createElement('style')
  this.style.type = 'text/css'
  if (opts.tiles) {
    Object.keys(opts.tiles).forEach(function(k) {
      self.add(k, opts.tiles[k])
    })
  }
  this.addAlphabet()
  if (opts.tilemap) {
    this.addTilemap(opts.tilemap)
  }
  document.getElementsByTagName('head')[0].appendChild(this.style)
}
module.exports = Tiles

Tiles.prototype.add = function(k, tile) {
  var key = this.prefix + this.length
  tile.index = this.length
  this.index[k] = tile
  var css = this.style.innerHTML
  css += [
    '.' + key + ' {',
      'width: ' + this.size + 'px;',
      'height: ' + this.size + 'px;',
      'overflow: hidden;',
      'color: ' + (tile.color || '#000') + ';',
      'background-repeat: no-repeat;',
      'background-position: 9999px 9999px;',
    ].join(' ')

  if (tile.bg) css += 'background-color: ' + tile.bg + '; '
  if (tile.tilemap) css += 'background-position: -' + (this.size * tile.tilemap[0]) + 'px -' + (this.size * tile.tilemap[1]) + 'px; '

  css += '} '

  if (tile.text) css += '.' + key + ':after { content: "' + tile.text + '"; } '
  this.style.innerHTML = css
  this.length++

  return tile.index
}

Tiles.prototype.addTilemap = function(arr) {
  var canvas = savePx(arr, 'CANVAS')
  this.style.innerHTML += 'div { background-image: url("' + canvas.toDataURL('image/png') + '"); } '
  var w = Math.floor(arr.shape[0] / this.size)
  var h = Math.floor(arr.shape[1] / this.size)
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      this.add('tilemap-' + x + '-' + y, {
        tilemap: [x, y]
      })
    }
  }
}

Tiles.prototype.addAlphabet = function() {
  var self = this
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*-+~?<>.'.split('').forEach(function(l) {
    self.add(l, {text: l})
  })
}
