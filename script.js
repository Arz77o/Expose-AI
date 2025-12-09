// Burger menu
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
});
// فتح وغلق نافذة اتصل بنا
document.addEventListener("DOMContentLoaded", () => {
    
    const popup = document.getElementById("contactPopup");
    const contactBtn = document.getElementById("contactBtn");
    const contactBtnMobile = document.getElementById("contactBtnMobile");
    const closePopup = document.getElementById("closePopup");
    const form = document.getElementById("contactForm");

    if (contactBtn) {
        contactBtn.addEventListener("click", () => popup.classList.remove("hidden"));
    }
    if (contactBtnMobile) {
        contactBtnMobile.addEventListener("click", () => popup.classList.remove("hidden"));
    }

    if (closePopup) {
        closePopup.addEventListener("click", () => popup.classList.add("hidden"));
    }

    // إرسال الرسالة عبر EmailJS
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            emailjs.send("service_qwe8tha", "template_58c0uwi", {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            })
            .then(() => {
                alert("تم إرسال الرسالة بنجاح ✔");
                popup.classList.add("hidden");
                form.reset();
            })
            .catch((err) => {
                alert("حدث خطأ، جرّب مرة أخرى ❌");
                console.error(err);
            });
        });
    }
});