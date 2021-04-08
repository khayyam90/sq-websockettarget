import { socketClient } from "./src/socketClient";
import { drawer } from "./src/drawer";

window.onload = function(){
  let d = new drawer("target", "log", "points", "svg", "score");
  let client = new socketClient();

  client.onNewImpact((x:number,y:number) => {
    d.addPoint(x,y);
  });

  client.run();
};
