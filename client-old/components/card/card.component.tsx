import * as m from "mithril";
import { ClassComponent, Vnode } from 'mithril';

export interface CardAttributes {
	title: string;
}

export default class Card implements ClassComponent<CardAttributes>{
    public view(vnode: Vnode<CardAttributes, this>) {
		return <div>Hello {vnode.attrs.title}</div>
 }
}