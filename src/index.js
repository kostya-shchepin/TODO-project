document.querySelector(".delete-task").addEventListener("click", function () {
    this.parentElement.remove();
});

document.querySelector(".add-task").addEventListener("click", function () {
    document
        .querySelector(".task")
        .lastElementChild.insertAdjacentHTML(
            "afterEnd",
            '<div id="task"><input type="checkbox" id="task-checkbox" />Дело №2 <button id="delete-task">Удалить</button></div><br />'
        );
});
