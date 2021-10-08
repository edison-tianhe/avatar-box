import { CSSProperties } from 'react';
import styles from './index.module.css';

export default function Icon({
  style,
  className,
  code
}: {
  style?: CSSProperties,
  className?: string,
  code: string,
}) {
  return (
    <i
      style={style}
      className={`${styles.iconfont}${className ? ` ${className}` : ''}`}
    >
      {code}
    </i>
  )
}
