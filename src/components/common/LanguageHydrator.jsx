import { useEffect, useMemo } from 'react';
import { phraseTranslations } from '../../data/translations';
import { useApp } from '../../context/AppContext';

const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE']);

const preserveSpacing = (original, replacement) => {
  const start = original.match(/^\s*/)?.[0] || '';
  const end = original.match(/\s*$/)?.[0] || '';
  return `${start}${replacement}${end}`;
};

const normalize = (text) => text.replace(/\s+/g, ' ').trim();


const translateDynamic = (text, language) => {
  if (language === 'en') {
    const patterns = [
      [/^عرض (\d+) من أصل (\d+) مستخدم$/, 'Showing $1 of $2 users'],
      [/^عرض (\d+) من أصل (\d+) برنامج$/, 'Showing $1 of $2 programs'],
      [/^(\d+) ساعات$/, '$1 credits'],
      [/^(\d+) محاضرة$/, '$1 lectures'],
      [/^(\d+) طالب$/, '$1 students'],
      [/^(\d+) مقعد$/, '$1 seats'],
      [/^قاعة (.+)$/, 'Room $1'],
      [/^منذ 10 دقائق$/, '10 minutes ago'],
      [/^منذ 30 دقيقة$/, '30 minutes ago'],
      [/^منذ ساعة$/, '1 hour ago'],
      [/^منذ ساعتين$/, '2 hours ago'],
      [/^منذ يومين$/, '2 days ago']
    ];
    for (const [regex, replacement] of patterns) {
      if (regex.test(text)) return text.replace(regex, replacement);
    }
  } else {
    const patterns = [
      [/^Showing (\d+) of (\d+) users$/, 'عرض $1 من أصل $2 مستخدم'],
      [/^Showing (\d+) of (\d+) programs$/, 'عرض $1 من أصل $2 برنامج'],
      [/^(\d+) credits$/, '$1 ساعات'],
      [/^(\d+) lectures$/, '$1 محاضرة'],
      [/^(\d+) students$/, '$1 طالب'],
      [/^(\d+) seats$/, '$1 مقعد'],
      [/^Room (.+)$/, 'قاعة $1']
    ];
    for (const [regex, replacement] of patterns) {
      if (regex.test(text)) return text.replace(regex, replacement);
    }
  }
  return null;
};

const LanguageHydrator = () => {
  const { language } = useApp();

  const reverse = useMemo(() => {
    const out = {};
    Object.entries(phraseTranslations).forEach(([ar, en]) => { out[en] = ar; });
    return out;
  }, []);

  useEffect(() => {
    const dict = language === 'en' ? phraseTranslations : reverse;

    const translateText = (node) => {
      if (!node?.nodeValue) return;
      const parent = node.parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName) || parent.closest('[data-no-translate]')) return;
      const key = normalize(node.nodeValue);
      if (!key) return;
      const replacement = dict[key] || translateDynamic(key, language);
      if (!replacement) return;
      node.nodeValue = preserveSpacing(node.nodeValue, replacement);
    };

    const translateAttrs = (el) => {
      if (!el || el.nodeType !== Node.ELEMENT_NODE || el.closest('[data-no-translate]')) return;
      ATTRS.forEach(attr => {
        const value = el.getAttribute(attr);
        const key = value && normalize(value);
        if (key && dict[key]) el.setAttribute(attr, dict[key]);
      });
    };

    const translateTree = (root) => {
      if (!root) return;
      if (root.nodeType === Node.TEXT_NODE) {
        translateText(root);
        return;
      }
      if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
      translateAttrs(root);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent || SKIP_TAGS.has(parent.tagName) || parent.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(translateText);
      if (root.querySelectorAll) root.querySelectorAll('*').forEach(translateAttrs);
    };

    let raf = requestAnimationFrame(() => translateTree(document.body));
    const observer = new MutationObserver((mutations) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        mutations.forEach(m => {
          if (m.type === 'characterData') translateText(m.target);
          m.addedNodes.forEach(translateTree);
          if (m.type === 'attributes') translateAttrs(m.target);
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [language, reverse]);

  return null;
};

export default LanguageHydrator;
