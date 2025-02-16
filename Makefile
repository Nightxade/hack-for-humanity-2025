.PHONY: clean docker restart

all: docker

clean:
	docker compose down -v --rmi all

docker:
	docker compose build && docker compose up -d

restart:
	docker compose restart