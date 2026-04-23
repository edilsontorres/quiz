const questions = [
    { q: "Qual é o nome hebraico da Festa das Trombetas e qual o seu significado literal?", options: ["Shavout – Festa das Semanas", "Yom Teruah – O dia do toque.", "Sukkot – Cabanas ou Tendas.", "Pessach – Passar por cima."], answer: 1 },
    { q: "Enquanto as festas da primavera apontam para a primeira vinda de Cristo, para qual evento profético aponta a Festa das Trombetas?", options: ["Para o batismo de Jesus no Rio Jordão.", "Para a descida do Espírito Santo.", "Para a segunda vinda de Jesus com poder e glória.", "Para a crucificação de Cristo."], answer: 2 },
    { q: "No calendário civil judaico, o que o dia das Trombetas (1º de Tishrei) representa tradicionalmente?", options: ["O fim de todo o ano religioso.", "O início do ano civil (Rosh Hashaná), marcando a criação do mundo.", "O dia exato da saída do povo do Egito.", "O dia em que Moisés recebeu as tábuas da Lei"], answer: 1 },
    { q: "Qual é o significado histórico da Festa de Tabernáculos (Sukkot) para o povo de Israel?", options: ["Lembrar a entrega da Lei no Monte Sinai.", "Lembrar o sacrifício do cordeiro no Egito.", "Lembrar que Deus fez o povo habitar em tendas no deserto e habitou no meio deles.", "Celebrar a vitória militar sobre os filisteus."], answer: 2 },  
    { q: "De acordo com o estudo, o que o fato de habitar em tendas demonstrava sobre o povo e sobre Deus?", options: ["Que eles eram proprietários definitivos daquela terra.", "Que eles eram peregrinos e apresenta o aspecto passageiro da vida na Terra.", "Que eles não tinham tecnologia para construir casas de pedra.", "Que Deus só habita em lugares luxuosos e permanentes."], answer: 1 },   
    { q: "O estudo menciona três sentidos interdependentes para as festas bíblicas. Quais são eles?", options: ["Agrícola, Histórico e Profético (Cristocêntrico).", "Político, Financeiro e Geográfico.", "Individual, Familiar e Coletivo.", "Passado, Presente e Distante."], answer: 0},    
    { q: "O que representa o período de 10 dias que se inicia no Yom Teruah (Trombetas) e termina no Yom Kippur?", options: ["Dez dias de jejum total de água.", "Dez dias de arrependimento que culminam na Expiação.", "Dez dias de celebração com música e dança nas ruas.", "O tempo que levou para o Tabernáculo ser construído no deserto."], answer: 1},
    { q: "Por que o estudo afirma que a Festa dos Tabernáculos (Sukkot) apresenta um aspecto passageiro da vida?", options: ["Porque as tendas (sucas) eram construções precárias e temporárias, mostrando que somos peregrinos.", "Porque a festa dura apenas algumas horas do dia.", "Porque o povo de Israel nunca chegou a morar em tendas de verdade.", "Porque a colheita dos frutos dura pouco tempo."], answer: 0},
    { q: "No sentido profético/cristocêntrico, qual festa está ligada ao Julgamento Final e purificação de Israel?", options: ["Páscoa (Pessach).", "Pentecostes (Shavout).", "Expiação (Yom Kippur).", "Dedicatória (Hanucá)."], answer: 2 }, 
    { q: "De acordo com Apocalipse 21:3, citado no estudo, como se cumpre plenamente o significado de Tabernáculo?", options: ["Quando o Terceiro Templo for reconstruído em Jerusalém.", "Quando os judeus voltarem a morar em tendas no deserto.", "Quando Deus habitar plenamente com a humanidade (Eis aqui o tabernáculo de Deus com os homens).", "No momento em que Jesus foi batizado por João Batista."], answer: 2 }
];

let currentQuestion = 0;
let score = 0;
let answerSelected = "";
let userAnswers = []; 

function handleSelection(index, element) {
    const optionsContainer = document.getElementById("options-container");
    
    // 1. Trava os cliques para o usuário não clicar em várias
    optionsContainer.classList.add("disabled");

    // 2. Aplica a cor de "selecionado" com o degradê suave do CSS
    element.classList.add("selected");

    // 3. Salva a resposta e pontuação
    userAnswers.push(index);
    if (index === questions[currentQuestion].answer) {
        score++;
    }

    // 4. ESPERA 3 SEGUNDOS (O delay que você pediu)
    setTimeout(() => {
        const container = document.getElementById("quiz-container");
        
        // Inicia o fade-out para a troca de tela
        container.classList.add("fade-out");

        // Pequeno tempo para o fade-out completar antes de carregar a nova
        setTimeout(() => {
            optionsContainer.classList.remove("disabled");
            currentQuestion++;
            
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }, 500); 

    }, 1500); // 3000ms = 3 segundos de exibição da escolha
}

const loadQuestion = () => {
    const qData = questions[currentQuestion];
    const container = document.getElementById("quiz-container");
    const totalQuestions = questions.length;
    
    // Mostra a pergunta com suavidade
    container.classList.remove("fade-out");
    
    document.getElementById("current-idx").innerText = currentQuestion + 1;
    document.getElementById("totalQuestions").innerText = totalQuestions;
    document.getElementById("question-text").innerText = qData.q;
    
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    
    qData.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = (e) => handleSelection(i, e.target);
        optionsContainer.appendChild(btn);
    });

    
    // const totalQuestions = questions.length;

    // document.getElementById("current-idx").innerText = currentQuestion + 1;
    // document.getElementById("totalQuestions").innerText = totalQuestions;
    // document.getElementById("question-text").innerText = qData.q;

    // const container = document.getElementById("options-container");
    // container.innerHTML = "";

    // qData.options.forEach((opt, i) => {
    //     const btn = document.createElement("button");
    //     btn.innerText = opt;
    //     btn.onclick = () => checkAnswer(i);
    //     container.appendChild(btn);
    // });
}

function checkAnswer(selected) {
    // Salva a resposta do usuário
    userAnswers.push(selected);

    if (selected === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-container").classList.add("hidden");
    const resDiv = document.getElementById("result-container");
    resDiv.classList.remove("hidden");

    const percent = (score / questions.length) * 100;
    const title = document.getElementById("result-title");

    // Lógica dos Confetes
    if (percent >= 80) {
        title.innerText = "Parabéns! Você foi incrível!";
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } else if (percent >= 50) {
        title.innerText = "Bom trabalho!";
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    } else {
        title.innerText = "Poxa, não foi dessa vez.";
    }

    document.getElementById("result-score").innerText = `Você acertou ${score} de ${questions.length}`;

    // GERAR REVISÃO NO FINAL
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "<h3>Revisão:</h3>";

    questions.forEach((item, index) => {
        const userChoice = userAnswers[index];
        const isCorrect = userChoice === item.answer;

        const div = document.createElement("div");
        div.className = "review-item";
        div.innerHTML = `
            <span class="review-q">${index + 1}. ${item.q}</span>
            <div class="review-info">
                Sua resposta: <span class="${isCorrect ? 'text-success' : 'text-danger'}">
                    ${item.options[userChoice]} ${isCorrect ? '✓' : '✗'}
                </span><br>
                ${!isCorrect ? `Correta: <span class="text-success">${item.options[item.answer]}</span>` : ''}
            </div>
        `;
        reviewList.appendChild(div);
    });
}

loadQuestion();