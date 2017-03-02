# regulation-parser

A parser for Regulation lang, outputting an AST. The intention of this library
is that Regulation syntax can be parsed and converted into any other language.

See regulation-js for an example conversion from Regulation -> JavaScript.

## Installation

```
$ npm install -g regulation-parser
```

## Usage

```
$ cat ./examples/user.rgl
User
  = [@＠﹫] Username

Username
  = [a-zA-Z0-9_]{1,16}

$ regulation ./examples/user.rgl
{
  "program": {
    "body": [
      {
        "id": {
          "name": "User",
          "loc": {
            "start": {
              "line": 1,
              "column": 1,
              "type": "Position"
            },
            "end": {
              "line": 1,
              "column": 5,
              "type": "Position"
            },
            "source": "User",
            "type": "SourceLocation"
          },
          "type": "Identifier",
          "comments": null,
          "typeAnnotation": null
        },
        "definitions": [
          {
            "tokens": [
              {
                "pattern": "@＠﹫",
                "operator": null,
                "constraint": null,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 5,
                    "type": "Position"
                  },
                  "end": {
                    "line": 2,
                    "column": 10,
                    "type": "Position"
                  },
                  "source": "[@＠﹫]",
                  "type": "SourceLocation"
                },
                "type": "MatchLiteral",
                "comments": null
              },
              {
                "name": "Username",
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 11,
                    "type": "Position"
                  },
                  "end": {
                    "line": 2,
                    "column": 19,
                    "type": "Position"
                  },
                  "source": "Username",
                  "type": "SourceLocation"
                },
                "type": "Identifier",
                "comments": null,
                "typeAnnotation": null
              }
            ],
            "loc": {
              "start": {
                "line": 2,
                "column": 5,
                "type": "Position"
              },
              "end": {
                "line": 2,
                "column": 19,
                "type": "Position"
              },
              "source": "[@＠﹫] Username",
              "type": "SourceLocation"
            },
            "type": "Definition",
            "comments": null
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 1,
            "type": "Position"
          },
          "end": {
            "line": 2,
            "column": 19,
            "type": "Position"
          },
          "source": "User\n  = [@＠﹫] Username",
          "type": "SourceLocation"
        },
        "type": "Rule",
        "comments": null
      },
      {
        "id": {
          "name": "Username",
          "loc": {
            "start": {
              "line": 4,
              "column": 1,
              "type": "Position"
            },
            "end": {
              "line": 4,
              "column": 9,
              "type": "Position"
            },
            "source": "Username",
            "type": "SourceLocation"
          },
          "type": "Identifier",
          "comments": null,
          "typeAnnotation": null
        },
        "definitions": [
          {
            "tokens": [
              {
                "pattern": "a-zA-Z0-9_",
                "operator": null,
                "constraint": {
                  "min": 1,
                  "max": 16,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 17,
                      "type": "Position"
                    },
                    "end": {
                      "line": 5,
                      "column": 23,
                      "type": "Position"
                    },
                    "source": "{1,16}",
                    "type": "SourceLocation"
                  },
                  "type": "SizeConstraint",
                  "comments": null
                },
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 5,
                    "type": "Position"
                  },
                  "end": {
                    "line": 5,
                    "column": 23,
                    "type": "Position"
                  },
                  "source": "[a-zA-Z0-9_]{1,16}",
                  "type": "SourceLocation"
                },
                "type": "MatchLiteral",
                "comments": null
              }
            ],
            "loc": {
              "start": {
                "line": 5,
                "column": 5,
                "type": "Position"
              },
              "end": {
                "line": 5,
                "column": 23,
                "type": "Position"
              },
              "source": "[a-zA-Z0-9_]{1,16}",
              "type": "SourceLocation"
            },
            "type": "Definition",
            "comments": null
          }
        ],
        "loc": {
          "start": {
            "line": 4,
            "column": 1,
            "type": "Position"
          },
          "end": {
            "line": 5,
            "column": 23,
            "type": "Position"
          },
          "source": "Username\n  = [a-zA-Z0-9_]{1,16}",
          "type": "SourceLocation"
        },
        "type": "Rule",
        "comments": null
      }
    ],
    "loc": {
      "start": {
        "line": 1,
        "column": 1,
        "type": "Position"
      },
      "end": {
        "line": 6,
        "column": 1,
        "type": "Position"
      },
      "source": "User\n  = [@＠﹫] Username\n\nUsername\n  = [a-zA-Z0-9_]{1,16}\n",
      "type": "SourceLocation"
    },
    "type": "Program",
    "comments": null,
    "directives": []
  },
  "name": "./examples/twitter.rgl",
  "loc": {
    "start": {
      "line": 1,
      "column": 1,
      "type": "Position"
    },
    "end": {
      "line": 6,
      "column": 1,
      "type": "Position"
    },
    "source": "User\n  = [@＠﹫] Username\n\nUsername\n  = [a-zA-Z0-9_]{1,16}\n",
    "type": "SourceLocation"
  },
  "type": "File",
  "comments": null
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

const ast = parse(regulation);
```
