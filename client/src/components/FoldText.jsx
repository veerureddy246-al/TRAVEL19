import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const FoldText = ({
  text,
  children,
  splitBy = 'char',
  hinge = 'top',
  trigger = 'mount',
  duration = 0.65,
  stagger = 0.045,
  ease = 'power3.out',
  perspective = 700,
  creaseShading = 0.55,
  fontSize,
  fontWeight,
  color,
  className = '',
  style = {},
  as: Component = 'h2',
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const targets = containerRef.current.querySelectorAll('.fold-unit');
      const creases = containerRef.current.querySelectorAll('.fold-crease');

      if (!targets.length) return;

      let startTransform = {};
      let transformOrigin = '50% 0%';

      if (hinge === 'top') {
        transformOrigin = '50% 0%';
        startTransform = { rotationX: -90 };
      } else if (hinge === 'bottom') {
        transformOrigin = '50% 100%';
        startTransform = { rotationX: 90 };
      } else if (hinge === 'left') {
        transformOrigin = '0% 50%';
        startTransform = { rotationY: 90 };
      } else if (hinge === 'right') {
        transformOrigin = '100% 50%';
        startTransform = { rotationY: -90 };
      }

      gsap.set(targets, {
        transformOrigin,
        transformPerspective: perspective,
        opacity: 0,
        ...startTransform
      });

      if (creases.length > 0) {
        gsap.set(creases, { opacity: creaseShading });
      }

      const tl = gsap.timeline({
        delay: 0.1
      });

      tl.to(
        targets,
        {
          rotationX: 0,
          rotationY: 0,
          opacity: 1,
          duration: duration,
          stagger: stagger,
          ease: ease
        },
        0
      );

      if (creases.length > 0) {
        tl.to(
          creases,
          {
            opacity: 0,
            duration: duration,
            stagger: stagger,
            ease: ease
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [text, children, splitBy, hinge, trigger, duration, stagger, ease, perspective, creaseShading]);

  // Helper to recursively parse and fold text nodes / React nodes while preserving classes and colors
  const renderFoldableContent = (content) => {
    if (typeof content === 'string' || typeof content === 'number') {
      const words = String(content).split(' ');
      return words.map((word, wordIndex) => {
        if (!word) {
          return <span key={wordIndex} className="fold-space inline-block">&nbsp;</span>;
        }
        return (
          <span
            key={wordIndex}
            className="fold-word inline-block whitespace-nowrap"
            style={{ marginRight: wordIndex < words.length - 1 ? '0.28em' : '0' }}
          >
            {splitBy === 'char' ? (
              word.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="fold-unit relative inline-block"
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform, opacity'
                  }}
                >
                  {char}
                  {creaseShading > 0 && (
                    <span
                      className="fold-crease absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.05))',
                        opacity: creaseShading,
                        borderRadius: '2px'
                      }}
                      aria-hidden="true"
                    />
                  )}
                </span>
              ))
            ) : (
              <span
                className="fold-unit relative inline-block"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity'
                }}
              >
                {word}
                {creaseShading > 0 && (
                  <span
                    className="fold-crease absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.05))',
                      opacity: creaseShading,
                      borderRadius: '2px'
                    }}
                    aria-hidden="true"
                  />
                )}
              </span>
            )}
          </span>
        );
      });
    }

    if (React.isValidElement(content)) {
      const childProps = content.props || {};
      return React.cloneElement(
        content,
        {
          ...childProps,
          key: content.key || undefined,
          className: `${childProps.className || ''} fold-nested-span`.trim()
        },
        renderFoldableContent(childProps.children)
      );
    }

    if (Array.isArray(content)) {
      return content.map((item, idx) => (
        <React.Fragment key={idx}>{renderFoldableContent(item)}</React.Fragment>
      ));
    }

    return content;
  };

  const rawContent = children !== undefined ? children : (text || '');
  const computedStyle = {
    display: 'inline-block',
    perspective: `${perspective}px`,
    ...(color ? { color } : {}),
    ...(fontWeight ? { fontWeight } : {}),
    ...(fontSize ? { fontSize } : {}),
    ...style
  };

  return (
    <Component
      ref={containerRef}
      className={`foldtext-heading ${className}`}
      style={computedStyle}
      {...props}
    >
      {renderFoldableContent(rawContent)}
    </Component>
  );
};

export default FoldText;
