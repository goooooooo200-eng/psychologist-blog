async function loadPosts() {
    try {
        // Получаем список всех markdown-файлов из папки posts
        const response = await fetch('/posts.json'); // этот файл мы сгенерируем позже
        const posts = await response.json();
        
        // Сортируем по дате (новые сверху)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const container = document.getElementById('posts');
        container.innerHTML = posts.map(post => `
            <article class="post">
                <h2><a href="/post.html?slug=${post.slug}">${post.title}</a></h2>
                <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('ru-RU')}</time>
                <div class="excerpt">${post.excerpt || ''}</div>
                ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
            </article>
        `).join('');
    } catch (error) {
        console.error('Ошибка загрузки постов:', error);
    }
}

loadPosts();
