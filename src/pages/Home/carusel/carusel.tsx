import { useRef } from 'react'
import { type Test } from '../../../shared/interfaces/test'
import { CaruselItem } from './caruselItem'
import { useTranslation } from 'react-i18next'

type Props = {
    tests: Test[]
}

export function Carusel({ tests }: Props) {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return

        const scrollAmount = 300 // ширина прокрутки
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        })
    }

    return (
        <>
            <div className="flex items-center">
                {/* Влево */}
                <button onClick={() => scroll('left')} className="rounded-btn">
                    <svg width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.4301 18.8201C14.2401 18.8201 14.0501 18.7501 13.9001 18.6001C13.6101 18.3101 13.6101 17.8301 13.9001 17.5401L19.4401 12.0001L13.9001 6.46012C13.6101 6.17012 13.6101 5.69012 13.9001 5.40012C14.1901 5.11012 14.6701 5.11012 14.9601 5.40012L21.0301 11.4701C21.3201 11.7601 21.3201 12.2401 21.0301 12.5301L14.9601 18.6001C14.8101 18.7501 14.6201 18.8201 14.4301 18.8201Z"
                            fill="#4A4459" />
                        <path d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
                            fill="#4A4459" />
                    </svg>

                </button>

                {/* Вправо */}
                <button onClick={() => scroll('right')} className="rounded-btn ml-3">
                    <svg width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.4301 18.8201C14.2401 18.8201 14.0501 18.7501 13.9001 18.6001C13.6101 18.3101 13.6101 17.8301 13.9001 17.5401L19.4401 12.0001L13.9001 6.46012C13.6101 6.17012 13.6101 5.69012 13.9001 5.40012C14.1901 5.11012 14.6701 5.11012 14.9601 5.40012L21.0301 11.4701C21.3201 11.7601 21.3201 12.2401 21.0301 12.5301L14.9601 18.6001C14.8101 18.7501 14.6201 18.8201 14.4301 18.8201Z"
                            fill="#4A4459" />
                        <path d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
                            fill="#4A4459" />
                    </svg>

                </button>

                <a
                    className="rounded-btn rounded-btn-invert ml-3"
                    href="/tests?page=1&from=10&itemsPerPage=10"
                >
                    {t('HOME.buttons.All')}
                </a>
            </div>

            {/* Карусель */}
            <div
                ref={scrollRef}
                className="carousel-container"
                style={{ scrollbarWidth: 'none' }} // скрыть scrollbar (Firefox)
            >
                {tests.map((test, index) => (
                    <div
                        key={index}
                        className="carousel-item"
                    >
                        <CaruselItem test={test} />
                    </div>
                ))}
            </div>
        </>
    )
}
