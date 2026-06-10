import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/73c21dd3-1f26-4c4c-8fab-810b551774c2/files/67de19e9-01c1-4ac9-b6e2-51d41845ab61.jpg";
const MECHANIC_IMG = "https://cdn.poehali.dev/projects/73c21dd3-1f26-4c4c-8fab-810b551774c2/files/e1acae61-7073-41f3-a966-e65c71436174.jpg";
const RECEPTION_IMG = "https://cdn.poehali.dev/projects/73c21dd3-1f26-4c4c-8fab-810b551774c2/files/4833ea66-2472-4ab7-8760-8faed5706670.jpg";

const NAV_ITEMS = [
  { label: "О сервисе", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Прайс", href: "#price" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Gauge", title: "Ремонт ДВС", desc: "Диагностика, текущий и капитальный ремонт двигателей любых марок" },
  { icon: "Settings", title: "Ремонт КПП", desc: "Ремонт и обслуживание механических коробок передач" },
  { icon: "RefreshCw", title: "Ремонт АКПП", desc: "Диагностика, ремонт и обслуживание автоматических коробок" },
  { icon: "Disc", title: "Тормозная система", desc: "Ремонт и обслуживание тормозной системы, замена колодок и дисков" },
  { icon: "Car", title: "Ходовая часть", desc: "Диагностика и ремонт подвески, рулевого управления" },
  { icon: "Wrench", title: "Замена агрегатов", desc: "Замена двигателей, коробок и других агрегатов" },
  { icon: "Droplets", title: "Топливная система", desc: "Чистка, ремонт и обслуживание топливной системы" },
  { icon: "Zap", title: "Диагностика", desc: "Компьютерная диагностика всех систем автомобиля" },
  { icon: "Package", title: "Заказ запчастей", desc: "Подбор и заказ оригинальных и качественных запчастей для любых марок" },
];

const PRICES = [
  { service: "Ремонт ДВС", price: "по запросу" },
  { service: "Ремонт КПП", price: "по запросу" },
  { service: "Ремонт АКПП", price: "по запросу" },
  { service: "Тормозная система", price: "по запросу" },
  { service: "Ходовая часть", price: "по запросу" },
  { service: "Замена агрегатов", price: "по запросу" },
  { service: "Топливная система", price: "по запросу" },
  { service: "Компьютерная диагностика", price: "по запросу" },
  { service: "Заказ запчастей", price: "по запросу" },
];

const REVIEWS = [
  { name: "Сергей К.", car: "Toyota Land Cruiser 200", text: "Обратился с проблемой по АКПП — ребята разобрались быстро, объяснили всё доступно. Сделали качественно, машина работает как новая. Однозначно рекомендую!", rating: 5 },
  { name: "Дмитрий Н.", car: "Nissan Pathfinder", text: "Делал капитальный ремонт двигателя. Сроки выдержали, цену согласовали заранее — никаких сюрпризов. Мастера знают своё дело, видно что опыт большой.", rating: 5 },
  { name: "Алексей М.", car: "Ford Explorer", text: "Менял КПП — обратился в ПрофСервисАвто по совету знакомых. Не пожалел. Всё чётко, честно и по делу. Теперь только сюда.", rating: 5 },
  { name: "Ольга Т.", car: "Hyundai Santa Fe", text: "Ремонтировали ходовую после зимы. Быстро диагностировали, предложили несколько вариантов решения. Осталась очень довольна — и работой, и отношением.", rating: 5 },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  useReveal();

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-body">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(0,0%,8%)] text-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }} className="font-display text-xl font-semibold tracking-widest uppercase">
            ПрофСервис<span className="text-[hsl(16,100%,50%)]">Авто</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className="nav-link text-sm font-light tracking-wide text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[hsl(0,0%,5%)] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); scrollTo(item.href); }} className="text-white/80 hover:text-white text-sm tracking-wide transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Автосервис" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-xl">
            <p className="animate-fade-up text-[hsl(16,100%,50%)] font-display text-sm tracking-[0.25em] uppercase mb-4">Профессиональный автосервис</p>
            <h1 className="animate-fade-up delay-100 font-display text-5xl md:text-7xl font-semibold text-white uppercase leading-none mb-6">
              Ваш<br/>автомобиль<br/>в надёжных<br/>руках
            </h1>
            <p className="animate-fade-up delay-200 text-white/70 font-light text-lg mb-10 leading-relaxed">
              Более 5 лет опыта, 6 специалистов,<br/>гарантия на все виды работ
            </p>
            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4">
              <a href="tel:+79021344707" className="bg-[hsl(16,100%,50%)] text-white font-display uppercase tracking-widest text-sm px-8 py-4 hover:bg-[hsl(16,100%,42%)] transition-colors flex items-center justify-center gap-2">
                <Icon name="Phone" size={16} />
                Позвонить
              </a>
              <button onClick={() => scrollTo("#services")} className="border border-white/30 text-white font-display uppercase tracking-widest text-sm px-8 py-4 hover:border-white/70 transition-colors">
                Наши услуги
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col gap-6">
          {[
            { num: "5+", label: "лет опыта" },
            { num: "6", label: "специалистов" },
            { num: "98%", label: "довольных" },
          ].map((stat) => (
            <div key={stat.label} className="text-right">
              <div className="font-display text-3xl font-semibold text-white">{stat.num}</div>
              <div className="text-white/50 text-xs tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="text-[hsl(16,100%,50%)] font-display text-sm tracking-[0.25em] uppercase mb-4">О нас</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase leading-tight mb-8">
                Мы делаем<br/>всё правильно
              </h2>
              <p className="text-foreground/60 font-light leading-relaxed mb-6">
                ПрофСервисАвто — это команда из 6 опытных специалистов, которая более 5 лет помогает автовладельцам Мурманска поддерживать свои автомобили в идеальном состоянии. Работаем с любыми марками и моделями.
              </p>
              <p className="text-foreground/60 font-light leading-relaxed mb-10">
                Наш принцип: честность, качество, скорость. Мы не навязываем лишних работ, используем только качественные запчасти и даём гарантию на все виды ремонта.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Shield", text: "Гарантия на все виды работ" },
                  { icon: "Clock", text: "Работаем Пн-Вс: 10:00–19:00" },
                  { icon: "CheckCircle", text: "Любые марки автомобилей" },
                  { icon: "Users", text: "6 опытных специалистов" },
                ].map((item) => (
                  <div key={item.text} className="flex gap-3">
                    <Icon name={item.icon} size={18} className="text-[hsl(16,100%,50%)] mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/70 leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal delay-200 relative">
              <img src={MECHANIC_IMG} alt="Мастер за работой" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-[hsl(0,0%,8%)] text-white p-6 w-48">
                <div className="font-display text-4xl font-semibold text-[hsl(16,100%,50%)]">5+</div>
                <div className="text-xs tracking-widest uppercase text-white/60 mt-1">лет на рынке</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[hsl(0,0%,96%)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <p className="text-[hsl(16,100%,50%)] font-display text-sm tracking-[0.25em] uppercase mb-4">Что мы делаем</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase">Наши услуги</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-white p-8 group hover:bg-[hsl(0,0%,8%)] transition-colors duration-300 cursor-pointer reveal">
                <Icon name={s.icon} size={28} className="text-[hsl(16,100%,50%)] mb-5" />
                <h3 className="font-display text-lg font-medium uppercase mb-2 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed group-hover:text-white/60 transition-colors">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal mb-16">
            <p className="text-[hsl(16,100%,50%)] font-display text-sm tracking-[0.25em] uppercase mb-4">Прозрачность</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase">Прайс-лист</h2>
          </div>
          <div className="max-w-3xl">
            {PRICES.map((p) => (
              <div key={p.service} className="reveal flex items-center justify-between py-5 border-b border-border last:border-0">
                <span className="font-light text-foreground/80">{p.service}</span>
                <span className="font-display font-medium text-[hsl(16,100%,50%)] whitespace-nowrap ml-4">{p.price}</span>
              </div>
            ))}
          </div>
          <div className="reveal mt-8">
            <p className="text-foreground/40 text-sm font-light">* Стоимость определяется индивидуально после диагностики. Свяжитесь с нами для расчёта.</p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-[hsl(0,0%,8%)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal mb-16">
            <p className="text-[hsl(16,100%,50%)] font-display text-sm tracking-[0.25em] uppercase mb-4">Наша работа</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase text-white">Галерея</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="reveal md:col-span-2">
              <img src={HERO_IMG} alt="Автосервис" className="w-full h-full object-cover" style={{ minHeight: 320 }} />
            </div>
            <div className="reveal delay-100 flex flex-col gap-2">
              <img src={MECHANIC_IMG} alt="Мастер" className="w-full flex-1 object-cover" style={{ minHeight: 156 }} />
              <img src={RECEPTION_IMG} alt="Ресепшн" className="w-full flex-1 object-cover" style={{ minHeight: 156 }} />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <p className="text-[hsl(16,100%,50%)] font-display text-sm tracking-[0.25em] uppercase mb-4">Мнения клиентов</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase">Отзывы</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="reveal border border-border p-8 hover:border-[hsl(16,100%,50%)] transition-colors">
                <div className="flex mb-4 gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-[hsl(16,100%,50%)]" />
                  ))}
                </div>
                <p className="text-foreground/70 font-light leading-relaxed mb-6 italic">«{r.text}»</p>
                <div>
                  <div className="font-display font-medium text-sm uppercase">{r.name}</div>
                  <div className="text-xs text-foreground/40 mt-1">{r.car}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal mb-16">
            <p className="text-[hsl(16,100%,50%)] font-display text-sm tracking-[0.25em] uppercase mb-4">Найти нас</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase">Контакты</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="reveal space-y-8">
              {[
                { icon: "MapPin", label: "Адрес", value: "г. Мурманск, ул. Шабалина, д. 14" },
                { icon: "Phone", label: "Телефон", value: "+7 (902) 134-47-07" },
                { icon: "Mail", label: "Email", value: "vitalii4396@yandex.ru" },
                { icon: "Clock", label: "Режим работы", value: "Пн-Вс: 10:00 — 19:00" },
              ].map((c) => (
                <div key={c.label} className="flex gap-5">
                  <div className="w-12 h-12 bg-[hsl(0,0%,8%)] flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={18} className="text-[hsl(16,100%,50%)]" />
                  </div>
                  <div>
                    <div className="text-xs text-foreground/40 uppercase tracking-widest font-display mb-1">{c.label}</div>
                    <div className="font-light text-foreground/80">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal delay-200 overflow-hidden" style={{ minHeight: 320 }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=33.074635%2C68.970664&z=16&pt=33.074635,68.970664,pm2rdm&text=%D0%9C%D1%83%D1%80%D0%BC%D0%B0%D0%BD%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%A8%D0%B0%D0%B1%D0%B0%D0%BB%D0%B8%D0%BD%D0%B0%2C%2014"
                width="100%"
                height="100%"
                style={{ minHeight: 320, border: 0 }}
                allowFullScreen
                title="Карта"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(0,0%,5%)] text-white/40 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-semibold text-white/80 tracking-widest uppercase">
            ПрофСервис<span className="text-[hsl(16,100%,50%)]">Авто</span>
          </span>
          <p className="text-sm font-light">© 2024 ПрофСервисАвто. Все права защищены.</p>
          <a href="tel:+79021344707" className="text-[hsl(16,100%,50%)] text-sm font-display uppercase tracking-wider hover:text-[hsl(16,100%,60%)] transition-colors">
            Позвонить →
          </a>
        </div>
      </footer>
    </div>
  );
}