import os, sys, json
premium_dir, mine_dir = "premium", "mine"
premium = sorted(list([(int(f[:-5]), f)
                       for f in os.listdir(premium_dir)
                       if f.endswith('.json')]))
mine = list(os.listdir(mine_dir))
articles = json.load(open('articles.json'))

w = open('leetcode_json.js', 'w')

w.write("var leetcode = {\n")
for num, question in premium:
    data = json.load(open(os.path.join(premium_dir, question)))
    if question in mine:
        data2 = json.load(open(os.path.join(mine_dir, question)))
        if 'code' in data2 and 'code' not in data:
            data['code'] = data2['code']
        if 'companies' in data:
            data['companies'] = data['companies'].keys()
        if str(num) in articles:
            data.update(articles[str(num)])
    w.write(str(num) + ': ' + json.dumps(data, indent=4) + ',\n')
w.write("}")
w.close()

print sum(question in mine for num, question in premium)
