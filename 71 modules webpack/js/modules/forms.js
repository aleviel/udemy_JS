import { postDataTo } from './services/data';

function forms(formsSelector, urlForPosts) {

	const allForms = document.querySelectorAll(formsSelector);

	function postData(form, urlForPosts) {
		const statusMsg = {
			loading: "loading...",
			success: "done",
			error: "error"
		};

		const formData = new FormData(form);
		const obj = {};

		const statusMsgBox = document.createElement('div');
		statusMsgBox.textContent = statusMsg.loading;
		form.append(statusMsgBox);

		formData.forEach((value, key) => {
			obj[key] = value;
		});
		console.log(obj);

		postDataTo(urlForPosts, obj)
			.then(data => {
				console.log(data);
				statusMsgBox.textContent = statusMsg.success;
			})
			.catch(() => {
				statusMsgBox.textContent = statusMsg.error;
			})
			.finally(() => {
				form.reset();
				setTimeout(() => {
					statusMsgBox.remove();
				}, 2000);
			});

	}

	allForms.forEach(form => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			postData(form, urlForPosts);
		});
	});
}

export default forms;
