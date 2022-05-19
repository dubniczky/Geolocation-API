# Package manager
pm := yarn
lockfile := yarn.lock
modules := node_modules
# Node
node := node
devnode := npx nodemon
depnode := node
main := main.js
debug_args := --trace-exit --trace-uncaught --trace-warnings
deploy_args := 
# Container
container := geocity:api
container_port_internal := 8080
container_port_external := 80

.PHONY: dev lint fix test testwatch install start deploy container run

# Start the application in development mode
dev: $(main) $(modules)
	$(devnode) $(debug_args) $(main)

# Run compile test and eslint
lint: $(modules)
	@echo "Compile test.."
	@$(node) --check $(main)
	@echo "OK"
	@echo "Running ESLint.."
	@npx eslint .
	@echo "OK"

# Fixes auto fixable linting errors
fix: $(modules)
	npx eslint . --fix

# Runs tests using jest
test: $(modules)
	NODE_OPTIONS='--experimental-vm-modules' npx jest .

# Runs tests in interactive mode using jest
testwatch: $(modules)
	NODE_OPTIONS='--experimental-vm-modules' npx jest . --watch

# Install packages (development mode)
install: package.json
	$(pm) install

# Start the application in deployment mode
start: $(modules)
	$(depnode) $(deploy_args) $(main)

# Install packages (deployment mode)
deploy: $(lockfile)
	@echo "Creating deployment.."
	$(pm) install --silent --prod --frozen-lockfile

# Create container
container:
	@echo "Building container.. ($(container))"
	@sudo docker build -t $(container) .

# Run container
run:
	@echo "Starting continer.. ($(container))"
	@sudo docker run -p$(container_port_external):$(container_port_internal) $(container)


# Auto install packages dependency
$(modules): package.json
	@echo "Dependency inconsistency found, updating.."
	$(MAKE) -s install