#!/usr/bin/env python3
import json, os, sys
from datetime import datetime
from urllib.parse import urlencode
from urllib.request import urlopen

API = "https://api.openweathermap.org/data/2.5/weather"
HOT, COLD = 35.0, 5.0
LOG = "weather_alert.log"

def load_dotenv_simple(path):
    if not os.path.exists(path): return
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line: continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

def main():
    # load ../.env if present (adjust if your .env lives elsewhere)
    load_dotenv_simple(os.path.join(os.path.dirname(__file__), "..", ".env"))

    city = " ".join(sys.argv[1:]) or os.getenv("DEFAULT_CITY", "Dhaka")
    key = os.getenv("OWM_API_KEY")
    if not key:
        print("Error: set OWM_API_KEY (in env or .env)")
        return 2

    url = f"{API}?{urlencode({'q': city, 'appid': key, 'units': 'metric'})}"
    print(f"Making request to: {url.replace(key, '[REDACTED]')}")
    try:
        with urlopen(url, timeout=10) as r:
            data = json.loads(r.read().decode())
        if data.get("cod") != 200:
            print("API error:", data.get("message", "unknown")); return 1

        temp = float(data["main"]["temp"])
        name = f"{data.get('name','')}, {data.get('sys',{}).get('country','')}".strip(", ")
        desc = (data.get("weather") or [{}])[0].get("description", "").title()
        print(f"{name}: {temp:.1f}°C, {desc}")

        alert = None
        if temp > HOT:  alert = f"HOT ALERT: {name} {temp:.1f}°C > {HOT:.1f}°C"
        elif temp < COLD: alert = f"COLD ALERT: {name} {temp:.1f}°C < {COLD:.1f}°C"
        if alert:
            print(alert)
            with open(LOG, "a", encoding="utf-8") as f:
                f.write(f"{datetime.now().isoformat()} {alert}\n")
        return 0
    except Exception as e:
        print("Error:", e)
        return 1

if __name__ == "__main__":
    sys.exit(main())
