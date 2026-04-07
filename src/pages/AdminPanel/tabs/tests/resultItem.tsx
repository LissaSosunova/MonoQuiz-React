import { Button, TextField, Box, Typography } from '@mui/material'
import NumberSpinner from '../../../../shared/components/numberSpiner'
import { type Control, type UseFormRegister } from 'react-hook-form'
import { type TestCreateForm, } from '../../../../shared/validators/tests.validation'
import { languages, type Language } from '../../../../shared/interfaces/translations'
import { Controller } from "react-hook-form"

type Props = {
    control: Control<TestCreateForm>
    register: UseFormRegister<TestCreateForm>
    resultIndex: number
    max: number
    removeResult: (index: number) => void
}

export default function ResultItem({ control, register, resultIndex, max, removeResult }: Props) {
    console.log(control._fields.results)
    return (
        <Box sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
                Result {resultIndex + 1}
            </Typography>

            {/* Result translations */}
            {languages.map((lang: Language) => (
                <Box key={lang} sx={{ mb: 2 }}>
                    <TextField
                        label={`Title (${lang})`}
                        fullWidth
                        required
                        {...register(`results.${resultIndex}.translations.${lang}`)}
                    />
                </Box>
            ))}

            {/* Score */}
            <Box key={resultIndex} sx={{ mb: 2, pl: 2 }}>
                <Controller
                    control={control}
                    name={`results.${resultIndex}.score.from`}
                    render={({ field }) => (
                        <NumberSpinner
                            label="From"
                            min={0}
                            max={max}
                            value={field.value}
                            onChange={(e, val) => field.onChange(val)}
                            size="small"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name={`results.${resultIndex}.score.to`}
                    render={({ field }) => (
                        <NumberSpinner
                            label="To"
                            min={0}
                            max={max}
                            value={field.value}
                            onChange={(e, val) => field.onChange(val)}
                            size="small"
                        />
                    )}
                />

            </Box>
            <Button color="error" sx={{ mt: 1, ml: 2 }} onClick={() => removeResult(resultIndex)}>
                Remove Result
            </Button>
        </Box>
    )
}
