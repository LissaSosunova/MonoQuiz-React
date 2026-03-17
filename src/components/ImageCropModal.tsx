import { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import {
    Dialog,
    Button,
    Slider,
    Grid
} from '@mui/material'
import { type ImageModalProps } from '../shared/interfaces/modal-props'
import { getCroppedImg } from '../shared/helpers/cropped-image'
import type { Area } from 'react-easy-crop'
import { ImagesAPI } from '../api/images.api'

type Image = {
    _id: string
    data: any
}

export const ImageCropModal = ({ open, onClose, onSelect }: ImageModalProps) => {
    const [image, setImage] = useState<string | null>(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
    const [images, setImages] = useState<Image[]>([])

    // загрузка существующих картинок
    useEffect(() => {
        if (!open) return

        const loadImages = async () => {
            try {
                const data = await ImagesAPI.getAll()
                setImages(data)
            } catch (err) {
                console.error('Ошибка при загрузке изображений:', err)
            }
        }

        loadImages()
    }, [open])

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setImage(reader.result)
            }
        }

        reader.readAsDataURL(file)
    }

    const onCropComplete = (_: Area, croppedPixels: Area) => {
        setCroppedAreaPixels(croppedPixels)
    }

    const handleSave = async () => {
        if (!image || !croppedAreaPixels) return

        const base64 = await getCroppedImg(image, croppedAreaPixels)

        try {
            const saved = await ImagesAPI.create({ data: base64 })
            onSelect(saved.data.data)

            onClose()
        } catch (err) {
            console.error('Ошибка при сохранении картинки:', err)
        }
    }


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <div style={{ padding: 20 }}>

                <input type="file" onChange={onFileChange} />

                {image && (
                    <div style={{ position: 'relative', height: 300 }}>
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={460 / 320}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                )}

                <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(_, v) => setZoom(v)}
                />

                <Button onClick={handleSave}>
                    Save
                </Button>

                {/* 📸 Существующие картинки */}
                <Grid container spacing={2} mt={2}>
                    {images.map((img) => (
                        <Grid size={3} key={img._id}>
                            <img
                                src={img.data}
                                width={80}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    onSelect(img.data)
                                    onClose()
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Dialog>
    )
}
