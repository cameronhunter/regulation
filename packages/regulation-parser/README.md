# regulation-parser

A parser for Regulation lang, outputting JSON. The intention of this library is
that Regulation syntax can be parsed and converted into any other language.

See regulation-js for an example conversion from Regulation -> JavaScript.

## Installation

```
$ npm install -g regulation-parser
```

## Usage

```
$ regulation ./examples/twitter.rgl
{
  "Entity": [
    [
      {
        "type": "regex",
        "value": "@＠﹫"
      },
      {
        "type": "regex",
        "value": "a-zA-Z0-9_",
        "constraint": {
          "min": "1",
          "max": "16"
        }
      },
      {
        "type": "literal",
        "value": "/"
      },
      {
        "type": "regex",
        "value": "a-zA-Z0-9",
        "operator": "+"
      }
    ],
    [
      {
        "type": "regex",
        "value": "@＠﹫"
      },
      {
        "type": "regex",
        "value": "a-zA-Z0-9_",
        "constraint": {
          "min": "1",
          "max": "16"
        }
      }
    ]
  ],
  "User": [
    [
      {
        "type": "regex",
        "value": "@＠﹫"
      },
      {
        "type": "regex",
        "value": "a-zA-Z0-9_",
        "constraint": {
          "min": "1",
          "max": "16"
        }
      }
    ]
  ],
  "List": [
    [
      {
        "type": "regex",
        "value": "@＠﹫"
      },
      {
        "type": "regex",
        "value": "a-zA-Z0-9_",
        "constraint": {
          "min": "1",
          "max": "16"
        }
      },
      {
        "type": "literal",
        "value": "/"
      },
      {
        "type": "regex",
        "value": "a-zA-Z0-9",
        "operator": "+"
      }
    ]
  ],
  "Screenname": [
    [
      {
        "type": "regex",
        "value": "a-zA-Z0-9_",
        "constraint": {
          "min": "1",
          "max": "16"
        }
      }
    ]
  ]
}
```

## API

```javascript
import parse from 'regulation-parser';

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

const parsed = parse(regulation);
```
