import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
  renderItem,
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const moveTween = useRef(null);
  const fadeTween = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
    return () => {
      moveTween.current?.kill();
      fadeTween.current?.kill();
    };
  }, []);

  const moveTo = (x, y) => {
    moveTween.current = gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  // Cache root rect, refresh only on resize/scroll
  const cachedRect = useRef({ left: 0, top: 0 });
  useEffect(() => {
    const refreshRect = () => {
      if (rootRef.current) {
        const r = rootRef.current.getBoundingClientRect();
        cachedRect.current = { left: r.left, top: r.top };
      }
    };
    refreshRect();
    window.addEventListener('scroll', refreshRect, { passive: true });
    window.addEventListener('resize', refreshRect, { passive: true });
    return () => {
      window.removeEventListener('scroll', refreshRect);
      window.removeEventListener('resize', refreshRect);
    };
  }, []);

  const handleMove = (e) => {
    moveTo(e.clientX - cachedRect.current.left, e.clientY - cachedRect.current.top);
    fadeTween.current = gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    fadeTween.current = gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{ '--r': `${radius}px` }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((item, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          style={{
            '--card-border': item.borderColor || 'transparent',
            '--card-gradient': item.gradient,
            cursor: item.url ? 'pointer' : 'default',
          }}
          onClick={() => item.url && window.open(item.url, '_blank', 'noopener,noreferrer')}
        >
          {renderItem ? renderItem(item, i) : (
            <>
              <div className="chroma-img-wrapper">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <footer className="chroma-info">
                <h3 className="name">{item.title}</h3>
                {item.handle && <span className="handle">{item.handle}</span>}
                <p className="role">{item.subtitle}</p>
              </footer>
            </>
          )}
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
