document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer для плавного появления секций
  const obsOptions = { threshold: 0.18 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, obsOptions);

  document.querySelectorAll(".fade-in, .reviews blockquote").forEach(el => observer.observe(el));

  // Плавний скрол до контакту при натисканні кнопок "Телефонувати"
  document.querySelectorAll(".scroll-contact").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector("#contact");
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Додатково можна підсвітити секцію
      target.classList.add("visible");
    });
  });

  // Доступ: натиск на телефон на десктопі копіює номер замість відкриття tel:
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      if (!/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        e.preventDefault();
        const num = a.getAttribute("href").replace("tel:", "");
        navigator.clipboard && navigator.clipboard.writeText(num).then(() => {
          alert("Номер скопійовано: " + num + "\nТелефонуйте зі свого телефону.");
        }).catch(() => {
          alert("Номер: " + num);
        });
      }
    });
  });
});
