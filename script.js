document.addEventListener("DOMContentLoaded", function () {
    alert("Witaj na stronie! Przeczytaj poniższe zasady przed rozpoczęciem egzaminu:\n\n1. Wypełnij wszystkie pola formularza oprócz pól z pytaniami, zaznaczasz je na bieżąco podczas trwania egzaminu!\n2. Kliknij 'Rozpocznij egzamin', aby zacząć.\n3.Zaznaczaj na bieżąco ptaszki przy pytaniach jeśli zdane jeśli nie zostaw puste\n4. Po zakończeniu egzaminu zobacz werdykt oraz wklej go na kanał ogłoszeń na discordzie.");
    const startButton = document.getElementById("startButton");
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    const resultDisplay = document.getElementById("result");
    const timeDisplay = document.getElementById("time");
    const verdictDisplay = document.getElementById("verdict");
    const userNameInput = document.getElementById("idUzytkownika");
    const dateStart = document.getElementById("dataRozpoczecia");
    const rank = document.getElementById("listaRozwijana");
    const themeToggle = document.getElementById("themeToggle");

    themeToggle.addEventListener("click", toggleTheme);

    function toggleTheme() {
        document.body.classList.toggle("dark-theme");
    }

    let examStarted = false;
    let startTime;
    let endTime;
    let originalButtonColor = getComputedStyle(startButton).backgroundColor;

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

    startButton.addEventListener("click", function () {
        if (!examStarted) {
            if (!userNameInput.value.trim() || !dateStart.value.trim()) {
                alert("Proszę wypełnić wszystkie pola!");
                return;
            }

            startTime = new Date();
            startButton.style.backgroundColor = "#e74c3c";
            startButton.value = "Zakończ egzamin";
            examStarted = true;
        } else {
            endTime = new Date();
            const checkedCount = Array.from(checkBoxes).filter(checkbox => checkbox.checked).length;
            const resultPercentage = Math.floor((checkedCount / 20) * 100);
            const duration = endTime - startTime;
            timeDisplay.innerHTML = timeDisplay.innerHTML = `Czas rozpoczęcia: ${startTime.getHours()}:${startTime.getMinutes()}<br>Czas zakończenia: ${endTime.getHours()}:${endTime.getMinutes()}<br>Czas trwania: ${formatTimeDifference(duration)}`;
            resultDisplay.innerHTML = `Wynik: ${resultPercentage}%`;

            if (resultPercentage >= 80) {
                verdictDisplay.innerHTML = `:DobryPing: I INSTYTUT PRZYWÓDZTWA - WYNIKI EGZAMINU

Wraz z dniem ${getCurrentDate()} Egzamin Instytutu Przywództwa zdały poniżej wymienione osoby:

${rank.value} - <@${userNameInput.value}> - Z wynikiem ${resultPercentage}%

*Po ukończeniu Instytutu Przywództwa proszę zgłosić się na Ticketa po odbiór roli :StAplikant: - Starszego Aplikanta, gratulujemy oraz życzymy dalszych sukcesów w Straży Marszałkowskiej.*`;
            } else {
                verdictDisplay.innerHTML = `:Odmowa: I INSTYTUT PRZYWÓDZTWA - WYNIKI EGZAMINU

Wraz z dniem ${getCurrentDate()} Egzamin Instytutu Przywództwa nie zdały poniżej wymienione osoby:

${rank.value} - <@${userNameInput.value}> - ${resultPercentage}%

*Osoby która nie zaliczyła Egzaminu Aplikanckiego musi zgłosić się do obecnie dostępnego Egzaminatora w celu zdania ponownych Szkoleń ( Aplikant ma przeprowadzane szkolenia od Etapu I, do Etapu III )*`;
            }

            startButton.style.backgroundColor = originalButtonColor;
            startButton.value = "Rozpocznij egzamin";
            examStarted = false;
        }
    });
});
