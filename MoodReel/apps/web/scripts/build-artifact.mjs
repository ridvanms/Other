// Turns the single-file artifact build into a page fragment for an embedded preview:
// the host supplies <html>/<head>/<body>, so we keep only the title, metas, styles, markup and scripts.
import { readFile, writeFile } from 'node:fs/promises';

const source = new URL('../dist-artifact/index.html', import.meta.url);
const target = new URL('../dist-artifact/moodreel.html', import.meta.url);
const html = await readFile(source, 'utf8');

const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? '';
const body = html.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? '';
const keepHead = head
  .replace(/<meta charset[^>]*>/i, '')
  .replace(/<meta name="viewport"[^>]*>/i, '')
  .replace(/<link rel="icon"[^>]*>/i, '');

const fragment = `<title>MoodReel</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${keepHead.replace(/<title>[^<]*<\/title>/, '').trim()}\n${body.trim()}\n`;
await writeFile(target, fragment);
console.log(`artifact page: ${target.pathname} (${(fragment.length / 1024).toFixed(0)} KB)`);
