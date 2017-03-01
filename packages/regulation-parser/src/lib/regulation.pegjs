{
    const { types: { builders: t } } = require('recast');

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
  = rules:(_ rule:Rule { return rule })* _
    {
      return withSourceLocation(
        t.file(
          withSourceLocation(
            t.program([
              ...rules.map(rule => ({ ...t.exportNamedDeclaration(rule, []), loc: rule.loc })),
              { ...t.exportDefaultDeclaration(rules[0].declarations[0].id), loc: rules[0].loc }
            ]),
            location(),
            text()
          )
        ),
        location(),
        text()
      )
    }

Rule "Rule"
  = identifier:Identifier _ "=" _ definitions:Definitions
    {
      return withSourceLocation(
        t.variableDeclaration('const', [
          withSourceLocation(t.variableDeclarator(identifier, definitions), location(), text())
        ]),
        location(),
        text()
      )
    }

Definitions "Definitions"
  = head:Definition tail:(_ "/" _ definition:Definition { return definition; })*
    { return withSourceLocation(t.sequenceExpression([head, ...tail]), location(), text()) }

Definition "Definition"
  = head:Token tail:(Space+ token:Token { return token })*
    { return withSourceLocation(t.sequenceExpression([head, ...tail]), location(), text()) }

Token "Token"
  = String
  / Regex
  / Identifier

Identifier "Identifier"
  = name:$([a-z]i+)
    { return withSourceLocation(t.identifier(name), location(), text()) }

Regex "Regex"
  = pattern:$("[" [^\]]+ "]" "{" Space* length:$([0-9]+) Space* "}")
    { return withSourceLocation(t.literal(new RegExp(pattern)), location(), text()) } // TODO: Handle constraints
  / pattern:$("[" [^\]]+ "]" "{" Space* min:$([0-9]+) Space* "," Space* max:$([0-9]+) "}")
    { return withSourceLocation(t.literal(new RegExp(pattern)), location(), text()) } // TODO: Handle constraints
  / pattern:$("[" [^\]]+ "]" operator:("+" / "*" / "?")?)
    { return withSourceLocation(t.literal(new RegExp(pattern)), location(), text()) } // TODO: Handle operators

String "String"
  = "'" value:$([^']+) "'"
    { return withSourceLocation(t.literal(value), location(), text()) }
  / '"' value:$([^"]+) '"'
    { return withSourceLocation(t.literal(value), location(), text()) }

Space "Space"
  = [ ]

_ "Whitespace"
  = [ \t\r\n]*
