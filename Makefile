.PHONY: clean

all: docker

clean:
	docker compose down -v --rmi all

docker:
	docker compose build && docker compose up -d