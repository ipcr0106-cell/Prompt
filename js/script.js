// ===== Chapter Navigation =====
document.addEventListener('DOMContentLoaded', () => {
    const chapterItems = document.querySelectorAll('.chapter-item');
    const chapters = document.querySelectorAll('.chapter');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    // Create overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Chapter switching
    chapterItems.forEach(item => {
        item.addEventListener('click', () => {
            const chapterId = item.dataset.chapter;

            // Update active chapter in sidebar
            chapterItems.forEach(ci => ci.classList.remove('active'));
            item.classList.add('active');

            // Show selected chapter, hide others
            chapters.forEach(ch => {
                ch.style.display = 'none';
            });
            const target = document.getElementById(`chapter-${chapterId}`);
            if (target) {
                target.style.display = 'block';
                // Re-trigger animations
                target.querySelectorAll('section').forEach(sec => {
                    sec.style.animation = 'none';
                    sec.offsetHeight; // force reflow
                    sec.style.animation = '';
                });
            }

            // Scroll to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Close mobile sidebar
            closeSidebar();
        });
    });

    // Mobile sidebar toggle
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', closeSidebar);

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
});

// ===== Copy Code =====
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code');
    const text = code.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
            완료!
        `;
        button.classList.add('copied');

        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const originalHTML = button.innerHTML;
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                완료!
            `;
            button.classList.add('copied');
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('복사 실패:', err);
        }
        document.body.removeChild(textArea);
    });
}
