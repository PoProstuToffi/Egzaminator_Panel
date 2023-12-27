document.addEventListener("DOMContentLoaded", function () {
    alert("Witaj na stronie! Przeczytaj poniższe zasady przed rozpoczęciem egzaminu:\n\n1. Wypełnij wszystkie pola formularza oprócz pól z pytaniami, zaznaczasz je na bieżąco podczas trwania egzaminu!\n2. Kliknij 'Rozpocznij egzamin', aby zacząć.\n3.Zaznaczaj na bieżąco ptaszki przy pytaniach jeśli zdane jeśli nie zostaw puste\n4. Po zakończeniu egzaminu zobacz werdykt oraz wklej go na kanał ogłoszeń na discordzie.\n\n To tyle, powodzenia na egzaminie!");
    const startButton = document.getElementById("startButton");
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    const resultDisplay = document.getElementById("result");
    const timeDisplay = document.getElementById("time");
    const verdictDisplay = document.getElementById("verdict");
    const userNameInput = document.getElementById("idUzytkownika");
    const rank = document.getElementById("listaRozwijana");
    const attempt = document.getElementById("próbaLista");
    const info = document.getElementById("info");
    const settingsButton = document.getElementById("settingsButton");
    const settingsPanel = document.getElementById("settingsPanel");
    const closeButton = document.getElementById("closeButton");
    const usersList = document.getElementById("userList");
    usersList.style.display = "none";

    let examStarted = false;
    let startTime;
    let endTime;
    let originalButtonColor = getComputedStyle(startButton).backgroundColor;

    var tabelaWynikowaBody = document.querySelector('#userList table tbody');

    userNameInput.addEventListener('input', function () {
        var idDoWyszukania = this.value;

        if (idDoWyszukania.trim() === '') {
            usersList.style.display = "none";
            return;
        }
        usersList.style.display = "";

        fetch('users.json')
            .then(response => response.json())
            .then(data => {
                var znalezieniUzytkownicy = [];

                for (var i = 0; i < data.length; i++) {
                    if (data[i].discordId === idDoWyszukania) {
                        znalezieniUzytkownicy.push(data[i]);
                    }
                }

                if (znalezieniUzytkownicy.length > 0) {
                    wyswietlInformacjeOUzytkownikach(znalezieniUzytkownicy);
                } else {
                    wyswietlBrakInformacji();
                }
            })
            .catch(error => console.error('Błąd ładowania danych:', error));
    });

    function wyswietlInformacjeOUzytkownikach(uzytkownicy) {
        tabelaWynikowaBody.innerHTML = '';

        for (var i = 0; i < uzytkownicy.length; i++) {
            var row = tabelaWynikowaBody.insertRow();
            var cellId = row.insertCell(0);
            var cellDiscordNick = row.insertCell(1);
            var cellRobloxNick = row.insertCell(2);
            var cellRank = row.insertCell(3);
            var cellAttempts = row.insertCell(4);

            cellId.textContent = uzytkownicy[i].discordId;
            cellDiscordNick.textContent = uzytkownicy[i].discordNick;
            cellRobloxNick.textContent = uzytkownicy[i].robloxNick;
            cellRank.textContent = uzytkownicy[i].rank;
            cellAttempts.textContent = uzytkownicy[i].attempts;
        }
    }

    function wyswietlBrakInformacji() {
        tabelaWynikowaBody.innerHTML = '<tr><td colspan="5" class="centered-cell">Nie znaleziono użytkownika o podanym ID.</td></tr>';
    }

    function getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();

        return `${day}.${month}.${year}`;
    }

    function formatTimeDifference(duration) {
        const hours = Math.floor(duration / (60 * 60 * 1000));
        const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((duration % (60 * 1000)) / 1000);

        return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    function formatTime(time) {
        const formattedHours = String(time.getHours()).padStart(2, "0");
        const formattedMinutes = String(time.getMinutes()).padStart(2, "0");
        return `${formattedHours}:${formattedMinutes}`;
    }

    let isPanelOpen = false;

    settingsButton.addEventListener("click", function () {
        isPanelOpen = !isPanelOpen;
        if (isPanelOpen) {
            settingsPanel.style.display = "flex";
        } else {
            settingsPanel.style.display = "none";
        }
    });

    closeButton.addEventListener("click", function () {
        settingsPanel.style.display = "none";
    });

    startButton.addEventListener("click", function () {
        if (!examStarted) {
            if (!userNameInput.value.trim()) {
                alert("Proszę wypełnić wszystkie pola!");
                return;
            }

            startTime = new Date();
            startButton.style.backgroundColor = "#e74c3c";
            startButton.value = "Zakończ egzamin";
            examStarted = true;
        } else {
            let messagefinal = "";
            let lostmessagefinal = "";
            if (attempt.value === "1") {
                lostmessagefinal = "***Osoba która nie zaliczyła Egzaminu Aplikanckiego musi zgłosić się do obecnie dostępnego Egzaminatora w celu zdania ponownych Szkoleń ( Aplikant ma przeprowadzane szkolenia od Etapu I, do Etapu III )***";
            }else {
                lostmessagefinal = "***Osoba nie zaliczyła Egzaminu Aplikanckiego 2 raz co równa się z jego wydaleniem w przeciągu 24h***";
            }
            if (rank.value === ":Aplikant:") {
                messagefinal = "***Po ukończeniu Instytutu Przywództwa proszę zgłosić się na Ticketa po odbiór roli :StAplikant: - Starszego Aplikanta, gratulujemy oraz życzymy dalszych sukcesów w Straży Marszałkowskiej.***";
            } else {
                messagefinal = "";
            }
            messagefinal = messagefinal.trim();
            endTime = new Date();
            const checkedCount = Array.from(checkBoxes).filter(checkbox => checkbox.checked).length;
            const resultPercentage = Math.floor((checkedCount / 20) * 100);
            const duration = endTime - startTime;
            timeDisplay.innerHTML = `Czas rozpoczęcia: ${formatTime(startTime)}<br>Czas zakończenia: ${formatTime(endTime)}<br>Czas trwania: ${formatTimeDifference(duration)}`;
            resultDisplay.innerHTML = `Wynik: ${resultPercentage}%`;
            info.innerHTML = "<h5>Skopiuj to i wklej na kanał discord <b>#ogłoszenia_ipwoz</b></h5>"

            if (resultPercentage >= 80) {
                let verdictText = `:DobryPing: **I INSTYTUT PRZYWÓDZTWA - WYNIKI EGZAMINU**

Wraz z dniem **${getCurrentDate()}** Egzamin Instytutu Przywództwa zdały poniżej wymienione osoby:

${rank.value} - <@${userNameInput.value}> - Z wynikiem **${resultPercentage}%**

${messagefinal}`;
                verdictText = verdictText.trim();
                verdictDisplay.innerHTML = verdictText;
            } else {
                verdictDisplay.innerHTML = `:Odmowa: **I INSTYTUT PRZYWÓDZTWA - WYNIKI EGZAMINU**

Wraz z dniem **${getCurrentDate()}** Egzamin Instytutu Przywództwa nie zdały poniżej wymienione osoby:

${rank.value} - <@${userNameInput.value}> - Z wynikiem **${resultPercentage}%**

${lostmessagefinal}`;
            }

            startButton.style.backgroundColor = originalButtonColor;
            startButton.value = "Rozpocznij egzamin";
            examStarted = false;
        }
    });
});
