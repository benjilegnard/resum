import m from "mithril";
import { ClassComponent, Vnode } from "mithril";

export interface HelloWorldAttributes {
  name: string;
}

export class HelloWorld
  implements ClassComponent<HelloWorldAttributes> {
  public name: string;
  public view(vnode: Vnode<HelloWorldAttributes, this>) {
    return <div>Hello {vnode.attrs.name}</div>;
  }
}

export default HelloWorld;
