import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { useLanguageLinks } from "@/lib/contexts/language-links-context";
import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import LanguageIcon from "@/styles/icons/language.svg";

export function LanguageSwitcher() {
  const languageLinks = useLanguageLinks();
  const { locale, locales } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((o) => !o);
  const close = () => setIsOpen(false);

  // Close on locale change
  useEffect(close, [locale]);

  // Close on click outside
  const ref = useOnClickOutside<HTMLDivElement>(close);
  const { t } = useTranslation();

  return (
    <div>
      {/* Drop-down on hover for desktop */}
      {/* <div
      ref={ref}
      className="hidden lg:block"
      onMouseEnter={() => setIsOpen(true)}
      aria-expanded={isOpen}
      >
        <span className="sr-only">{t("language-switcher")}</span>
        <div>
          <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
            {languageLinks[locale].langcode}
          </span>
          <LanguageIcon className="inline-block h-6 w-6" aria-hidden="true" />
        </div>
        <ul
          className={clsx(
            "absolute z-50 shadow-lg w-fit border border-finnishwinter bg-mischka",
            !isOpen && "hidden",
          )}
        >
          {locales
            .filter((l) => l !== locale)
            .map((l) => {
              const { name, path } = languageLinks[l];
              return (
                <li key={l}>
                  <Link
                    className="block p-3 hover:bg-primary-50 group"
                    locale={l}
                    href={path}
                  >
                    <div className="group-hover:translate-x-2 transition-all duration-200 ease-in-out">
                      {name}
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div> */}
      {/* Drop-down on click for mobile */}
      <div ref={ref} /* className="lg:hidden" */>
        <span className="sr-only">{t("language-switcher")}</span>
        <button
          type="button"
          className="hover:underline"
          onClick={toggle}
          aria-expanded={isOpen}
        >
          <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
            {languageLinks[locale].langcode}
          </span>
          <LanguageIcon className="inline-block h-6 w-6" aria-hidden="true" />
        </button>
        <ul
          className={clsx(
            "absolute z-50 mt-1 shadow-lg w-fit border border-finnishwinter bg-mischka",
            !isOpen && "hidden",
          )}
        >
          {locales
            .filter((l) => l !== locale)
            .map((l) => {
              const { name, path } = languageLinks[l];
              return (
                <li key={l}>
                  <Link
                    className="block p-3 hover:bg-primary-50"
                    locale={l}
                    href={path}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
