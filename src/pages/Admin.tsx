import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS_URL = "https://functions.poehali.dev/16ed3215-546a-4684-9b78-8df04a577cfb";

interface Review {
  id: number;
  name: string;
  car: string;
  text: string;
  rating: number;
  approved: boolean;
  created_at: string;
}

export default function Admin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch(`${REVIEWS_URL}?admin=1`)
      .then((r) => r.json())
      .then((d) => { setReviews(d.reviews || []); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const update = async (id: number, approved: boolean) => {
    await fetch(REVIEWS_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Удалить отзыв?")) return;
    await fetch(REVIEWS_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <div className="min-h-screen bg-[hsl(0,0%,96%)] font-body">
      <div className="bg-[hsl(0,0%,8%)] text-white px-6 py-4 flex items-center justify-between">
        <span className="font-display text-lg font-semibold tracking-widest uppercase">
          ПрофСервис<span className="text-[hsl(16,100%,50%)]">Авто</span>
          <span className="text-white/40 text-sm font-light ml-3 normal-case tracking-normal">Модерация отзывов</span>
        </span>
        <a href="/" className="text-white/50 hover:text-white text-sm transition-colors">← На сайт</a>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-foreground/40 font-light">Загрузка...</p>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="font-display text-xl font-semibold uppercase mb-6 flex items-center gap-3">
                <span className="bg-[hsl(16,100%,50%)] text-white text-xs px-2 py-1">{pending.length}</span>
                Ожидают проверки
              </h2>
              {pending.length === 0 ? (
                <p className="text-foreground/40 font-light">Новых отзывов нет</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {pending.map((r) => (
                    <ReviewCard key={r.id} r={r} onApprove={() => update(r.id, true)} onDelete={() => remove(r.id)} />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold uppercase mb-6 flex items-center gap-3">
                <span className="bg-green-600 text-white text-xs px-2 py-1">{approved.length}</span>
                Опубликованные
              </h2>
              {approved.length === 0 ? (
                <p className="text-foreground/40 font-light">Нет опубликованных отзывов</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {approved.map((r) => (
                    <ReviewCard key={r.id} r={r} published onHide={() => update(r.id, false)} onDelete={() => remove(r.id)} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ r, published, onApprove, onHide, onDelete }: {
  r: Review;
  published?: boolean;
  onApprove?: () => void;
  onHide?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="bg-white border border-border p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-display font-semibold text-sm uppercase">{r.name}</span>
          {r.car && <span className="text-xs text-foreground/40">{r.car}</span>}
          <span className="text-xs text-foreground/30 ml-auto">{new Date(r.created_at).toLocaleDateString("ru-RU")}</span>
        </div>
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: r.rating }).map((_, j) => (
            <Icon key={j} name="Star" size={12} className="text-[hsl(16,100%,50%)]" />
          ))}
        </div>
        <p className="text-foreground/70 font-light text-sm leading-relaxed italic">«{r.text}»</p>
      </div>
      <div className="flex md:flex-col gap-2 shrink-0">
        {!published && onApprove && (
          <button
            onClick={onApprove}
            className="bg-green-600 text-white font-display uppercase tracking-widest text-xs px-4 py-2 hover:bg-green-700 transition-colors flex items-center gap-1"
          >
            <Icon name="Check" size={14} /> Одобрить
          </button>
        )}
        {published && onHide && (
          <button
            onClick={onHide}
            className="bg-foreground/10 text-foreground font-display uppercase tracking-widest text-xs px-4 py-2 hover:bg-foreground/20 transition-colors flex items-center gap-1"
          >
            <Icon name="EyeOff" size={14} /> Скрыть
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="border border-red-200 text-red-500 font-display uppercase tracking-widest text-xs px-4 py-2 hover:bg-red-50 transition-colors flex items-center gap-1"
          >
            <Icon name="Trash2" size={14} /> Удалить
          </button>
        )}
      </div>
    </div>
  );
}
