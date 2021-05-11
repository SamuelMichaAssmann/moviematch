import React from 'react';
import "./Tutorial.css"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import { Button } from '../../assets/Button/Button';
import Button2 from '@material-ui/core/Button';

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient(120deg, rgba(233, 62, 58, 1) 0%, rgba(235, 78, 59, 1) 30%, rgba(240, 125, 62, 1) 60%, rgba(246, 160, 48, 1) 90%, rgba(251, 186, 24, 1) 100%);',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient(120deg, rgba(233, 62, 58, 1) 0%, rgba(235, 78, 59, 1) 30%, rgba(240, 125, 62, 1) 60%, rgba(246, 160, 48, 1) 90%, rgba(251, 186, 24, 1) 100%);',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient(120deg, rgba(233, 62, 58, 1) 0%, rgba(235, 78, 59, 1) 30%, rgba(240, 125, 62, 1) 60%, rgba(246, 160, 48, 1) 90%, rgba(251, 186, 24, 1) 100%);',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
});

function ColorlibStepIcon(props) {
    const Stepper = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
    };

    return (
        <div
            className={clsx(Stepper.root, {
                [Stepper.active]: active,
                [Stepper.active]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Select some genre', 'Select some movies', 'Verify your email'];
}

// Content
function getStepContent(step) {
    switch (step) {
        case 0:
            return 'page 1';
        case 1:
            return 'page 2';
        case 2:
            return 'page 3';
        default:
            return 'Unknown step';
    }
}

export default function CustomizedSteppers() {
    const stepper = useStyles();
    const [activeStep, setActiveStep] = React.useState(1);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className="stepper">
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div className="center">
                        <Button2 onClick={handleReset} className={stepper.button}>
                            Reset
                        </Button2>
                    </div>
                ) : (
                    <div className="center">
                        <Typography className={stepper.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button2
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={stepper.button}>
                                Back
                            </Button2>
                            <Button
                                buttonSize='btn--wide'
                                buttonColor='blue'
                                onClick={handleNext}
                                className={stepper.button}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}