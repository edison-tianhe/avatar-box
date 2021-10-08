import Card from '@material-ui/core/Card'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Slider from '@material-ui/core/Slider'

import { IInitMaskProps } from '.'

export default function Setting({
  values,
  onChange,
}: {
  values: IInitMaskProps,
  onChange: (values: IInitMaskProps) => void
}) {
  const onSliderChange = ({ target }: Event, value: number | number[]) => {
    onChange({
      ...values,
      // @ts-ignore
      [target.name]: value
    })
  }

  return (
    <Card variant="outlined" style={{ margin: '10px 0', padding: 20 }}>
      <FormControl fullWidth={true}>
        <FormLabel component="legend">渐变角度</FormLabel>
        <Slider
          valueLabelDisplay="auto"
          color="secondary"
          max={360}
          name="deg"
          defaultValue={values.deg}
          onChange={onSliderChange}
        />
        <FormLabel component="legend">开始渐变的位置</FormLabel>
        <Slider
          valueLabelDisplay="auto"
          name="start"
          defaultValue={values.start}
          onChange={onSliderChange}
        />
        <FormLabel component="legend">渐变结束的位置</FormLabel>
        <Slider
          valueLabelDisplay="auto"
          name="end"
          defaultValue={values.end}
          onChange={onSliderChange}
        />
      </FormControl>
    </Card>
  )
}
