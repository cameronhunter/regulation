Regulation "Regulation"
  = rules:(_ rule:Rule { return rule })* _
    { return rules.reduce((state, { name, definitions }) => Object.assign({}, state, { [name]: definitions }), {}) }

Rule "Rule"
  = name:Name _ "=" _ head:Definition tail:(_ "/" _ def:Definition { return def; })*
    { return { name: name.value, definitions: [head, ...tail] } }

Definition "Definition"
  = head:Entity tail:(Space+ entity:Entity { return entity })*
    { return [head, ...tail] }

Entity "Entity"
  = Literal
  / Regex
  / Name

Name "Name"
  = value:$([a-z]i+)
    { return { type: 'rule', value } }

Regex "Regex"
  = "[" value:$([^\]]+) "]" "{" Space* length:$([0-9]+) Space* "}"
    { return { type: 'regex', value, constraint: { length } } }
  / "[" value:$([^\]]+) "]" "{" Space* min:$([0-9]+) Space* "," Space* max:$([0-9]+) "}"
    { return { type: 'regex', value, constraint: { min, max } } }
  / "[" value:$([^\]]+) "]" operator:("+" / "*" / "?")?
    { return { type: 'regex', value, operator } }

Literal "Literal"
  = "'" value:$([^']+) "'"
    { return { type: 'literal', value } }
  / '"' value:$([^"]+) '"'
    { return { type: 'literal', value } }

Space "Space"
  = [ ]

_ "Whitespace"
  = [ \t\r\n]*
