import Parse from 'regulation-parser';

function entries(obj) {
    return Object.keys(obj).map(key => [key, obj[key]]);
}

function toJavaScript(def) {
    switch (def.type) {
        case 'regex':
            return {
                type: 'regex',
                value: [
                    `[${def.value}]`,
                    def.operator,
                    def.constraint && def.constraint.length && `{${def.constraint.length}}`,
                    def.constraint && def.constraint.max && `{${def.constraint.min},${def.constraint.max}}`
                ].filter(Boolean).join('')
            }
        case 'literal':
            if (def.value === '/') {
                return { type: 'literal', value: '\\/' };
            } else if (def.value === '$') {
                return { type: 'literal', value: '\\$' };
            }
        default:
            return def;
    }
}

function is(...types) {
    return (a) => types.includes(a.type);
}

function combine(a, b, value = (array) => array.join('')) {
    if (a.type === b.type) {
        return [{ type: a.type, value: value([a.value, b.value]) }];
    }

    const isLiteralOrRegex = is('literal', 'regex');
    if (isLiteralOrRegex(a) && isLiteralOrRegex(b)) {
        return [{ type: 'regex', value: value([a.value, b.value]) }];
    }

    return [a, b];
}

export default (regulation) => {
    const parsed = Parse(regulation);

    const [mainRule] = Object.keys(parsed);
    const definitions = parsed[mainRule];

    return entries(parsed).reduce((result, [rule, definitions]) => {
        const reduced = definitions.map(definition => {
            return definition.map(toJavaScript).reduce((state, current) => {
                const previous = state[state.length - 1];
                if (previous) {
                    const combined = combine(previous, current, (result) => result.join(''));
                    return [...(combined.length === 1 ? state.slice(0, state.length - 1) : state), ...combined];
                } else {
                    return [...state, current];
                }
            }, []);
        }).reduce((state, definition) => {
            return [...state, ...definition];
        }, []).reduce((state, current) => {
            const previous = state[state.length - 1];
            if (previous) {
                const combined = combine(previous, current, (result) => `(${result.join(')|(')})`);
                return [...(combined.length === 1 ? state.slice(0, state.length - 1) : state), ...combined];
            } else {
                return [...state, current];
            }
        }, []).map(v => new RegExp(v.value))[0];

        return { ...result, [rule]: reduced };
    }, {});
};
