let tasks = []
let tasks_check = []
if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'))
	tasks.forEach(task => {
		document
			.querySelector('.task-block')
			.insertAdjacentHTML(
				'beforeend',
				`<div class="task"><input type="checkbox" class="task-checkbox" /><span>${task}</span><button class="delete-task"><div class="minus"></div></button></div>`
			)
	})
}

function initCheckboxHandlers() {
	document.querySelectorAll('.task-checkbox').forEach((checkbox, index) => {
		if (localStorage.getItem('tasks_check')) {
			tasks_check = JSON.parse(localStorage.getItem('tasks_check'))
			if (tasks_check[index] === 1) {
				checkbox.classList.add('checked')
				checkbox.checked = true
			}
		} else {
			tasks_check[index] = 0
		}

		checkbox.addEventListener('click', event => {
			if (event.target.checked) {
				tasks_check[index] = 1
				event.target.classList.add('checked')
			} else {
				tasks_check[index] = 0
				event.target.classList.remove('checked')
			}
			localStorage.setItem('tasks_check', JSON.stringify(tasks_check))
		})
	})
}

initCheckboxHandlers()

function deleteTask() {
	document.querySelectorAll('.delete-task').forEach((button, index) => {
		button.addEventListener('click', event => {
			event.target.parentElement.remove()
			tasks.splice(index, 1)
			localStorage.setItem('tasks', JSON.stringify(tasks))
			tasks_check.splice(index, 1)
			localStorage.setItem('tasks_check', JSON.stringify(tasks_check))
		})
	})
}

deleteTask()

let popupBg = document.querySelector('.popup__bg') // Фон попап окна
let popup = document.querySelector('.popup') // Само окно
let openPopupButtons = document.querySelectorAll('.add-task') // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup') // Кнопка для скрытия окна

openPopupButtons.forEach(button => {
	// Перебираем все кнопки
	button.addEventListener('click', e => {
		// Для каждой вешаем обработчик событий на клик
		e.preventDefault() // Предотвращаем дефолтное поведение браузера
		popupBg.classList.add('active') // Добавляем класс 'active' для фона
		popup.classList.add('active') // И для самого окна
	})
})

document.addEventListener('click', e => {
	// Вешаем обработчик на весь документ
	if (e.target === popupBg) {
		popupBg.classList.remove('active') // Убираем активный класс с фона
		popup.classList.remove('active') // И с окна
	}
})

closePopupButton.addEventListener('click', () => {
	popupBg.classList.remove('active') // Убираем активный класс с фона
	popup.classList.remove('active') // И с окна
})

document.querySelector('.popup button').addEventListener('click', () => {
	const taskInput = document.querySelector('.task-input').value
	if (taskInput == '') {
		alert('Введите дело')
		return
	}
	console.log(taskInput)
	document
		.querySelector('.task-block')
		.insertAdjacentHTML(
			'beforeend',
			`<div class="task"><input type="checkbox" class="task-checkbox" /><span>${taskInput}</span><button class="delete-task"><div class="minus"></div></button></div>`
		)
	tasks.push(taskInput)
	localStorage.setItem('tasks', JSON.stringify(tasks))
	tasks_check.push(0)
	localStorage.setItem('tasks_check', JSON.stringify(tasks_check))
	console.log(tasks)
	popupBg.classList.remove('active') // Убираем активный класс с фона
	popup.classList.remove('active') // И с окна
	document.querySelector('.task-input').value = ''
	initCheckboxHandlers()
	deleteTask()
})

require('./less/style.less')
