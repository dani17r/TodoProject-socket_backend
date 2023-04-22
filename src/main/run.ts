import projects from "@modules/projects/controller";
import users from "@modules/users/controller";
import tasks from "@modules/tasks/controller";

export default () => {
	users();
	projects();
	tasks();
};
