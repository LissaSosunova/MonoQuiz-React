import { languages, type Language } from '../../../shared/interfaces/translations'
import { type Test } from '../../../shared/interfaces/test'
import { useTranslation } from 'react-i18next'
import { getImageUrl } from '../../../shared/helpers/getImage'


type Props = {
  test: Test
}

export function CaruselItem({ test }: Props) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language as Language

  return (
    <>
      <div className="test-card w-full grid">
        <section>
          <div className="img-card">
            <div className="time-block">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuOTI1MDggOC43NDE3NUw4Ljc0MTc1IDcuOTI1MDhMNi41ODM0MiA1Ljc2Njc1VjMuMDgzNDJINS40MTY3NVY2LjIzMzQyTDcuOTI1MDggOC43NDE3NVpNNi4wMDAwOCAxMS44MzM0QzUuMTkzMTQgMTEuODMzNCA0LjQzNDggMTEuNjgwMyAzLjcyNTA4IDExLjM3NEMzLjAxNTM2IDExLjA2NzggMi4zOTggMTAuNjUyMiAxLjg3MyAxMC4xMjcyQzEuMzQ4IDkuNjAyMTcgMC45MzIzNzMgOC45ODQ4MSAwLjYyNjEyMyA4LjI3NTA4QzAuMzE5ODczIDcuNTY1MzYgMC4xNjY3NDggNi44MDcwMyAwLjE2Njc0OCA2LjAwMDA4QzAuMTY2NzQ4IDUuMTkzMTQgMC4zMTk4NzMgNC40MzQ4IDAuNjI2MTIzIDMuNzI1MDhDMC45MzIzNzMgMy4wMTUzNiAxLjM0OCAyLjM5OCAxLjg3MyAxLjg3M0MyLjM5OCAxLjM0OCAzLjAxNTM2IDAuOTMyMzczIDMuNzI1MDggMC42MjYxMjNDNC40MzQ4IDAuMzE5ODczIDUuMTkzMTQgMC4xNjY3NDggNi4wMDAwOCAwLjE2Njc0OEM2LjgwNzAzIDAuMTY2NzQ4IDcuNTY1MzYgMC4zMTk4NzMgOC4yNzUwOCAwLjYyNjEyM0M4Ljk4NDgxIDAuOTMyMzczIDkuNjAyMTcgMS4zNDggMTAuMTI3MiAxLjg3M0MxMC42NTIyIDIuMzk4IDExLjA2NzggMy4wMTUzNiAxMS4zNzQgMy43MjUwOEMxMS42ODAzIDQuNDM0OCAxMS44MzM0IDUuMTkzMTQgMTEuODMzNCA2LjAwMDA4QzExLjgzMzQgNi44MDcwMyAxMS42ODAzIDcuNTY1MzYgMTEuMzc0IDguMjc1MDhDMTEuMDY3OCA4Ljk4NDgxIDEwLjY1MjIgOS42MDIxNyAxMC4xMjcyIDEwLjEyNzJDOS42MDIxNyAxMC42NTIyIDguOTg0ODEgMTEuMDY3OCA4LjI3NTA4IDExLjM3NEM3LjU2NTM2IDExLjY4MDMgNi44MDcwMyAxMS44MzM0IDYuMDAwMDggMTEuODMzNFpNNi4wMDAwOCAxMC42NjY3QzcuMjkzMTQgMTAuNjY2NyA4LjM5NDE4IDEwLjIxMjIgOS4zMDMyMSA5LjMwMzIxQzEwLjIxMjIgOC4zOTQxOCAxMC42NjY3IDcuMjkzMTQgMTAuNjY2NyA2LjAwMDA4QzEwLjY2NjcgNC43MDcwMyAxMC4yMTIyIDMuNjA1OTggOS4zMDMyMSAyLjY5Njk2QzguMzk0MTggMS43ODc5MyA3LjI5MzE0IDEuMzMzNDEgNi4wMDAwOCAxLjMzMzQxQzQuNzA3MDMgMS4zMzM0MSAzLjYwNTk4IDEuNzg3OTMgMi42OTY5NiAyLjY5Njk2QzEuNzg3OTMgMy42MDU5OCAxLjMzMzQxIDQuNzA3MDMgMS4zMzM0MSA2LjAwMDA4QzEuMzMzNDEgNy4yOTMxNCAxLjc4NzkzIDguMzk0MTggMi42OTY5NiA5LjMwMzIxQzMuNjA1OTggMTAuMjEyMiA0LjcwNzAzIDEwLjY2NjcgNi4wMDAwOCAxMC42NjY3WiIgZmlsbD0iIzRBNDQ1OSIvPgo8L3N2Zz4K"
                alt="Red dot"
                className="time-block-time" />
              40 m
            </div>
            <img src={getImageUrl(test.image)} width={200} />
          </div>
          <div className="">
            <h5 className="text-left pl-2 pr-2">{test?.name[currentLang]}</h5>
            <p className="mt-3 text-left pl-2 pr-2">{test?.description[currentLang]}</p>
          </div>

          <div className="col flex justify-content-between mb-2">
            <div className="col-fixed">
              <span className="test-price col">${test.price}</span>
            </div>
            <div className="text-right pr-3">
              <form action="{% url 'test_start' test.pk %}">
                <button className="btn-main primary-btn ml-auto"
                  type="submit">
                  Take test
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
