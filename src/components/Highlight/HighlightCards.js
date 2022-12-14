import React from 'react';
import { CardContent, Typography, Card, makeStyles } from '@material-ui/core';
import CountUp from 'react-countup';

const useStyles = makeStyles({
  wrapper: (props) => {
    if (props.type === 'confirmed') return { borderLeft: '5px solid red' };
    if (props.type === 'recovered') return { borderLeft: '5px solid #28a745' };
    else return { borderLeft: '5px solid #ccc' };
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

function HighlightCards({ title, count, type }) {
  const styles = useStyles({ type });

  return (
    <Card className={styles.wrapper}>
      <CardContent>
        <Typography component='p' variant='body2' className={styles.title}>
          {title}
        </Typography>
        <Typography component='span' variant='body2' className={styles.count}>
          <CountUp end={count || 0} duration={2} separator=' ' />
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HighlightCards;
