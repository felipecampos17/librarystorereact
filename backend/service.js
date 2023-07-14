var Service = require("node-windows").Service;
var svc = new Service({
  name: "ServiceApiNode",
  description: "This supplier frontend through api",
  script: "D:\\projects\\crudmongo\\backend\\controller.js",
});

svc.on("install", function () {
  svc.start();
});

svc.install();
