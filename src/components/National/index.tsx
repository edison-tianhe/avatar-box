import { ChangeEvent, useRef, useState } from 'react'

import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import domtoimage from '../../lib/dom-to-image';

import Flag from '../../assets/national/national-flag.jpg';
import Icon from '../Icon';
import Preview from '../Preview';
import { getDevicePixelRatio } from '../../utils';
import Setting from './setting';
import styles from './index.module.css';

const Input = styled('input')({
  display: 'none',
});

export interface IInitMaskProps {
  deg: number,
  start: number,
  end: number,
}

const initMask: IInitMaskProps = {
  deg: 110,
  start: 0,
  end: 70,
}

export default function National() {
  const avatarRef = useRef<HTMLDivElement>(null);

  const [avatarImage, setAvatarImage] = useState<string>('');
  const [avatarMask, setAvatarMask] = useState<{ WebkitMask: string, mask: string }>({
    WebkitMask: `linear-gradient(${initMask.deg}deg, red ${initMask.start}%, transparent ${initMask.end}%)`,
    mask: `linear-gradient(${initMask.deg}deg, red ${initMask.start}%, transparent ${initMask.end}%)`,
  });
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const [maskValues, setMaskValues] = useState<IInitMaskProps>(initMask);
  const [downloadSrc, setDownloadSrc] = useState<string>('');

  const onFileChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files?.length) {
      return;
    }
    for (let i = 0, numFiles = files.length; i < numFiles; i++) {
      const file = files[i];
      var reader = new FileReader();
      reader.onload = (e) => {
        if (e?.target?.result) {
          setAvatarImage(e.target.result as string)
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const onDownload = () => {
    if (!avatarRef.current) {
      return;
    }
    domtoimage.toPng(avatarRef.current, { scale: getDevicePixelRatio() })
      .then(function (dataUrl: string) {
        // setDownloadSrc(dataUrl.replace(/=+$/, ''));
        var link = document.createElement('a');
        link.download = '????????????.png';
        link.href = dataUrl;
        link.click();
        link.remove();
      })
      .catch(function (error: any) {
        console.error(error);
      });
  }

  const onSetting = () => {
    setShowSetting(!showSetting)
  }

  const settingChange = (values: IInitMaskProps) => {
    setMaskValues(values);
    setAvatarMask({
      WebkitMask: `linear-gradient(${values.deg}deg, red ${values.start}%, transparent ${values.end}%)`,
      mask: `linear-gradient(${values.deg}deg, red ${values.start}%, transparent ${values.end}%)`,
    })
  }

  const onClosePreview = () => {
    setDownloadSrc('');
  }

  return (
    <div>
      {avatarImage
        ? (
          // ??????????div???????????????margin???????????????:
          // !???????????????domtoimage?????????margin?????????????????????????????????
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.avatar} ref={avatarRef}>
              <img src={avatarImage} alt="??????" />
              <img src={Flag} alt="????????????" style={avatarMask} />
            </div>
          </div>
        )
        : <div>??????????????????????????????????????????</div>
      }
      {showSetting && <Setting values={maskValues} onChange={settingChange} />}
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" type="file" onChange={onFileChange} />
        <Button component="span" size="small">
          ????????????
        </Button>
      </label>
      {' '}
      <Button component="span" size="small" onClick={onDownload} disabled={!avatarImage}>
        ????????????
      </Button>
      {' '}
      {avatarImage && (
        <Button
          component="span"
          size="small"
          color="warning"
          startIcon={<Icon code="&#xeb80;" style={{ fontSize: 14 }} />}
          onClick={onSetting}
        >
          ?????????
        </Button>
      )}
      <Preview src={downloadSrc} onClose={onClosePreview} />
    </div>
  )
}
