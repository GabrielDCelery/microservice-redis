run-clean-dev:
	docker rm $$(docker ps -a -q) --force
	docker rmi $$(docker images -q) --force
	docker volume rm $$(docker volume ls -qf dangling=true)
	docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up
clean-prod:
	docker rm $$(docker ps -a -q) --force
	docker rmi $$(docker images -q) --force
	docker volume rm $$(docker volume ls -qf dangling=true)
	docker-compose -f ./docker-compose.yml up
run-prod:
	docker-compose -f ./docker-compose.yml up
run-dev:
	docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up
run-test:
	docker exec -it -e ENV_BACKEND_APP_PORT=8089 microservice_redis_connector npm run test