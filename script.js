// script.js (Versi Final Paling Simpel)

document.addEventListener('DOMContentLoaded', function() {

    // --- BAGIAN 1: LOGIKA UNTUK HALAMAN PEMBUKA (index.html) ---
    const startBtn = document.getElementById('start-story-and-music-btn');
    
    // Jika tombol ini ada di halaman...
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // 1. Beri "izin" di memori browser untuk memutar musik
            localStorage.setItem('musicPermission', 'granted');
            // 2. Arahkan pengguna ke halaman cerita
            window.location.href = 'cerita.html';
        });
    }


    // --- BAGIAN 2: LOGIKA UNTUK MEMUTAR MUSIK DI HALAMAN SELANJUTNYA ---
    const music = document.getElementById('bg-music');

    // Jika ada elemen musik di halaman ini (cerita.html, moment.html, gallery.html)
    if (music) {
        // Cek apakah "izin" sudah diberikan dari halaman pertama
        if (localStorage.getItem('musicPermission') === 'granted') {
            music.play().catch(error => {
                console.log("Browser mencegah autoplay. Ini seharusnya tidak terjadi setelah interaksi awal.");
            });
        }
    }


    // --- BAGIAN 3: SEMUA LOGIKA LAINNYA (TETAP SAMA & AMAN) ---
    
    // Logika untuk pertanyaan "menyebalkan" di cerita.html
    const introQuestion = document.getElementById('intro-question');
    const storyContent = document.getElementById('story-content');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    
    if (introQuestion && btnYes && btnNo) {
        // ... (seluruh kode untuk pertanyaan ini tidak perlu diubah)
        let questionState = 0;
        const questionH2 = document.getElementById('question-h2');
        const questionP = document.getElementById('question-p');
        const questions = [
            { h2: "Hmm, tapi kok kayak wangi vanila ya...", p: "Jangan-jangan kamu Vanila?", btn: "Hehe iya juga..." },
            { h2: "Yaudah deh, iya...", p: "Kamu Sivanila Munana itu, kan?", btn: "Nah, itu baru bener!" }
        ];
        btnYes.addEventListener('click', () => {
            if (questionState < questions.length) {
                const nextQuestion = questions[questionState];
                questionH2.textContent = nextQuestion.h2;
                questionP.textContent = nextQuestion.p;
                btnYes.textContent = nextQuestion.btn;
                questionState++;
            } else {
                introQuestion.style.display = 'none';
                storyContent.style.display = 'block';
                startScrollReveal();
            }
        });
        btnNo.addEventListener('click', () => {
            alert('Loh? Salah orang dong... Yaudah deh, tutup aja tab ini kalo gitu :P');
        });
    } else {
        startScrollReveal();
    }

    // Fungsi untuk animasi scroll-reveal
    function startScrollReveal() {
        // ... (kode fungsi ini tidak perlu diubah)
        const scenes = document.querySelectorAll('.scene');
        if (scenes.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        scenes.forEach(scene => {
            if (storyContent && storyContent.style.display === 'block') {
                 setTimeout(() => observer.observe(scene), 100);
            } else {
                 observer.observe(scene);
            }
        });
    }
    
    // Logika untuk galeri foto
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        // ... (seluruh kode untuk galeri ini tidak perlu diubah)
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const captionText = document.getElementById('lightbox-caption');
        const images = document.querySelectorAll('.gallery-grid img');
        let currentIndex = 0;
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentIndex = index;
                openModal(index);
            });
        });
        function openModal(index) {
            modal.style.display = 'block';
            modalImg.src = images[index].src;
            captionText.textContent = images[index].dataset.caption || '';
        }
        function closeModal() { modal.style.display = 'none'; }
        function changeImage(direction) {
            currentIndex += direction;
            if (currentIndex >= images.length) { currentIndex = 0; } 
            else if (currentIndex < 0) { currentIndex = images.length - 1; }
            openModal(currentIndex);
        }
        modal.querySelector('.close-btn').addEventListener('click', closeModal);
        modal.querySelector('.next-btn').addEventListener('click', () => changeImage(1));
        modal.querySelector('.prev-btn').addEventListener('click', () => changeImage(-1));
        window.addEventListener('click', (event) => { if (event.target === modal) { closeModal(); } });
        document.addEventListener('keydown', (event) => {
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowRight') changeImage(1);
                if (event.key === 'ArrowLeft') changeImage(-1);
                if (event.key === 'Escape') closeModal();
            }
        });
    }
});