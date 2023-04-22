"use strict";

var _dateFns = require("date-fns");
var _const = require("./modules/const");
var _storage = require("./modules/storage");
var _projects = require("./modules/projects");
var _tasks = require("./modules/tasks");
_const.projectContainer.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "li") {
    _storage.selectedProjects = (e.target.dataset.projectId, function () {
      throw new Error('"' + "selectedProjects" + '" is read-only.');
    }());
    (0, _storage.saveProject)();
    (0, _projects.render)();
  }
});
_const.overviewContainer.addEventListener("click", function (e) {
  if (e.target.textContent === "All tasks") {
    (0, _tasks.selectedOverviewItem)(e);
    (0, _projects.removeProject)(_const.overviewTaskContainer);
    _const.projectDisplayContainer.style.display = "none";
    _const.overviewDisplayContainer.style.display = "";
    for (var i = 0; i < _storage.projects.length; i += 1) {
      var allTasks = _storage.projects[i].tasks.filter(function (task) {
        return !task.complete;
      });
      (0, _tasks.renderAllTasks)(allTasks);
      (0, _tasks.renderOverviewTaskCount)();
    }
    _const.newTaskContainer.style.display = "none";
    _const.taskRemovalContainer.style.display = "none";
  } else if (e.target.textContent === "Today") {
    (0, _tasks.selectedOverviewItem)(e);
    (0, _projects.removeProject)(_const.overviewTaskContainer);
    _const.projectDisplayContainer.style.display = "none";
    _const.overviewDisplayContainer.style.display = "";
    for (var _i = 0; _i < _storage.projects.length; _i += 1) {
      var allTodayTasks = _storage.projects[_i].tasks.filter(function (task) {
        return task.today && !task.complete;
      });
      (0, _tasks.renderAllTasks)(allTodayTasks);
      (0, _tasks.renderOverviewTaskCount)();
    }
    _const.newTaskContainer.style.display = "none";
    _const.taskRemovalContainer.style.display = "none";
  } else if (e.target.textContent === "This week") {
    (0, _tasks.selectedOverviewItem)(e);
    (0, _projects.removeProject)(_const.overviewTaskContainer);
    _const.projectDisplayContainer.style.display = "none";
    _const.overviewDisplayContainer.style.display = "";
    for (var _i2 = 0; _i2 < _storage.projects.length; _i2 += 1) {
      var allThisWeekTasks = _storage.projects[_i2].tasks.filter(function (task) {
        return task.thisWeek && !task.complete;
      });
      (0, _tasks.renderAllTasks)(allThisWeekTasks);
      (0, _tasks.renderOverviewTaskCount)();
    }
    _const.newTaskContainer.style.display = "none";
    _const.taskRemovalContainer.style.display = "none";
  }
});
_const.taskContainer.addEventListener("click", function (e) {
  var selectedProject = _storage.projects.find(function (project) {
    return project.id === _storage.selectedProjects;
  });
  if (e.target.tagName.toLowerCase() === "input") {
    var selectedTask = selectedProject.tasks.find(function (task) {
      return task.id === e.target.id;
    });
    selectedTask.complete = e.target.checked;
    (0, _storage.saveProject)();
    (0, _tasks.renderTaskCount)(selectedProject);
  }
});
_const.overviewContainer.addEventListener("click", function (e) {
  var selectedProject = _storage.projects.find(function (project) {
    return project.id === _storage.selectedProjects;
  });
  if (e.target.tagName.toLowerCase() === "input" && _const.projectTitle === selectedProject.name) {
    var selectedTask = selectedProject.tasks.find(function (task) {
      return task.id === e.target.id;
    });
    selectedTask.complete = e.target.checked;
    (0, _storage.saveProject)();
    (0, _tasks.renderTaskCount)(selectedProject);
  }
});
_const.clearCompletedTasksBtn.addEventListener("click", function () {
  var selectedProject = _storage.projects.find(function (project) {
    return project.id === _storage.selectedProjects;
  });
  selectedProject.tasks = selectedProject.tasks.filter(function (task) {
    return !task.complete;
  });
  (0, _storage.saveProject)();
  (0, _projects.render)();
});
_const.newProjectForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var project = _const.newProjectName.value;
  if (project == null || project === "") {
    return;
  }
  var newProject = (0, _storage.createNewProject)(project);
  _storage.projects.push(newProject);
  _const.newProjectName.value = null;
  (0, _storage.saveProject)();
  (0, _projects.render)();
});
_const.newTaskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var task = _const.newTaskName.value;
  var date = _const.taskDueDate.valueAsDate;
  if (task == null || task === "" || date == null || date === "") {
    return;
  }
  var dueDate = (0, _dateFns.format)(date, "dd-MMM-yyyy");
  var selectedProject = _storage.projects.find(function (project) {
    return project.id === _storage.selectedProjects;
  });
  var newTask = (0, _storage.createNewTask)(selectedProject, task, dueDate);
  selectedProject.tasks.push(newTask);
  _const.newTaskName.value = null;
  _const.taskDueDate.value = null;
  (0, _storage.saveProject)();
  (0, _projects.render)();
});
_const.deleteProjectBtn.addEventListener("click", function () {
  _storage.projects = (_storage.projects.filter(function (project) {
    return project.id !== _storage.selectedProjects;
  }), function () {
    throw new Error('"' + "projects" + '" is read-only.');
  }());
  _storage.selectedProjects = (null, function () {
    throw new Error('"' + "selectedProjects" + '" is read-only.');
  }());
  (0, _storage.saveProject)();
  (0, _projects.render)();
});
(0, _projects.render)();
