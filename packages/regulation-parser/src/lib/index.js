import Parser from './grammar.pegjs';
import { DepGraph as DependencyGraph } from 'dependency-graph';

function entries(obj) {
    return Object.keys(obj).map(key => [key, obj[key]]);
}

function parse(regulation) {
    const input = regulation || '';
    const cleaned = input.replace(/[\r]/g, '').trim();

    return cleaned ? Parser.parse(cleaned) : {};
}

function getDependencyOrder(ast) {
    const addNodes = (graph, rule) => {
        graph.addNode(rule);
        return graph;
    };

    const addDependencies = (graph, [rule, definitions]) => {
        definitions
            .reduce((state, defs) => [...state, ...defs], [])
            .filter(def => def.type === 'rule')
            .forEach(def => graph.addDependency(rule, def.value));

        return graph;
    };

    const graph = Object.keys(ast).reduce(addNodes, new DependencyGraph());

    return entries(ast).reduce(addDependencies, graph).overallOrder();
}

export default (regulation) => {
    const ast = parse(regulation);
    const dependencyOrder = getDependencyOrder(ast);

    return dependencyOrder.reduce((state, dependency) => {
        return entries(state).reduce((s, [rule, definitions]) => {
            const newDef = definitions.map(def => {
                return def.reduce((ns, d) => {
                    const replacement = state[dependency].length === 1 ? state[dependency][0] : state[dependency];
                    return d.type === 'rule' && d.value === dependency ? [...ns, ...replacement] : [...ns, d];
                }, []);
            });

            return Object.assign({}, s, { [rule]: newDef });
        }, {});
    }, ast);
};
