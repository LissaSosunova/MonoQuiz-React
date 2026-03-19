import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDictionaries } from '../../../../hooks/useDictionaries'
import { TestsAPI } from '../../../../api/tests.api'
import { useContext } from 'react'
import { DictionaryContext } from '../../../../context/DictionaryContext'
import { showToast } from '../../../../shared/ui/toast'
import { getImageUrl } from '../../../../shared/helpers/getImage'

export default function TestsTable() {
    const { i18n } = useTranslation()
    const currentLang = i18n.language
    const { tests } = useDictionaries()
    const navigate = useNavigate()
    const { reloadTests } = useContext(DictionaryContext)

    const handleDeleteTestClick = async (id: string) => {
        await TestsAPI.delete(id)
        await reloadTests()
        showToast.success('Test deleted')
        navigate('/admin-panel/tests/all')
    }
    const handleEditTestClick = (id: string) => {
        navigate(`/admin-panel/tests/${id}`)
    }

    return (
        <>
            <div className="w-full flex justify-content-center grid pt-5 pb-5">
                <table className="tests-table lg:col-8 md:col-10 col-12 justify-content-center align-items-center">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name / Description</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tests.map((test, index) => (
                            <tr key={index}>
                                <td><img src={getImageUrl(test.image)} width={200}/></td>
                                <td>{test.name[currentLang]}
                                    <small>{test.description[currentLang]}</small>
                                </td>
                                <td>{test.category}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn-medium filter-btn mt-1 w-full"
                                        onClick={() => handleEditTestClick(test._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-main primary-btn mt-3"
                                        onClick={() => handleDeleteTestClick(test._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Outlet />
        </>
    )
}