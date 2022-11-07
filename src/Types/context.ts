import { Context, Scenes } from 'telegraf';

interface MySessionScene extends Scenes.SceneSessionData {
	myProps: string;
}

interface MySession extends Scenes.SceneSession<MySessionScene> {
	myProp: string;
}

export interface MyContext extends Context {
	props: string;
	text: string;
	session: MySession;
	scene: Scenes.SceneContextScene<MyContext, MySessionScene>;
}
