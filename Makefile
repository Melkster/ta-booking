install:
	npm install

run:
	npm start

clean:
	rm -f backup.json

fill:
	cat mockup.json > backup.json
	make run
