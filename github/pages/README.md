# Kryptos Tēs Moiras public portal

Standalone static website: HTML, CSS and JavaScript. English is the default language; all twenty languages and four themes plus system mode remain available. Asset paths support both root hosting and a subdirectory.

## Run on your PC

Extract this archive into your local KryptosTesMoiras directory, then run from that directory:

```sh
python3 -m http.server 8080 --directory github/pages
```

Open the local server in your browser. Use an HTTP server rather than opening the HTML with a file URL, so JSON translations can load.

## Private access

The public portal has no sign-in form. The demo uses fictional in-memory projects only. The Rust backend, private application, databases, real accounts and private repositories are excluded.

The onion address is blank by default. Its owner can configure it in `config.js`; never put private keys there. This portal does not proxy Tor traffic or automatically launch Tor Browser.

## Hosting

These files can be served by a static web server. This archive does not activate GitHub Pages, register a domain or deploy a Tor service.
