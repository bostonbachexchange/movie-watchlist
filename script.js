document.addEventListener('DOMContentLoaded', () => {
    function createMovieItem(title) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = title;

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
            if (editBtn.textContent === 'Edit') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent;
                li.insertBefore(input, span);
                li.removeChild(span);
                editBtn.textContent = 'Save';
            } else {
                const input = li.querySelector('input[type="text"]');
                span.textContent = input.value.trim() || span.textContent;
                li.insertBefore(span, input);
                li.removeChild(input);
                editBtn.textContent = 'Edit';
            }
        };

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => li.remove();

        // Watched Button
        const watchedBtn = document.createElement('button');
        watchedBtn.textContent = 'Watched';
        watchedBtn.onclick = () => {
            addMovieToList(span.textContent, document.getElementById('watchedList'), true);
            li.remove();
        };

        // Style buttons a bit for clarity (optional, you can style via CSS too)
        [editBtn, deleteBtn, watchedBtn].forEach(btn => {
            btn.style.marginLeft = '8px';
            btn.style.fontSize = '0.9em';
        });

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        li.appendChild(watchedBtn);

        return li;
    }

    function addMovieToList(title, list, isWatched = false) {
        const li = createMovieItem(title);
        // If adding to watched, remove "Watched" button
        if (isWatched) li.removeChild(li.lastChild);
        list.appendChild(li);
    }

    // Add for Baby Girl List
    const babyGirlInput = document.getElementById('babyGirlInput');
    const addBabyGirlMovie = document.getElementById('addBabyGirlMovie');
    const babyGirlList = document.getElementById('babyGirlList');

    addBabyGirlMovie.addEventListener('click', () => {
        const title = babyGirlInput.value.trim();
        if (title) {
            addMovieToList(title, babyGirlList);
            babyGirlInput.value = '';
        }
    });

    babyGirlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addBabyGirlMovie.click();
    });

    // Add for High AF List
    const highInput = document.getElementById('highInput');
    const addHighMovie = document.getElementById('addHighMovie');
    const highList = document.getElementById('highList');

    addHighMovie.addEventListener('click', () => {
        const title = highInput.value.trim();
        if (title) {
            addMovieToList(title, highList);
            highInput.value = '';
        }
    });

    highInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addHighMovie.click();
    });

    // Convert initial static list items to interactive ones
    function convertStaticLis(list) {
        const items = Array.from(list.querySelectorAll('li'));
        items.forEach(li => {
            // Skip if already interactive (has button)
            if (li.querySelector('button')) return;
            const title = li.textContent.trim();
            const newLi = createMovieItem(title);
            list.replaceChild(newLi, li);
        });
    }
    convertStaticLis(babyGirlList);
    convertStaticLis(highList);

    // No input needed for watchedList; items only move there
});
