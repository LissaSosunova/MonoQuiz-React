import { useState, useRef, useEffect } from 'react'
import LangSwitcher from './LangSwitcher'
import UserInfo from './UserInfo'
import { useNavigate } from 'react-router-dom'
import LoginModal from './LoginModal'

function useMediaQuery(query: string) {
    return window.matchMedia(query).matches;
}

function Header() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const [desktopOpen, setDesktopOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isOpened = isMobile ? mobileOpen : desktopOpen;

    const toggle = () => {
        isMobile
            ? setMobileOpen(p => !p)
            : setDesktopOpen(p => !p);
    };

    const close = () => {
        isMobile
            ? setMobileOpen(false)
            : setDesktopOpen(false);
    };

    const [isOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const toggleDropdownMenu = () => {
        setMenuOpen(!isOpen)
    };
    // Handle clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current?.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Login
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate()

    const handleAdminClick = () => {
        const token = localStorage.getItem('token')

        if (token) {
            navigate('/admin-panel')
        } else {
            setShowLogin(true)
        }
    }

    const handleLoginSuccess = () => {
        setShowLogin(false)
        navigate('/admin-panel')
    }

    return (
        <>
            <header className="header bg-primary-reverse flex align-items-center justify-content-center">
                <section className="lg:col-8 md:col-10 col-12 flex align-items-center justify-content-between">
                    <a href="/">
                        <div className="logo-top"></div>
                    </a>
                    <div className="menu-wrapper flex justify-content-end">
                        <div className="burger"
                            onClick={toggleDropdownMenu}>
                            <div></div>
                            <div></div>
                        </div>
                        {/* Mobile */}
                        <div className={`menu mobile-lang ${isOpen ? 'open' : ''}`}
                            ref={dropdownRef}>
                            <div className="close-btn"
                                id="closeBtn" onClick={toggleDropdownMenu}>&times;</div>
                            <a href="/">Home</a>
                            <a href="/tests?page=1&from=10&itemsPerPage=10">Tests</a>
                            {isMobile && (
                                <UserInfo
                                    isOpened={mobileOpen}
                                    isMobile={true}
                                    onToggle={toggle}
                                    onClose={close}
                                />
                            )}
                            <a href="#" onClick={e => {
                                e.preventDefault()
                                handleAdminClick()
                            }}>
                                Admin panel
                            </a>

                            {showLogin && (
                                <LoginModal
                                    onClose={() => setShowLogin(false)}
                                    onSuccess={handleLoginSuccess}
                                />
                            )}
                            <LangSwitcher />
                        </div>

                        {/* Desktop */}
                        <div className="menu-opened desktop-lang">
                            <a href="/">Home</a>
                            <a href="/tests?page=1&from=10&itemsPerPage=10">Tests</a>
                            {/* Desktop */}
                            {!isMobile && (
                                <UserInfo
                                    isOpened={desktopOpen}
                                    isMobile={false}
                                    onToggle={toggle}
                                    onClose={close}
                                />
                            )}
                            <a href="#" onClick={e => {
                                e.preventDefault()
                                handleAdminClick()
                            }}>
                                Admin panel
                            </a>

                            {showLogin && (
                                <LoginModal
                                    onClose={() => setShowLogin(false)}
                                    onSuccess={handleLoginSuccess}
                                />
                            )}
                            <LangSwitcher />
                        </div>
                    </div>
                </section>
            </header>
        </>
    )
}

export default Header