install:
	npm install

run:
	npm start

clean:
	rm -f backup.json

mockup:
	cat mockup.json > backup.json
	make run
