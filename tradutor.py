import json
from deep_translator import GoogleTranslator

with open("monsters.json", "r", encoding="utf-8") as f:
    monsters = json.load(f)

for monster in monsters:
    if "description" in monster and monster["description"]:
        monster["description"] = GoogleTranslator(source="en", target="pt").translate(monster["description"])
    if "locations" in monster:
        for loc in monster["locations"]:
            if "name" in loc:
                loc["name"] = GoogleTranslator(source="en", target="pt").translate(loc["name"])

with open("monsters_pt.json", "w", encoding="utf-8") as f:
    json.dump(monsters, f, ensure_ascii=False, indent=4)

print("Tradução concluída e salva em monsters.json")
