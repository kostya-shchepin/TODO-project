function deleteTask() {
    document.querySelectorAll(".delete-task").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.target.parentElement.remove();
        });
    });
}

document.querySelector(".add-task").addEventListener("click", function () {
    document
        .querySelector(".task-block")
        .insertAdjacentHTML(
            "beforeend",
            '<div class="task"><input type="checkbox" class="task-checkbox" /><p>Дело №2</p><button class="delete-task"><div class="minus"></div></button></div>'
        );
    deleteTask();
});

require("./less/style.less");
