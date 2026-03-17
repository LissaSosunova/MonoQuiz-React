export interface ModalProps {
  onClose: () => void
  onSuccess: () => void
}

export interface ImageModalProps {
  open: boolean
  onClose: () => void
  onSelect: (image: any) => void
}
