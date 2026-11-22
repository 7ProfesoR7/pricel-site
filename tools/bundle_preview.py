"""Сборка одностраничного превью: CSS, JS и шрифты встраиваются в один HTML (для просмотра без сервера)."""

import base64
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
OUT = ROOT / "refs" / "preview.html"


def inline_fonts(css: str) -> str:
    def repl(m: re.Match[str]) -> str:
        font = DOCS / "assets" / "fonts" / Path(m.group(1)).name
        data = base64.b64encode(font.read_bytes()).decode("ascii")
        return f'url("data:font/woff2;base64,{data}")'

    return re.sub(r'url\("\.\./fonts/([^"]+)"\)', repl, css)


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    html = (DOCS / "index.html").read_text(encoding="utf-8")
    css = inline_fonts((DOCS / "assets" / "css" / "site.css").read_text(encoding="utf-8"))
    js = (DOCS / "assets" / "js" / "site.js").read_text(encoding="utf-8")
    html = html.replace('<link rel="stylesheet" href="assets/css/site.css">', f"<style>\n{css}\n</style>")
    html = html.replace('<script src="assets/js/site.js" defer></script>', f"<script>\n{js}\n</script>")
    html = re.sub(r'<link rel="preload"[^>]*>\n', "", html)
    html = html.replace('<link rel="icon" href="favicon.svg" type="image/svg+xml">', "")
    if "--fragment" in sys.argv:
        # Вариант для публикации-превью: без собственного каркаса документа
        for tag in ("<!doctype html>\n", '<html lang="ru">\n', "<head>\n", "</head>\n", "<body>\n", "</body>\n", "</html>\n"):
            html = html.replace(tag, "")
        html = re.sub(r'<meta (charset|name="viewport")[^>]*>\n', "", html)
    OUT.write_text(html, encoding="utf-8")
    print(f"{OUT} — {OUT.stat().st_size // 1024} КБ")


if __name__ == "__main__":
    main()
