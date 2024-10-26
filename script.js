console.log("Script is running");

document.addEventListener('DOMContentLoaded', function() {
    const tagButtons = document.querySelectorAll('.tag-btn');
    const contentArea = document.querySelector('.content-area');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');

    let currentPage = 1;
    const itemsPerPage = 10; // 假设每页显示10个项目

    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            currentPage = 1; // 重置页码
            updateContent();
        });
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateContent();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        updateContent();
    });

    function updateContent() {
        const activeTags = Array.from(document.querySelectorAll('.tag-btn.active'))
            .map(btn => btn.dataset.tag);

        if (activeTags.length === 0) {
            contentArea.innerHTML = '<p>Please select a tag to see content.</p>';
            hidePagination();
        } else {
            // 这里应该是从服务器获取数据的逻辑
            // 现在我们只是模拟一些数据
            const totalItems = 50; // 假设总共有50个项目
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            contentArea.innerHTML = `
                <p>Showing content for tags: ${activeTags.join(', ')}</p>
                <p>Page ${currentPage} of ${totalPages}</p>
                <p>Items ${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, totalItems)}</p>
            `;

            updatePagination(totalPages);
        }
    }

    function updatePagination(totalPages) {
        currentPageSpan.textContent = `Page ${currentPage}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        document.querySelector('.pagination').style.display = 'flex';
    }

    function hidePagination() {
        document.querySelector('.pagination').style.display = 'none';
    }

    // Initial content update
    updateContent();
});
