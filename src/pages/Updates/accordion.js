import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './styles.module.scss';

export default function AccordionComponent({ update }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
      className={styles.accordion}
    >
      <AccordionSummary
        expandIcon={<MdKeyboardArrowDown />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {update.type === 'bug' && <span className={styles.widgetBug}>BUG</span>}
          {update.type === 'new' && <span className={styles.widgetNew}>NOVIDADE</span>}
          {update.type === 'coming' && <span className={styles.widgetComing}>EM BREVE</span>}
          {update.type === 'warning' && <span className={styles.widgetComing}>AVISO</span>}
          <span>{update.title}</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <span className={styles.version}>
            Versão {update.version} - {update.date}
          </span>
          <span>{update.description}</span>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
