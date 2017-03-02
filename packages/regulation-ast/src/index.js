import types from 'ast-types';

const { Type: { def, or } } = types;

def('Constraint')
    .bases('Node');

def('SizeConstraint')
    .bases('Constraint')
    .build('min', 'max')
    .field('min', Number)
    .field('max', or(Number, null), () => null);

const MatchOperator = or('+', '*', '?');

def('MatchLiteral')
    .bases('Expression')
    .build('pattern', 'operator', 'constraint')
    .field('pattern', String)
    .field('operator', or(MatchOperator, null), () => null)
    .field('constraint', or(def('Constraint'), null), () => null);

def('Definition')
    .bases('Node')
    .build('tokens')
    .field('tokens', [def('Expression')]);

def('Rule')
    .bases('Statement')
    .build('id', 'definitions')
    .field('id', def('Identifier'))
    .field('definitions', [def('Definition')]);

types.finalize();

export default types;
