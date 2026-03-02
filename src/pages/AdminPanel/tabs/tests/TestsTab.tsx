import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Container
} from '@mui/material'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEmptyTranslation, createEmptyQuestion } from '../../../../shared/helpers/test.helper';
import { languages, type Language } from '../../../../shared/interfaces/translations';
import { useRef } from 'react';
import { TestCreateSchema, type TestCreateForm } from '../../../../shared/validators/tests.validation';
import QuestionItem from './questionItem';

export default function TestsTab() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<TestCreateForm>({
    resolver: zodResolver(TestCreateSchema),
    defaultValues: {
      name: createEmptyTranslation(),
      description: createEmptyTranslation(),
      type: '',
      category: '',
      calculationScheme: { type: 'sum' },
      questions: [],
      price: 0,
      image: ''
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  })

  const calcType = watch('calculationScheme.type')
  const imageValue = watch('image')

  // JSON import
  const handleJsonUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(
          event.target?.result as string
        )

        const validated =
          TestCreateSchema.parse(parsed)

        Object.entries(validated).forEach(
          ([key, value]) => {
            setValue(
              key as keyof TestCreateForm,
              value
            )
          }
        )
      } catch (error) {
        alert('Invalid JSON structure')
      }
    }

    reader.readAsText(file)
  }
  // Open modal btn
  const handleOpenImagePopup = () => {
    console.log('Open image selector popup')
    // TODO: later
  }

  // Submith
  const onSubmit = (data: TestCreateForm) => {
    console.log('VALID DATA:', data)
  }


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Create Test
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* ===================== */}
        {/* NAME & DESCRIPTION    */}
        {/* ===================== */}

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Name & Description
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

            {languages.map((lang: Language) => (
              <Grid size={4}>
                <Box key={lang} sx={{ mb: 3 }} >
                  <Typography variant="subtitle1">
                    {lang.toUpperCase()}
                  </Typography>

                  <TextField
                    label="Name"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register(`name.${lang}`)}
                  />

                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    {...register(`description.${lang}`)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

        </Paper>

        {/* ===================== */}
        {/* TYPE / CATEGORY / PRICE */}
        {/* ===================== */}

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>

          <Grid container spacing={3} sx={{
            justifyContent: "space-between",
            alignItems: "stretch",
          }}>
            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                select
                label="Type"
                fullWidth
                {...register('type')}
              >
                <MenuItem value="quiz">Quiz</MenuItem>
                <MenuItem value="psychological">Psychological</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Category"
                fullWidth
                {...register('category')}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                {...register('price', { valueAsNumber: true })}
              />
            </Grid>
          </Grid>
        </Paper>


        <Grid container spacing={2} sx={{
          justifyContent: "space-between",
          alignItems: "stretch",
        }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ p: 3, mb: 4 }}>
            {/* ===================== */}
            {/* CALCULATION SCHEME    */}
            {/* ===================== */}
            <Paper sx={{ p: 3, mb: 4, height: '100%' }} elevation={1}>
              <Typography variant="h6" gutterBottom>
                Calculation Scheme
              </Typography>

              <TextField
                select
                label="Calculation Type"
                fullWidth
                sx={{ mb: 2 }}
                {...register('calculationScheme.type')}
              >
                <MenuItem value="sum">Sum</MenuItem>
                <MenuItem value="formula">Formula</MenuItem>
              </TextField>

              <TextField
                label="Formula"
                fullWidth
                {...register('calculationScheme.formula')}
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ p: 3, mb: 4 }}>
            {/* ===================== */}
            {/* IMAGE SELECTOR        */}
            {/* ===================== */}

            <Paper sx={{ p: 3, mb: 4, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Image
              </Typography>

              <TextField
                label="Image URL"
                fullWidth
                sx={{ mb: 2 }}
                {...register('image')}
              />

              <Button
                variant="outlined"
                onClick={() => handleOpenImagePopup()}
              >
                Select Image
              </Button>
            </Paper>
          </Grid>
        </Grid>




        {/* ===================== */}
        {/* QUESTIONS             */}
        {/* ===================== */}

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Questions
          </Typography>

          {fields.map((field, questionIndex) => (
            <QuestionItem
              key={field.id}
              control={control}
              register={register}
              questionIndex={questionIndex}
              removeQuestion={remove}
            />
          ))}

          <Button
            variant="contained"
            onClick={() => append(createEmptyQuestion())}
          >
            Add Question
          </Button>
        </Paper>


        {/* ===================== */}
        {/* JSON IMPORT           */}
        {/* ===================== */}

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            JSON Import
          </Typography>

          <Button
            variant="outlined"
            component="label"
          >
            Import JSON
            <input
              type="file"
              hidden
              accept="application/json"
              onChange={handleJsonUpload}
            />
          </Button>
        </Paper>

        {/* ===================== */}
        {/* SUBMIT                */}
        {/* ===================== */}

        <Box sx={{ textAlign: 'right' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Create Test
          </Button>
        </Box>

      </Box>
    </Container>
  )
}
