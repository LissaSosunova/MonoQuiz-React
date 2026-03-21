import { useSearchParams } from 'react-router-dom'
import { CaruselItem } from '../Home/carusel/caruselItem'
import { DictionaryContext } from '../../context/DictionaryContext'
import { useDictionaries } from '../../hooks/useDictionaries'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { TestsAPI } from '../../api/tests.api'
import { type Test } from '../../shared/interfaces/test'

export default function Tests() {
  const [searchParams] = useSearchParams()
  const { categories, tests } = useDictionaries()
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  const [currentTests, setTests] = useState<Test[]>([])
  const [currentFilter, setCurrentFilter] = useState<string | null>(null)


  useEffect(() => {
    setTests(tests)
  }, [tests])

  const handleSetFilterClick = async (value?: string) => {
    if (value) {
      const data = await TestsAPI.getAll(value)
      setTests(data)
      setCurrentFilter(value)
    } else {
      setTests(tests)
      setCurrentFilter(null)
    }
  }


  return (
    <>
      <div className="w-full bg-gradient-main flex justify-content-center flex-column align-items-center">
        <div className="flex flex-column lg:col-8 md:col-10 col-12 justify-content-center align-items-center mb-41">
          <h1>Tests</h1>
        </div>
      </div>
      <div className="w-full flex flex-column justify-content-center align-items-center">
        <h1>Categories</h1>
        <section>
          <button
            className={`btn-medium filter-btn mt-3 ml-3 ${currentFilter === null ? 'active-filter' : ''
              }`}
            onClick={() => handleSetFilterClick()}
          >
            No filter
          </button>
          {categories.map(category => (
            <button
              key={category.slug}
              className={`btn-medium filter-btn mt-3 ml-3 ${currentFilter === category.slug ? 'active-filter' : ''
                }`}
              onClick={() => handleSetFilterClick(category.slug)}
            >
              {category.title[currentLang]}
            </button>
          ))}

        </section>
      </div>
      <div className="w-full flex flex-column justify-content-center align-items-center">
        <div className="flex flex-column lg:col-8 md:col-10 col-12 justify-content-center align-items-center mb-4">
          <div className="test-page-grid">
            {currentTests.map((test: Test, index: number) => (
              <div
                key={index}
                className="carousel-item"
              >
                <CaruselItem test={test} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  )
}