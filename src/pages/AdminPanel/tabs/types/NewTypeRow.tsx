import { useState } from 'react'
import { type Type } from '../../../../shared/interfaces/types';
import { languages, type Language } from '../../../../shared/interfaces/translations';
import { TextField } from '@mui/material';

type Props = {
    onSave: (type: Type) => void
    onCancel: () => void
}

const emptyType: Type = {
    slug: '',
    title: {
        uk: '',
        en: '',
        ru: '',
    },
    description: {
        uk: '',
        en: '',
        ru: '',
    },
}

export function NewTypeRow({ onSave, onCancel }: Props) {
    const [data, setData] = useState<Type>(emptyType)

    const updateTranslation = (
        lang: Language,
        field: 'title' | 'description',
        value: string
    ) => {
        setData(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [lang]: value
            }
        }))
    }

    const isValid =
        data.slug.trim().length > 0 &&
        (languages).every(
            l => data.title[l].trim().length > 0
        )

    return (
        <tr>
            <td>
                <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                    <TextField
                        label={`Slug`}
                        fullWidth
                        required
                        value={data.slug}
                        onChange={e =>
                            setData({ ...data, slug: e.target.value.toLowerCase() })
                        }
                    />
                </div>
            </td>

            {(languages).map((lang: Language) => (
                <td key={lang}>
                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                        <TextField
                            label={`Title`}
                            fullWidth
                            required
                            value={data.title[lang]}
                            onChange={e =>
                                updateTranslation(lang, 'title', e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                        <TextField
                            label={`Description`}
                            fullWidth
                            value={data.description[lang]}
                            onChange={e =>
                                updateTranslation(lang, 'description', e.target.value)
                            }
                        />
                    </div>
                </td>
            ))}

            <td>
                <button
                    className="btn-main primary-btn mt-3"
                    onClick={() => onSave(data)}
                    disabled={!isValid}
                >
                    Save
                </button>

                <button type="button" onClick={onCancel} className="btn-main filter-btn mt-3">
                    Cancel
                </button>
            </td>
        </tr>
    )
}
