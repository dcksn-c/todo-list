import {format} from "date-fns";
import {projectContainer, overviewContainer, newProjectForm, newProjectName, deleteProjectBtn, projectDisplayContainer, projectTitle, taskContainer, newTaskForm, newTaskName, taskDueDate, clearCompletedTasksBtn, overviewDisplayContainer, newTaskContainer, taskRemovalContainer, overviewTaskContainer} from './modules/const';
import {projects, selectedProjects, saveProject, createNewProject, createNewTask} from "./modules/storage";
import {render, removeProject} from "./modules/projects";
import {renderAllTasks, renderTaskCount, renderOverviewTaskCount, selectedOverviewItem} from "./modules/tasks";

projectContainer.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "li") {
        selectedProjects = e.target.dataset.projectId;
        saveProject();
        render();
    }
})

overviewContainer.addEventListener("click", (e) => {
    if (e.target.textContent === "All tasks") {
        selectedOverviewItem(e)
        removeProject(overviewTaskContainer);
        projectDisplayContainer.style.display = "none";
        overviewDisplayContainer.style.display = ""
        for (let i=0;i<projects.length;i+=1) {
            const allTasks = projects[i].tasks.filter(task => !task.complete);
            renderAllTasks(allTasks);
            renderOverviewTaskCount()
        }
        newTaskContainer.style.display = "none";
        taskRemovalContainer.style.display = "none";
    }
    else if (e.target.textContent === "Today") {
        selectedOverviewItem(e);
        removeProject(overviewTaskContainer);
        projectDisplayContainer.style.display = "none";
        overviewDisplayContainer.style.display = "";
        for (let i=0;i<projects.length;i+=1) {
            const allTodayTasks = projects[i].tasks.filter(task => task.today && !task.complete);
            renderAllTasks(allTodayTasks);
            renderOverviewTaskCount()
        }
        newTaskContainer.style.display = "none";
        taskRemovalContainer.style.display = "none";
    }
    else if (e.target.textContent === "This week") {
        selectedOverviewItem(e);
        removeProject(overviewTaskContainer);
        projectDisplayContainer.style.display = "none";
        overviewDisplayContainer.style.display = "";
        for (let i=0;i<projects.length;i+=1) {
            const allThisWeekTasks = projects[i].tasks.filter(task => task.thisWeek && !task.complete);
            renderAllTasks(allThisWeekTasks);
            renderOverviewTaskCount()
        }
        newTaskContainer.style.display = "none";
        taskRemovalContainer.style.display = "none";
    }
})

taskContainer.addEventListener("click", (e) => {
    const selectedProject = projects.find(project => project.id === selectedProjects);
    if (e.target.tagName.toLowerCase() === "input") {
        const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        saveProject();
        renderTaskCount(selectedProject);
    }
})

overviewContainer.addEventListener("click", (e) => {
    const selectedProject = projects.find(project => project.id === selectedProjects);
    if (e.target.tagName.toLowerCase() === "input" && projectTitle === selectedProject.name) {
        const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        saveProject();
        renderTaskCount(selectedProject);
    }
})

clearCompletedTasksBtn.addEventListener("click", () => {
    const selectedProject = projects.find(project => project.id === selectedProjects);
    selectedProject.tasks = selectedProject.tasks.filter(task => !task.complete);
    saveProject();
    render();
})

newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const project = newProjectName.value;
    if (project == null || project === "") {
        return;
    }
    const newProject = createNewProject(project);
    projects.push(newProject);
    newProjectName.value = null;
    saveProject();
    render();
})

newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = newTaskName.value;
    const date = taskDueDate.valueAsDate;
    if (task == null || task === "" || date == null || date === "") {
        return;
    }
    const dueDate = format(date, "dd-MMM-yyyy");
    const selectedProject = projects.find(project => project.id === selectedProjects);
    const newTask = createNewTask(selectedProject, task, dueDate);
    selectedProject.tasks.push(newTask);
    newTaskName.value = null;
    taskDueDate.value = null;
    saveProject();
    render();
})

deleteProjectBtn.addEventListener("click", () => {
    projects = projects.filter(project => project.id !== selectedProjects)
    selectedProjects = null;
    saveProject();
    render();
})

render();