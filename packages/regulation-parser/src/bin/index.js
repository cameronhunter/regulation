#!/usr/bin/env node

import parse from '../lib';
import cmdline from 'commander';
import pkg from '../../package.json';
import fs from 'fs';

const execute = (input, options) => {
    const regulation = fs.readFileSync(input, 'utf-8');
    const ast = parse(regulation, { sourceFileName: input });
    const output = JSON.stringify(ast, null, 2);

    if (options.output) {
        fs.writeFileSync(options.output, output, 'utf-8');
    } else {
        console.log(output);
    }

    process.exit(0);
};

cmdline
    .version(pkg.version)
    .arguments('<input>')
    .option('-o, --output <FILE>')
    .action(execute)
    .parse(process.argv);

cmdline.help();
