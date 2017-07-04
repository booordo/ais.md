function mailTo (form) {

	var xhr = new XMLHttpRequest();
	var name = form.elements.name;
	var phone = form.elements.phone;
	var submit = form.elements.submit;
	var captcha = form.children[2];
	var response = grecaptcha.getResponse();
	var params = 'name=' + encodeURIComponent(name.value) + '&phone=' + encodeURIComponent(phone.value) + '&captcha=' + response;

	xhr.open('POST', 'mail.php');
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(params);

	xhr.onreadystatechange = function() {
		if (this.readyState != 4) return;
		if (this.response == "ERROR") {
			submit.value = "Пропущенна CAPTCHA!";
			submit.style.backgroundColor = '#f44336';
		} else {
			submit.value = "Готово!";
			submit.style.backgroundColor = '#8BC34A';
			name.style.display = 'none';
			phone.style.display = 'none';
		}
		
	}

	name.style.display = 'none';
	phone.style.display = 'none';
	captcha.style.display = 'none';
	submit.value = "Отправка...";
	submit.style.backgroundColor = '#ff876c';
	submit.setAttribute("disabled", true);

}