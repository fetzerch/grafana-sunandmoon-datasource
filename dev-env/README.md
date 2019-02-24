# Docker based Grafana plugin development environment

This directory contains a [Docker Compose](https://docs.docker.com/compose/)
configuration that sets up Grafana in a Docker container, installs and
configures the plugin from source and provides a sample Dashboard for testing.

## Usage guide

In order to make live changes to the plugin available to Grafana, the sources
have to be translated with Babel whenever they change:

```console
cd ..
npm install
grunt watch
```

Grafana needs to be restarted whenever the `plugin.json` is modified.

### Start Grafana

This command starts Grafana in the background:

```console
sudo UID=$(id -u) GID=$(id -g) docker-compose up -d
```

### Stop Grafana

This command stops Grafana, but keeps the container its data:

```console
sudo UID=$(id -u) GID=$(id -g) docker-compose stop
```

### Cleanup the container

This command stops Grafana, removes the container and its data:

```console
sudo git clean -xffd data
sudo UID=$(id -u) GID=$(id -g) docker-compose rm -sf
```
