document.addEventListener('DOMContentLoaded', function() {

    // --- LOGIKA INTRO INTERAKTIF (VERSI MENYEBALKAN) ---
    const introQuestion = document.getElementById('intro-question');
    const storyContent = document.getElementById('story-content');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    
    // Cek apakah elemen-elemen ini ada di halaman saat ini (hanya di index.html)
    if (introQuestion && btnYes && btnNo) {
        
        let questionState = 0; // Kita mulai dari pertanyaan ke-0
        const questionH2 = document.getElementById('question-h2');
        const questionP = document.getElementById('question-p');

        // Daftar pertanyaan "menyebalkan" kita
        const questions = [
            { h2: "Hmm, tapi kok kayak wangi vanila ya...", p: "Jangan-jangan kamu Vanila?", btn: "Hehe iya juga..." },
            { h2: "Yaudah deh, iya...", p: "Kamu Sivanila Munana itu, kan?", btn: "Nah, itu baru bener!" }
        ];

        // Saat tombol "Iya" di klik
        btnYes.addEventListener('click', () => {
            // Jika masih ada pertanyaan di daftar
            if (questionState < questions.length) {
                // Ambil pertanyaan berikutnya
                const nextQuestion = questions[questionState];
                
                // Ganti teks pertanyaan dan tombol
                questionH2.textContent = nextQuestion.h2;
                questionP.textContent = nextQuestion.p;
                btnYes.textContent = nextQuestion.btn;
                
                // Maju ke state berikutnya
                questionState++;
            } else {
                // Jika semua pertanyaan sudah selesai, tampilkan cerita utama
                introQuestion.style.display = 'none';
                storyContent.style.display = 'block';
                startScrollReveal();
            }
        });

        // Saat tombol "Bukan" di klik
        btnNo.addEventListener('click', () => {
            alert('Loh? Salah orang dong... Yaudah deh, tutup aja tab ini kalo gitu :P');
        });

    } else {
        // Jika ini bukan halaman index.html (misal: gallery), langsung jalankan animasi
        startScrollReveal();
    }


    // --- FUNGSI ANIMASI SCROLL-REVEAL (TETAP SAMA) ---
    function startScrollReveal() {
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

    
    // --- LOGIKA UNTUK GALERI (gallery.html) (TETAP SAMA) ---
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        // ... (seluruh kode untuk galeri dari sebelumnya tidak perlu diubah, biarkan saja)
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

        function closeModal() {
            modal.style.display = 'none';
        }

        function changeImage(direction) {
            currentIndex += direction;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            } else if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }
            openModal(currentIndex);
        }

        modal.querySelector('.close-btn').addEventListener('click', closeModal);
        modal.querySelector('.next-btn').addEventListener('click', () => changeImage(1));
        modal.querySelector('.prev-btn').addEventListener('click', () => changeImage(-1));
        
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
        
         document.addEventListener('keydown', (event) => {
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowRight') changeImage(1);
                if (event.key === 'ArrowLeft') changeImage(-1);
                if (event.key === 'Escape') closeModal();
            }
        });
    }
});