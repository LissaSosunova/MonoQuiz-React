import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function LangSwitcher() {
    const { i18n } = useTranslation();
    const LANGUAGE_CODE = i18n.language;
    const [isLangOpen, setLangIsOpen] = useState(false);
    const dropdownLangRef = useRef<HTMLDivElement | null>(null);
    const toggleLangDropdown = () => {
        setLangIsOpen(!isLangOpen)
    };
    // Handle clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownLangRef.current && !dropdownLangRef.current?.contains(event.target as Node)) {
                setLangIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="lang-select" onClick={toggleLangDropdown}>
                <div className="lang-select-current">
                    {LANGUAGE_CODE == 'uk' ? (
                        <span>🇺🇦&nbsp;Українська</span>
                    ) : (
                        <span>🇬🇧&nbsp;English</span>
                    )}
                </div>
                <div ref={dropdownLangRef} className={`lang-select-options ${isLangOpen ? 'open' : ''}`}>
                    <div className={`lang-option ${isLangOpen ? 'open' : ''}`} data-lang="uk" onClick={() => i18n.changeLanguage('uk')}>🇺🇦&nbsp;Українська</div>
                    <div className={`lang-option ${isLangOpen ? 'open' : ''}`} data-lang="en" onClick={() => i18n.changeLanguage('en')}>🇬🇧&nbsp;English</div>
                </div>
            </div>
        </>
    )
}

export default LangSwitcher