document.addEventListener('DOMContentLoaded', function() {
    const top5TableBody = document.querySelector('#top10 tbody');
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Sort scores by time in ascending order and take top 10
    scores.sort((a, b) => a.tempo - b.tempo);
    const topScores = scores.slice(0, 10);

    topScores.forEach((score, index) => {
        const row = document.createElement('tr');

        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        const usernameCell = document.createElement('td');
        usernameCell.textContent = score.jogador;
        row.appendChild(usernameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = score.email; // Assuming the email is stored in the score object
        row.appendChild(emailCell);

        const tempoCell = document.createElement('td');
        tempoCell.textContent = score.tempo;
        row.appendChild(tempoCell);

        top5TableBody.appendChild(row);
    });
});