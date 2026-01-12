import { useState, useRef, useEffect } from 'react'

function LangSwitcher() {
    const [LANGUAGE_CODE, setNewLang] = useState({ language: 'uk' });
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
    const changLang = (event: React.MouseEvent<HTMLDivElement>) => {
        const { dataset } = event.currentTarget;
        const newLang = {
            ...LANGUAGE_CODE, language: dataset.lang as string
        }
        setNewLang(newLang);
    }

    return (
        <>
            <div className="lang-select" onClick={toggleLangDropdown}>
                <div className="lang-select-current">
                    {LANGUAGE_CODE.language == 'uk' ? (
                        <span>🇺🇦&nbsp;Українська</span>
                    ) : (
                        <span>🇬🇧&nbsp;English</span>
                    )}
                </div>
                <div ref={dropdownLangRef} className={`lang-select-options ${isLangOpen ? 'open' : ''}`}>
                    <div className={`lang-option ${isLangOpen ? 'open' : ''}`} data-lang="uk" onClick={changLang}>🇺🇦&nbsp;Українська</div>
                    <div className={`lang-option ${isLangOpen ? 'open' : ''}`} data-lang="en" onClick={changLang}>🇬🇧&nbsp;English</div>
                </div>
            </div>
        </>
    )
}

export default LangSwitcher