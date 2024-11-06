import { useState } from 'react';

export interface StepperState {
    activeStep: number;
    goNext: () => void;
    goBack: () => void;
}

export const useStepperState = (initialStep: number = 1): StepperState => {
    const [activeStep, setActiveStep] = useState(initialStep);

    const goNext = () => {
        if (activeStep < 2) {
            setActiveStep(prevStep => prevStep + 1);
        }
    }
    const goBack = () => {
        if (activeStep > 1) {
            setActiveStep(prevStep => prevStep - 1);
        }
    }

    return {
        activeStep,
        goNext,
        goBack,
    };
};
