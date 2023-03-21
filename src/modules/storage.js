import {isToday, isThisWeek, parse} from "date-fns";

const PROJECT_KEY = "userProjects";
const SELECTED_PROJECT_KEY = "selectedProjects";

// eslint-disable-next-line
let projects = JSON.parse(localStorage.getItem(PROJECT_KEY)) || [];

// eslint-disable-next-line
let selectedProjects = localStorage.getItem(SELECTED_PROJECT_KEY);

function saveProject() {
    localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));
    localStorage.setItem(SELECTED_PROJECT_KEY, selectedProjects);
}

function createNewProject(name) {
    return {
        id: Date.now().toString(),
        name,
        tasks: []
    }
}

function createNewTask(selectedProject, name, date) {
    return {
        id: Date.now().toString(),
        project: selectedProject.name,
        name,
        complete: false,
        date,
        dueDate: new Date(date),
        today: isToday(parse(date, "dd-MMM-yyyy", new Date())),
        thisWeek: isThisWeek(parse(date, "dd-MMM-yyyy", new Date())),
    }
}

export {PROJECT_KEY, SELECTED_PROJECT_KEY, projects, selectedProjects, saveProject, createNewProject, createNewTask};