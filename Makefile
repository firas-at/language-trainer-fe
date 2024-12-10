.PHONY: help build build-dev start start-dev stop clean

help: ## Display this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Build the production Docker image
	docker compose build app-prod

build-dev: ## Build the development Docker image
	docker compose build app-dev

start: ## Start the production container
	docker compose up app-prod

start-dev: ## Start the development container
	docker compose up app-dev

stop: ## Stop all containers
	docker compose down

clean: ## Remove all containers and images
	docker compose down --rmi all --volumes --remove-orphans