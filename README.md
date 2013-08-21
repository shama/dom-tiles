# dom-tiles
Load CSS tiles for a DOM tilemap.

Checkout [dom-tilemap](https://github.com/shama/dom-tilemap) for rendering these tiles into the DOM.

## api

### `var tiles = require('dom-tiles')(options)`
`options` are:

- `size` Default: `16` Size of each tile in pixels.
- `prefix` Default: `'tile-'` A prefix to give each CSS selector.
- `tiles` Default: `null` A set of tiles to load in at init.
- `tilemap` Default: `null` A ndarray tilemap to load in at init.

### `var index = tiles.add(key, tile)`
Add a new tile:

```js
// Add a new tile named 'rock' that is a colored 'R'
var idx = tiles.add('rock', {
  text: 'R',
  bg: '#333',
  color: '#fff',
})
```

### `tiles.addTilemap(ndarray)`
Adds a tilemap based on a ndarray:

```js
// Add a tile map and add a tile from that texture atlas
var terrain = require('isabella-texture-pack')
tiles.addTilemap(terrain)
tiles.add('dirt', {
  tilemap: [0, 2]
})
```

### `tiles.addAlphabet()`
Add tiles that represent the alphabet.

### `tiles.index`
The index of tiles loaded.

### `tiles.length`
The amount of tiles that have been loaded.

### `tiles.style`
The STYLE DOM element.

## Release History
* 0.1.0 - initial release

## License
Copyright (c) 2013 Kyle Robinson Young  
Licensed under the MIT license.
