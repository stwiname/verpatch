# Verpatch

A simple node wrapper for [Verpatch](http://www.codeproject.com/Articles/37133/Simple-Version-Resource-Tool-for-Windows)

## Getting started

`npm install verpatch`

## Running tests

`npm test`

## Usage

```
var verpatch = require('verpatch');

verpatch('./path/to/executable', '1.0.0', { publisher: 'publisher'});

```

## Options

### Standard Options

* `desc` - description
* `pb` - private build
* `company` - company
* `(c)` - copyright
* `product` - product name
* `pv` - product version

### Other options

You can store any other key/value you wish