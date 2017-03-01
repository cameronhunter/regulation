import Parser from './regulation.pegjs';

export default (regulation, options) => {
    const { sourceFileName } = options || {};

    return {
        ...Parser.parse(regulation || ''),
        name: sourceFileName
    };
};
