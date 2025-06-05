class Tasks {
	constructor() {
		this.tasks = []
		this.tasks_check = []
		this.popupBg = document.querySelector('.popup__bg') // Фон попап окна
		this.popup = document.querySelector('.popup') // Само окно
		this.openPopupButtons = document.querySelectorAll('.add-task') // Кнопки для показа окна
		this.closePopupButton = document.querySelector('.close-popup')

		this.openPopup()
		this.closePopup()
		this.addTask()
		this.initTask()
		this.initCheckboxHandlers()
		this.deleteTask()
	}

	openPopup() {
		this.openPopupButtons.forEach(button => {
			// Перебираем все кнопки
			button.addEventListener('click', e => {
				// Для каждой вешаем обработчик событий на клик
				e.preventDefault() // Предотвращаем дефолтное поведение браузера
				this.popupBg.classList.add('active') // Добавляем класс 'active' для фона
				this.popup.classList.add('active') // И для самого окна
			})
		})
	}

	closePopup() {
		document.addEventListener('click', e => {
			// Вешаем обработчик на весь документ
			if (e.target === this.popupBg) {
				this.popupBg.classList.remove('active') // Убираем активный класс с фона
				this.popup.classList.remove('active') // И с окна
			}
		})

		this.closePopupButton.addEventListener('click', () => {
			this.popupBg.classList.remove('active') // Убираем активный класс с фона
			this.popup.classList.remove('active') // И с окна
		})
	}

	initTask() {
		if (localStorage.getItem('tasks')) {
			this.tasks = JSON.parse(localStorage.getItem('tasks'))
			this.tasks.forEach(task => {
				document
					.querySelector('.task-block')
					.insertAdjacentHTML(
						'beforeend',
						`<div class="task"><input type="checkbox" class="task-checkbox" /><span>${task}</span><button class="delete-task"><div class="minus"></div></button></div>`
					)
			})
		}
	}

	addTask() {
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
			this.tasks.push(taskInput)
			localStorage.setItem('tasks', JSON.stringify(this.tasks))
			this.tasks_check.push(0)
			localStorage.setItem('tasks_check', JSON.stringify(this.tasks_check))
			this.popupBg.classList.remove('active') // Убираем активный класс с фона
			this.popup.classList.remove('active') // И с окна
			document.querySelector('.task-input').value = ''
			this.initCheckboxHandlers()
			this.deleteTask()
		})
	}

	initCheckboxHandlers() {
		document.querySelectorAll('.task-checkbox').forEach((checkbox, index) => {
			if (localStorage.getItem('tasks_check')) {
				this.tasks_check = JSON.parse(localStorage.getItem('tasks_check'))
				if (this.tasks_check[index] === 1) {
					checkbox.classList.add('checked')
					checkbox.checked = true
				}
			} else {
				this.tasks_check[index] = 0
			}

			checkbox.addEventListener('click', event => {
				if (event.target.checked) {
					this.tasks_check[index] = 1
					event.target.classList.add('checked')
				} else {
					this.tasks_check[index] = 0
					event.target.classList.remove('checked')
				}
				localStorage.setItem('tasks_check', JSON.stringify(this.tasks_check))
			})
		})
	}

	deleteTask() {
		document.querySelectorAll('.delete-task').forEach((button, index) => {
			button.addEventListener('click', event => {
				event.target.parentElement.remove()
				this.tasks.splice(index, 1)
				localStorage.setItem('tasks', JSON.stringify(this.tasks))
				this.tasks_check.splice(index, 1)
				localStorage.setItem('tasks_check', JSON.stringify(this.tasks_check))
			})
		})
	}
}

new Tasks()

require('./less/style.less')
