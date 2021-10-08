import styles from './index.module.css'
export default function Preview({
  src,
  onClose,
}: {
  src: string
  onClose: () => void
}) {
  if (!src) {
    return null;
  }

  return (
    <div className={styles.preview} onClick={onClose}>
      <img src={src} alt="预览图片" />
      <p>长按保存图片</p>
    </div>
  )
}
