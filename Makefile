PROJECT_NAME=cicd_web
WEBPACK_PORT=3000

ifndef THIS_DOCKER_HOST
# esto no se puede cambiar
override THIS_DOCKER_HOST = host.docker.internal
endif

build:
	docker build -t ${PROJECT_NAME} -f Dockerfile  .

shell:
		docker run -it --rm \
		-p ${WEBPACK_PORT}:${WEBPACK_PORT} \
		-v $(shell pwd):/app \
		--entrypoint /bin/bash \
		${PROJECT_NAME}

