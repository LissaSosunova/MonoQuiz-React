import { Button, TextField, Box, Typography } from '@mui/material'
import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form'
import { type TestCreateForm,  } from '../../../../shared/validators/tests.validation'
import { createEmptyAnswer } from '../../../../shared/helpers/test.helper'
import { languages, type Language } from '../../../../shared/interfaces/translations'

type Props = {
  control: Control<TestCreateForm>
  register: UseFormRegister<TestCreateForm>
  questionIndex: number
  removeQuestion: (index: number) => void
}

export default function QuestionItem({ control, register, questionIndex, removeQuestion }: Props) {
  const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`
  })

  return (
    <Box sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Question {questionIndex + 1}
      </Typography>

      {/* Question translations */}
      {languages.map((lang: Language) => (
        <Box key={lang} sx={{ mb: 2 }}>
          <TextField
            label={`Title (${lang})`}
            fullWidth
            required
            {...register(`questions.${questionIndex}.translations.${lang}`)}
          />
        </Box>
      ))}

      {/* Answers */}
      {answerFields.map((field, answerIndex) => (
        <Box key={field.id} sx={{ mb: 2, pl: 2 }}>
          {languages.map((lang: Language) => (
            <TextField
              key={lang}
              label={`Answer (${lang})`}
              fullWidth
              required
              sx={{ mb: 1 }}
              {...register(`questions.${questionIndex}.answers.${answerIndex}.translations.${lang}`)}
            />
          ))}

          <TextField
            label="Score"
            type="number"
            required
            sx={{ mb: 1 }}
            {...register(`questions.${questionIndex}.answers.${answerIndex}.score`, { valueAsNumber: true })}
          />

          <Button color="error" onClick={() => removeAnswer(answerIndex)}>
            Remove Answer
          </Button>
        </Box>
      ))}

      <Button variant="outlined" sx={{ mt: 1 }} onClick={() => appendAnswer(createEmptyAnswer())}>
        Add Answer
      </Button>

      <Button color="error" sx={{ mt: 1, ml: 2 }} onClick={() => removeQuestion(questionIndex)}>
        Remove Question
      </Button>
    </Box>
  )
}
