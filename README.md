# federated-apollo-federation
Webpack Federation + Apollo Federation + Streaming = ❤️

## Overview

This is an example that utilizes the proprietary `webpack-node-http-chunk-loading-plugin` to enable streaming of federated modules in the async-node
 runtime.
 
The gateway is the only "server", while "todos" and "users" are static file servers. Each of the "todos" and "users" projects are retrieved at runtime by the "gateway" and executed in the same runtime.
 
## Running
 
You must have access to the https://github.com/jacob-ebey/webpack-node-http-chunk-loading-plugin project on GitHub. 
 
Install deps and start static dev servers for "todos" and "users"

```bash
> yarn
> yarn dev
```

Build and run the "gateway"

```bash
> yarn start
```
 
