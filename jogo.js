
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;

var criaMosquitoTempo = 1500;
let mosquitoAtual = null;
let jogoAtivo = true;

var nivel = window.location.search
nivel = nivel.replace('?', '')

//Quanto menor o tempo, mais difícil o jogo
if (nivel === 'normal') {
	criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
	criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
	criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function () {

	tempo--;

	if (tempo < 0) {

		jogoAtivo = false;

		clearInterval(cronometro);

		if (mosquitoAtual) {
			mosquitoAtual.remove();
		}

		window.location.href = 'vitoria.html';

	} else {

		document.getElementById('cronometro').innerHTML = tempo;

	}

}, 1000);


function posicaoRandomica() {

	if (!jogoAtivo) {
		return;
	}

	// Remove o mosquito ativo caso ele ainda exista
	if (mosquitoAtual) {

		mosquitoAtual.remove();

		mosquitoAtual = null;

		if (vidas >= 3) {

			window.location.href = "fim_de_jogo.html";

		} else {

			document.getElementById("v" + vidas).src =
				"imagens/coracao_vazio.png";

			vidas++;

		}

	}

	var posicaoX = Math.floor(Math.random() * largura) - 90
	var alturaPainel = window.innerWidth <= 768 ? 80 : 0;
	var posicaoY = Math.floor(Math.random() * (altura - alturaPainel)) - 90;

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	var mosquito = document.createElement('div');

	mosquito.className =
		'mosquito ' +
		tamanhoAleatorio() +
		' ' +
		ladoAleatorio();

	mosquito.style.left = posicaoX + 'px';

	mosquito.style.top = posicaoY + 'px';

	mosquitoAtual = mosquito;

	mosquito.onclick = function () {

		this.onclick = null;

		// Este mosquito não é mais o ativo
		mosquitoAtual = null;

		// Mostra a sprite do mosquito morto
		this.style.backgroundPosition = "right center";

		// Executa a animação
		this.classList.add("morrendo");

		// Remove apenas quando a animação terminar
		this.addEventListener("animationend", () => {
			this.remove();
		}, { once: true });

	};

	document.body.appendChild(mosquito)

}

function tamanhoAleatorio() {

	var mobile = window.innerWidth <= 768;

	var classe = Math.floor(Math.random() * 4);

	if (mobile) {

		switch (classe) {

			case 0:
				return 'mosquito1';

			case 1:
				return 'mosquito1';

			case 2:
				return 'mosquito2';

			case 3:
				return 'mosquito3';

		}

	} else {

		switch (Math.floor(Math.random() * 3)) {

			case 0:
				return 'mosquito1';

			case 1:
				return 'mosquito2';

			case 2:
				return 'mosquito3';

		}

	}

}

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)

	switch (classe) {
		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'

	}
}

function criarMosquito() {

	if (!jogoAtivo) {
		return;
	}

	posicaoRandomica();

	setTimeout(criarMosquito, criaMosquitoTempo);

}