# regulation-js

Convert Regulation lang to JavaScript regular expressions.

## Installation

```
$ npm install -g regulation-js
```

## Usage

```
$ regulation-js ./examples/twitter.regu
module.exports = {
  Entity: /([@＠﹫][a-zA-Z0-9_]{1,16}\/[a-zA-Z0-9]+)|([@＠﹫][a-zA-Z0-9_]{1,16})/,
  User: /[@＠﹫][a-zA-Z0-9_]{1,16}/,
  List: /[@＠﹫][a-zA-Z0-9_]{1,16}\/[a-zA-Z0-9]+/,
  Screenname: /[a-zA-Z0-9_]{1,16}/
};
```

## API

```javascript
import parse from 'regulation-js';

const regulation = `
Entity
  = List
  / User

User
  = [@＠﹫] Screenname

List
  = User '/' [a-zA-Z0-9]+

Screenname
  = [a-zA-Z0-9_]{1,16}
`;

const { Entity } = parse(regulation);

console.assert(Entity.test('@cameronhunter'));
console.assert(Entity.test('@cameronhunter/my-list'));
console.assert(!Entity.test('#hashtag'));
```
