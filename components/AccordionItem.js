import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionItem({expandStatus, title, secondary, children }) {
  const [expanded, setExpanded] = React.useState(true);

  React.useEffect(() => {
    if (expandStatus !== undefined){
      setExpanded(expandStatus)
    }
  }, [expandStatus])

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Accordion expanded={expanded} onChange={() => handleChange()} style={{ border: 1, borderColor: 'divider', width: '100%', maxWidth: '95%', marginBottom: 8, boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >

          <Typography variant='h3' sx={{ fontSize: 24, fontWeight: 600, flexShrink: 0 }}>
            {title}
          </Typography>
          {secondary}
        </AccordionSummary>
        <AccordionDetails sx={{ paddingleft: 2, paddingRight: 2 }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}