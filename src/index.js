document.querySelectorAll('.delete-task').forEach(button => {
	button.addEventListener('click', event => {
		event.target.parentElement.remove()
	})
})

document.querySelector('.add-task').addEventListener('click', function () {
	document
		.querySelector('.task-block')
		.insertAdjacentHTML(
			'afterend',
			'<div class="task"><input type="checkbox" class="task-checkbox" /><p>Дело №2</p><button class="delete-task">Удалить</button></div>'
		)
})

require('./less/style.less')
