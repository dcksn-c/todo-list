import {isToday, isPast, parse} from "date-fns";
import {overviewItem, taskCount, overviewTaskCount, taskContainer, taskTemplate, overviewTaskTemplate, overviewTaskContainer, overviewTitle} from "./const";

function renderAllTasks(p) {
    p.forEach(task => {
        const createTask = document.importNode(overviewTaskTemplate.content, true);
        const label = createTask.querySelector("label");
        label.htmlFor = task.id;
        label.append(`${task.name} (${task.project})`);
        const dateDisplay = createTask.querySelector("p");
        dateDisplay.textContent = task.date;
        if (isToday(parse(dateDisplay.textContent, "dd-MMM-yyyy", new Date()))) {
            const individualOverviewTask = createTask.querySelector(".overview-task");
            individualOverviewTask.classList.add("is-today");
        }
        else if (isPast(parse(dateDisplay.textContent, "dd-MMM-yyyy", new Date()))) {
            const individualOverviewTask = createTask.querySelector(".overview-task");
            individualOverviewTask.classList.add("is-past");
        }
        overviewTaskContainer.appendChild(createTask);
    })
}

function renderTasks(selectedProject) {
    selectedProject.tasks.forEach(task => {
        const createTask = document.importNode(taskTemplate.content, true);
        const checkbox = createTask.querySelector("input");
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = createTask.querySelector("label");
        label.htmlFor = task.id;
        label.append(task.name);
        const dateDisplay = createTask.querySelector("p");
        dateDisplay.textContent = task.date;
        if (isToday(parse(dateDisplay.textContent, "dd-MMM-yyyy", new Date()))) {
            const individualTask = createTask.querySelector(".task");
            individualTask.classList.add("is-today");
        }
        else if (isPast(parse(dateDisplay.textContent, "dd-MMM-yyyy", new Date()))) {
            const individualTask = createTask.querySelector(".task");
            individualTask.classList.add("is-past");
        }
        taskContainer.appendChild(createTask);
    })
}

function renderTaskCount(selectedProject) {
    const incompleteTaskCount = selectedProject.tasks.filter(task => !task.complete).length;
    taskCount.textContent = incompleteTaskCount <= 1 ? `${incompleteTaskCount} task remaining` : `${incompleteTaskCount} tasks remaining`;
}

function renderOverviewTaskCount() {
    const incompleteTaskCount = overviewTaskContainer.children.length;
    overviewTaskCount.textContent = incompleteTaskCount <= 1 ? `${incompleteTaskCount} task remaining` : `${incompleteTaskCount} tasks remaining`;
}

function selectedOverviewItem(element) {
    overviewItem.forEach(e => {
        e.classList.remove("active-overview-item")
    })
    element.target.classList.add("active-overview-item");
    overviewTitle.textContent = element.target.textContent;
}

export {renderAllTasks, renderTasks, renderTaskCount, renderOverviewTaskCount, selectedOverviewItem};