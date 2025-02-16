.PHONY: clean docker restart

all: docker

clean:
	docker run --rm --volumes-from hackforhumanity-flask-1 -v $(shell pwd):/backup ubuntu tar cvf /backup/backup.tar /app/data/events.db
	tar xf backup.tar; rm backup.tar
	rm data/events.db; cp app/data/events.db data/events.db; rm -r app
	docker compose down -v --rmi all

docker:
	docker compose build && docker compose up -d

restart:
	docker compose restart

db-events:
	sqlite3 data/events.db < data/events.sql