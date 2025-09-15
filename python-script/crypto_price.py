#!/usr/bin/env python3
import json
import sys
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

URL = "https://api.coindesk.com/v1/bpi/currentprice.json"

def main() -> int:
    try:
        req = Request(URL, headers={"User-Agent": "python-urllib"})
        with urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        price = float(data["bpi"]["USD"].get("rate_float") or str(data["bpi"]["USD"]["rate"]).replace(",", ""))
        print(f"BTC price (USD): {price:.2f}")
        return 0
    except (HTTPError, URLError) as e:
        print(f"Network error: {e}", file=sys.stderr)
    except (KeyError, ValueError, json.JSONDecodeError) as e:
        print(f"Parse error: {e}", file=sys.stderr)
    except Exception as e:
        print(f"Unexpected error: {e}", file=sys.stderr)
    return 1

if __name__ == "__main__":
    raise SystemExit(main())
