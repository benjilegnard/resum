import * as m from "mithril";
import HelloWorld from "./components/hello-world.component";

export class App {
  view() {
    return (
      <div>
        <HelloWorld  />
      </div>
    );
  }
}

m.mount(document.body, App);
