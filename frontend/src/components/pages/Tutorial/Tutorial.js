import React, { useEffect } from 'react';
import './Tutorial.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import Section from '../../assets/Section/Section';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { Button } from '../../assets/Button/Button';
import Button2 from '@material-ui/core/Button';
import Matching from '../../assets/Matching/Matching';
import { matchingObj, home } from './Data';
import Userdata, { error, userError, userName, userAge } from '../../assets/Userdata/Userdata';
import APIHandler from '../../manage/api/APIHandler';

// Handles the line between the circles at the top of the tutorial page.
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

// Handles the icons for the circles at the top of the tutorial page.
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

// The ColorlibStepIcon component handles the complete bar at the top of the tutorial.
// This bar represents the three phases of the tutorial (user data, matching, email verification).
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

/**
 * Retrieve a list of string representations of the three phases (steps) of the tutorial.
 * @returns The list of strings.
 */
function getSteps() {
    return ['Userdata', 'Select some movies', 'Verify your email'];
}

// The CustomizedSteppers component handles the content of the current tutorial phase (step).
// It also handles switching between these phases.
export default function CustomizedSteppers() {
    const stepper = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [emailError, setEmailError] = React.useState('');
    const [emailSuccessMessage, setEmailSuccessMessage] = React.useState('');
    const [emailVerified, setEmailVerified] = React.useState(false);
    const steps = getSteps();

    /**
     * When the tutorial is first loaded, start checking if the user's email has been verified.
     */
    useEffect(() => {
        checkEmailVerified();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Handle switching to the next tutorial phase.
     * Under certain circumstances this is not allowed.
     */
    const handleNext = () => {
        if (activeStep === 0) {
            // Don't proceed if the user hasn't filled in everything correctly.
            if (error || userError) {
                return;
            }

            changeUsernameAndAge();
        } else if (activeStep === 2) {
            // Don't proceed if the user isn't verified yet.
            if (!emailVerified) {
                setEmailError('Please verify your email before proceeding');
                return;
            }

            window.location.href = '/home';
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    /**
     * Handle switching to the previous tutorial phase.
     * This is always allowed.
     */
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    /**
     * Handle resetting the tutorial (i.e. going back to the first tutorial phase).
     */
    const handleReset = () => {
        setActiveStep(0);
    };

    /**
     * Check if a user's email has been verified and update the state if so.
     */
    async function checkEmailVerified() {
        const response = await APIHandler.postRequest('http://127.0.0.1:5000/api/isUserVerified', {
            refresh_token: localStorage.getItem('refreshToken')
        }, true);

        if (response.status < 200 || response.status >= 300) {
            setTimeout(checkEmailVerified, 2000);
            return;
        }

        setEmailVerified(true);
    }

    /**
     * Retrieve the HTML content for a given tutorial phase.
     * @param {int} step The tutorial phase (0, 1 or 2).
     * @returns The HTML content.
     */
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Userdata />;
            case 1:
                return <Matching {...matchingObj} />;
            case 2:
                return (
                    <>
                        <Section
                            {...home}
                            onClick={resendVerificationEmail}
                        />

                        {
                            (emailSuccessMessage !== '')
                                ? <p className='settingsSuccess'>{emailSuccessMessage}</p>
                                : null
                        }

                        {
                            (emailError !== '')
                                ? <p className='settingsError'>{emailError}</p>
                                : null
                        }
                    </>
                );
            default:
                return 'Error';
        }
    }

    /**
     * Attempt to change the username and age of the user.
     */
    function changeUsernameAndAge() {
        APIHandler.postRequest('http://127.0.0.1:5000/api/changeUsername', {
            user_id: localStorage.getItem('uid'),
            username: userName
        });

        APIHandler.postRequest('http://127.0.0.1:5000/api/changeAge', {
            user_id: localStorage.getItem('uid'),
            age: userAge
        });
    }

    /**
     * Attempt to send the user a new verification email.
     */
    async function resendVerificationEmail() {
        setEmailError('');
        setEmailSuccessMessage('');
        
        const response = await APIHandler.resendVerificationEmail();
    
        if ('message' in response) {
            setEmailError(response.message);
        } else {
            setEmailError('');
            setEmailSuccessMessage('A verification email has been sent to you!');
        }
    }

    return (
        <div className="stepper">
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {getStepContent(activeStep)}

            {activeStep === steps.length ? (
                <div className="center">
                    <Button2 onClick={handleReset} className={stepper.button}>
                        Reset
                    </Button2>
                </div>
            ) : (
                <div className="center">
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
    );
}