'use strict';

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const target = process.argv[2] ?? 'all';

const roots =
	target === 'all'
		? ['leetcode', 'problems', 'interviews', 'fundamentals']
		: [target];

const files = [];

for (const root of roots) {
	const absRoot = path.join(ROOT, root);
	if (!fs.existsSync(absRoot)) {
		continue;
	}

	walk(absRoot);
}

if (files.length === 0) {
	console.log(`No runnable test files found for target "${target}".`);
	process.exit(0);
}

let passed = 0;
let failed = 0;

for (const file of files) {
	try {
		execFileSync(process.execPath, [file], {
			cwd: ROOT,
			stdio: 'pipe',
			env: process.env,
		});
		passed += 1;
	} catch (error) {
		failed += 1;
		const output = error.stdout?.toString() ?? error.stderr?.toString() ?? error.message;
		console.error(`\nFAIL ${path.relative(ROOT, file)}\n${output}`);
	}
}

console.log(`\nTest run complete: ${passed} passed, ${failed} failed (${files.length} files).`);
process.exit(failed > 0 ? 1 : 0);

function walk(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			walk(fullPath);
			continue;
		}

		if (!entry.name.endsWith('.js')) {
			continue;
		}

		const source = fs.readFileSync(fullPath, 'utf8');
		if (source.includes('#shared/testCase') || source.includes('require("#shared/testCase")')) {
			files.push(fullPath);
		}
	}
}
