import { PropsWithChildren, ReactNode } from 'react'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function CustomCardMedia({
  image,
  title = '卡片标题',
  actions = [],
  children
}: PropsWithChildren<{
  image: string,
  title?: string,
  actions?: ReactNode[]
}>) {
  return (
    <Card style={{ margin: 10 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="当前示例"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {children}
      </CardContent>
      {actions.length ? (
        <CardActions>
          {actions}
        </CardActions>
      ) : null}
    </Card>
  )
}
