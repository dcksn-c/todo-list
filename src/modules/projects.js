import {projectContainer, projectDisplayContainer, projectTitle, taskContainer, overviewDisplayContainer, newTaskContainer, taskRemovalContainer} from "./const";
import {projects, selectedProjects} from "./storage";
import {renderTasks, renderTaskCount} from "./tasks";

function removeProject(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function render() {
    removeProject(projectContainer);
    projects.forEach(project => {
        const createList = document.createElement("li");
        createList.classList.add("project-name");
        createList.dataset.projectId = project.id;
        createList.textContent = project.name;
        if (project.id === selectedProjects) {
            createList.classList.add("active-project")
        }
        projectContainer.appendChild(createList)

    })
    const selectedProject = projects.find(project => project.id === selectedProjects)
    if (selectedProjects == null || selectedProject === undefined) {
        projectDisplayContainer.style.display = "none";
        overviewDisplayContainer.style.display = "none"
        newTaskContainer.style.display = "";
        taskRemovalContainer.style.display = "";
    }
    else {
        projectDisplayContainer.style.display = "";
        overviewDisplayContainer.style.display = "none"
        newTaskContainer.style.display = "";
        taskRemovalContainer.style.display = "";
        projectTitle.textContent = selectedProject.name;
        renderTaskCount(selectedProject);
        removeProject(taskContainer);
        renderTasks(selectedProject);
    }
}

export {render, removeProject};