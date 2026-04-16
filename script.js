const questions = [
    { q: "Quais são as três principais festas judaicas?", options: ["Páscoa, Purim e Dedicatória.", "Páscoa, Pentecostes e Festa do Tabernáculo.", "Trombetas, Pentecostes e Pães Ázimos.", "Purim, Tabernáculo e Trombetas."], answer: 1 },
    { q: "Qual é o significado literal da palavra hebraica Pessach?", options: ["Libertação.", "Sacrifício.", "Passar.", "Aliança"], answer: 2 },
    { q: "Na celebração da Páscoa, o que as Ervas Amargas simbolizavam para o povo?", options: ["A pressa em sair da terra do Egito.", "A pureza necessária para o sacrifício.", "O amargor da escravidão no Egito.", "O sofrimento de Moisés no deserto."], answer: 2 },
    { q: "Em qual dia do mês de Abibe (Nissan) ocorre o sacrifício do cordeiro na Páscoa?", options: ["No 1º dia.", "No 10º dia.", "No 14º dia.", "No 15º dia."], answer: 2 },
    { q: "Quanto tempo dura a Festa dos Pães Ázimos (Hag HaMatzot), que começa logo após a Páscoa?", options: ["Um dia.", "Três dias.", "Sete dias.", "Cinquenta dias."], answer: 2 },
    { q: "A palavra Pentecostes tem origem grega e significa literalmente o quê?", options: ["Sete semanas.", "Quinquagésimo", "Colheita farta.", "Entrega da Lei."], answer: 1 },
    { q: "Originalmente, além da colheita, o Pentecostes (Shavout) marcava qual evento histórico?", options: ["A saída do Egito sob a liderança de Moisés.", "A travessia do Mar Vermelho pelo povo hebreu.", "A entrega da Lei de Deus a Moisés no Monte Sinai.", "A queda das muralhas de Jericó."], answer: 2 },
    { q: "No Novo Testamento, o que o Pentecostes representa para a fé cristã?", options: ["O nascimento de Jesus em Belém.", "A ressurreição de Jesus Cristo ao terceiro dia.", "O início da igreja e a descida do Espírito Santo.", "A última ceia de Jesus com seus discípulos."], answer: 2 },
    { q: "Em qual data do calendário judaico ocorre a Festa das Trombetas?", options: ["No 14º dia do primeiro mês.", "No primeiro dia do sétimo mês (Tishrei).", "No dia seguinte ao sábado da Páscoa.", "No 21º dia do mês de Abibe."], answer: 1 },
    { q: "Qual instrumento é o centro da Festa das Trombetas e qual era uma de suas funções?", options: ["A harpa, usada para convocar o povo ao louvor.", "O Shofar, usado para anunciar a chegada de um rei.", "A flauta, usada para marcar o início da colheita.", "O címbalo, usado para dar alarme de guerra."], answer: 1 }
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
    
    // Mostra a pergunta com suavidade
    container.classList.remove("fade-out");
    
    document.getElementById("current-idx").innerText = currentQuestion + 1;
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