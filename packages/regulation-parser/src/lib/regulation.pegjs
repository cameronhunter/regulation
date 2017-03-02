{
    const { builders: t } = require('regulation-ast');

    const withSourceLocation = (node, location, source = null) => {
        const loc = t.sourceLocation(
          t.position(location.start.line, location.start.column),
          t.position(location.end.line, location.end.column),
          source
        );

        return { ...node, loc };
    };
}

Regulation "Regulation"
  = rules:(_ comments:Comment* _ rule:Rule { return { ...rule, comments: comments.length ? comments : null } })* _
    {
      return withSourceLocation(
        t.file(
          withSourceLocation(t.program(rules), location(), text())
        ),
        location(),
        text()
      )
    }

Rule "Rule"
  = identifier:Identifier _ "=" _ head:Definition tail:(_ "/" _ definition:Definition { return definition; })*
    { return withSourceLocation(t.rule(identifier, [head, ...tail]), location(), text()) }

Definition "Definition"
  = head:Token tail:(Space+ token:Token { return token })*
    { return withSourceLocation(t.definition([head, ...tail]), location(), text()) }

Token "Token"
  = "!" Space* literal:Literal
    { return withSourceLocation(t.unaryExpression('!', literal), location(), text()) }
  / Literal

Literal "Literal"
  = Identifier
  / String
  / Match

Identifier "Identifier"
  = name:$([a-z]i+)
    { return withSourceLocation(t.identifier(name), location(), text()) }

String "String"
  = "'" value:$([^']+) "'"
    { return withSourceLocation(t.stringLiteral(value), location(), text()) }
  / '"' value:$([^"]+) '"'
    { return withSourceLocation(t.stringLiteral(value), location(), text()) }

Match "Match"
  = "[" pattern:$([^\]]+) "]" constraint:Constraint
    { return withSourceLocation(t.matchLiteral(pattern, null, constraint), location(), text()) }
  / "[" pattern:$([^\]]+) "]" operator:("+" / "*" / "?")?
    { return withSourceLocation(t.matchLiteral(pattern, operator), location(), text()) }

Constraint "Constraint"
  = "{" Space* size:$([0-9]+) Space* "}"
    { return withSourceLocation(t.sizeConstraint(Number(size), Number(size)), location(), text()) }
  / "{" Space* min:$([0-9]+) Space* "," Space* "}"
    { return withSourceLocation(t.sizeConstraint(Number(min), Infinity), location(), text()) }
  / "{" Space* min:$([0-9]+) Space* "," Space* max:$([1-9][0-9]*) Space* "}"
    { return withSourceLocation(t.sizeConstraint(Number(min), Number(max)), location(), text()) }

Comment
  = '#' value:$([^\n]*) [\n]
    { return value.trim() }

Space "Space"
  = [ ]

_ "Whitespace"
  = [ \t\r\n]*
