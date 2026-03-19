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
import { createEmptyTranslation, createEmptyQuestion } from '../../../../shared/helpers/test.helper'
import { languages, type Language } from '../../../../shared/interfaces/translations'
import { useRef, useState } from 'react'
import { TestCreateSchema, type TestCreateForm } from '../../../../shared/validators/tests.validation'
import QuestionItem from './questionItem'
import { showToast } from '../../../../shared/ui/toast'
import { useTranslation } from 'react-i18next'
import { Controller } from "react-hook-form"
import { TestsAPI } from '../../../../api/tests.api'
import { useContext } from 'react'
import { DictionaryContext } from '../../../../context/DictionaryContext'
import { useDictionaries } from '../../../../hooks/useDictionaries'
import { ImageCropModal } from '../../../../components/ImageCropModal'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getImageUrl } from '../../../../shared/helpers/getImage'


export default function CreateTestsTab() {
    const { id } = useParams()
    const isCreate = id === 'create'
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const { i18n } = useTranslation()
    const currentLang = i18n.language
    const { reloadTests } = useContext(DictionaryContext)
    const { tests } = useDictionaries()

    const currentTest = tests.find(test => test._id === id)

    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isValid, isSubmitting }
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


    useEffect(() => {
        if (!isCreate && currentTest) {
            reset({
                name: currentTest.name,
                description: currentTest.description,
                type: currentTest.type,
                category: currentTest.category,
                calculationScheme: currentTest.calculationScheme,
                questions: currentTest.questions,
                price: currentTest.price ?? 0,
                image: currentTest.image || ''
            })

            setImage(currentTest.image || null)
        }
    }, [currentTest, isCreate, reset])


    const navigate = useNavigate()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions'
    })

    const { types, categories } = useDictionaries()

    const [open, setOpen] = useState(false)
    const [image, setImage] = useState<string | null>(null)

    const calcType = watch('calculationScheme.type')
    const imageValue = watch('image')
    const nameValues = watch('name')
    const descriptionValues = watch('description')
    const typeValues = watch('type')
    const categotyValues = watch('category')


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
                const validated = TestCreateSchema.parse(parsed)
                reset(validated)

            } catch (error) {
                alert('Invalid JSON structure')
                showToast.error('Invalid JSON structure')
            }
        }

        reader.readAsText(file)
    }
    // Open modal btn
    const handleOpenImagePopup = (value: boolean) => {
        setOpen(value)
    }


    // Submith
    const onSubmit = async (data: TestCreateForm) => {
        if (isCreate) {
            await TestsAPI.create(data)
            showToast.success('Test created')
        } else {
            await TestsAPI.update(id!, data)
            showToast.success('Test updated')
        }
        navigate('/admin-panel/tests/all')
        await reloadTests()

    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
            <Typography variant="h4" gutterBottom>
                {isCreate ? 'Create Test' : 'Edit Test'}
            </Typography>

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
                            <Grid size={4} key={lang}>
                                <Box sx={{ mb: 3 }} >
                                    <Typography variant="subtitle1">
                                        {lang.toUpperCase()}
                                    </Typography>

                                    <TextField
                                        label="Name"
                                        required
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        {...register(`name.${lang}`)}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: !!nameValues?.[lang]
                                            },
                                        }}
                                    />

                                    <TextField
                                        label="Description"
                                        required
                                        fullWidth
                                        multiline
                                        rows={3}
                                        {...register(`description.${lang}`)}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: !!descriptionValues?.[lang]
                                            },
                                        }}
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
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        select
                                        label="Type"
                                        disabled={!types.length}
                                        fullWidth
                                        {...field}
                                    >
                                        {types.map((type: any) => (
                                            <MenuItem key={type.id} value={type.slug}>
                                                {type.title[currentLang]}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        select
                                        label="Category"
                                        disabled={!categories.length}
                                        fullWidth
                                        {...field}
                                    >
                                        {categories.map((category: any) => (
                                            <MenuItem key={category.id} value={category.slug}>
                                                {category.title[currentLang]}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 6, md: 4 }}>
                            <TextField
                                label="Price"
                                type="number"
                                fullWidth
                                required
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
                            <Controller
                                name="calculationScheme.type"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        sx={{ mb: 4 }}
                                        select
                                        label="Calculation Type"
                                        disabled={!categories.length}
                                        fullWidth
                                        {...field}
                                    >
                                        {['sum', 'formula'].map((type: any) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <TextField
                                label="Formula"
                                fullWidth
                                disabled={calcType === 'sum'}
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
                            <Grid container spacing={2} sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                                direction="column">
                                {image && <img src={getImageUrl(image)} width={200} />}

                                <Button onClick={() => handleOpenImagePopup(true)}
                                    variant="outlined">
                                    {(!image || image.length < 5) ? 'Choose image' : 'Replace image'}
                                </Button>

                                <ImageCropModal
                                    open={open}
                                    onClose={() => handleOpenImagePopup(false)}
                                    onSelect={(imgId) => {
                                        setImage(imgId)
                                        setValue('image', imgId) // 👈 ВАЖНО
                                        handleOpenImagePopup(false)
                                    }}
                                />
                            </Grid>
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
                {/* SUBMIT                */}
                {/* ===================== */}

                <Box sx={{ textAlign: 'right' }}>
                    <Button type="submit" variant="contained" size="large" disabled={!isValid || isSubmitting}>
                        {isCreate ? 'Create Test' : 'Save Changes'}
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
