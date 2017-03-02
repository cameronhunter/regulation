# regulation-ast

Abstract syntax tree definitions and builders for Regulation lang.

## Installation

```
$ npm install --save regulation-ast
```

## API

```javascript
import { builders: t } from 'regulation-ast';

const user = t.rule(t.identifier('User'), [
  t.definition([t.matchLiteral('@＠﹫'), t.matchLiteral('a-zA-Z0-9_', null, t.sizeConstraint(1, 16))])
]);

const hashtag = t.rule(t.identifier('Hashtag'), [
  t.definition([t.stringLiteral('#'), t.matchLiteral('a-zA-Z0-9', '+')])
]);

const ast = t.file(t.program([user, hashtag]), 'twitter.rgl');
```
