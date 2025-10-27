import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import Button from '../components/ui/Button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import Step1BasicInfo from '../components/wizard/Step1BasicInfo';
import Step2Protocol from '../components/wizard/Step2Protocol';
import Step3Connection from '../components/wizard/Step3Connection';
import Step4DataPoints from '../components/wizard/Step4DataPoints';
import Step5Review from '../components/wizard/Step5Review';

const steps = [
  { id: 1, name: 'Basic Info', component: Step1BasicInfo },
  { id: 2, name: 'Protocol', component: Step2Protocol },
  { id: 3, name: 'Connection', component: Step3Connection },
  { id: 4, name: 'Data Points', component: Step4DataPoints },
  { id: 5, name: 'Review', component: Step5Review },
];

const AddMachineWizard = () => {
  const navigate = useNavigate();
  const { wizardData, setWizardStep, resetWizard } = useAppStore();
  const currentStep = wizardData.step;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setWizardStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setWizardStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    resetWizard();
    navigate('/');
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component || Step1BasicInfo;

  const canGoNext = () => {
    if (currentStep === 1) {
      const hasName = wizardData.basicInfo.name && wizardData.basicInfo.name.trim().length > 0;
      const hasType = Boolean(wizardData.basicInfo.type);
      console.log('Step 1 validation:', { hasName, hasType, name: wizardData.basicInfo.name, type: wizardData.basicInfo.type });
      return hasName && hasType;
    }
    if (currentStep === 2) {
      return wizardData.protocol.type !== '';
    }
    if (currentStep === 3) {
      const config = wizardData.protocol.config;
      if (wizardData.protocol.type === 'opcua') {
        return config.endpoint;
      }
      if (wizardData.protocol.type === 's7') {
        return config.ip;
      }
      if (wizardData.protocol.type === 'modbus') {
        return config.ip;
      }
      if (wizardData.protocol.type === 'mqtt') {
        return config.broker;
      }
      return true;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Machine</h1>
          <p className="text-gray-600 mt-2">Configure and connect a new industrial machine</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all',
                      currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : currentStep === step.id
                        ? 'bg-primary text-white ring-4 ring-blue-100'
                        : 'bg-gray-200 text-gray-500'
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-sm mt-2 font-medium',
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-1 mx-4 rounded transition-all',
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <CurrentStepComponent onNext={handleNext} />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-2">
          {currentStep === 1 && !canGoNext() && (
            <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
              Please fill in Machine Name and Type to continue
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrev}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
              )}
              {currentStep < 5 && (
                <Button onClick={handleNext} disabled={!canGoNext()}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMachineWizard;
