#!/usr/bin/env node

import parse from '../lib';
import cmdline from 'commander';
import prettier from 'prettier';
import { serialize } from 'serialize-to-js';
import pkg from '../../package.json';
import fs from 'fs';

const format = (source) => prettier.format(source, {
    tabWidth: 2
});

const execute = (input, options) => {
    const regulation = fs.readFileSync(input, 'utf-8');
    const output = format(`module.exports = ${serialize(parse(regulation))};`);

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
