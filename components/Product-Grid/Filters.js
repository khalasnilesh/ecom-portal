import React from 'react';
import { filterData } from '../../utils/data';

// MUI components
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


// Styling the MUI components
const StyledTypography = withStyles({
  root: {
    fontSize: '17px',
    fontWeight: 'bold'
  }
})(Typography)
const ExpansionPanelMain = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
    },
    width: '90%'
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummaryMain = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    boxShadow: 'inset 10px 0 0px -7px #71AF41',
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetailsMain = withStyles((theme) => ({
  root: {
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
  }
}))(MuiExpansionPanelDetails);

const SubExpansionPanel = withStyles({
  root: {
    width: '100%',
  }
})(MuiExpansionPanel)

const SubPanelDetails = withStyles((theme) => ({
  root: {
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'column',
  }
}))(MuiExpansionPanelDetails);

// Custom components for filters
const SingleFilterPanel = (props) => {
  const { name = 'Title', options = [] } = props.filter;
  return (
    <ExpansionPanelMain square expanded TransitionProps={{ unmountOnExit: true }}>
      <ExpansionPanelSummaryMain
        aria-controls={`${name.replace(/ /g, '').toLowerCase()}-content`}
        id={`${name.replace(/ /g, '').toLowerCase()}-header`}>
        <StyledTypography>{name}</StyledTypography>
      </ExpansionPanelSummaryMain>
      <ExpansionPanelDetailsMain>
        {options.length > 0 && 
          options.map((subpanel, index) => {
            return (
              <SubExpansionPanel square key={index}>
                <MuiExpansionPanelSummary
                  expandIcon={subpanel.options !== null ? <ExpandMoreIcon /> : null}
                  aria-controls={`${subpanel.name.replace(/ /g, '').toLowerCase()}-content`}
                  id={`${subpanel.name.replace(/ /g, '').toLowerCase()}-header`}
                >
                  <Typography>{subpanel.name}</Typography>
                </MuiExpansionPanelSummary>
                {subpanel.options !== null ? 
                  <SubPanelDetails>
                  {
                    subpanel.options.map((option, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label={option}
                        />
                      )
                    })
                  }
                  </SubPanelDetails>
                  :
                  null
                }
              </SubExpansionPanel>
            )
          })
        }
      </ExpansionPanelDetailsMain>
    </ExpansionPanelMain>
  )
}



export default function CustomizedExpansionPanels() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {filterData.map((item, index) => {
        return <SingleFilterPanel filter={item} key={index} />
      })}
    </div>
  );
}
