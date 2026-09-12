import React, { useState, useMemo } from 'react';
import { ESTIMATOR_PROJECT_TYPES, ESTIMATOR_FEATURES } from '../data/portfolioData';
import { 
  Calculator,
  CheckCircle2,
  Sparkles,
  Send,
  Check
} from 'lucide-react';

interface EstimatorProps {
  onSendBriefToContact: (briefSummary: {
    projectType: string;
    selectedFeatures: string[];
    priceRange: string;
    timeline: string;
    estimatedHours: number;
  }) => void;
}

export const ProjectEstimator: React.FC<EstimatorProps> = ({
  onSendBriefToContact,
}) => {
  const [selectedProjectTypeId, setselectedProjectTypeId] =
    useState<string>('saas-webapp');

  const [selectedFeatureIds, setselectedFeatureIds] = useState<string[]>([
    'stripe-payments',
    'user-auth',
    'performance-guarantee',
  ]);

  const [urgency, setUrgency] = useState<'standard' | 'fast' | 'rush'>(
    'standard'
  );

  const selectedProjectType = useMemo(() => {
    return (
      ESTIMATOR_PROJECT_TYPES.find(
        (p) => p.id === selectedProjectTypeId
      ) || ESTIMATOR_PROJECT_TYPES[0]
    );
  }, [selectedProjectTypeId]);

  const toggleFeature = (featureId: string) => {
    setselectedFeatureIds((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Calculation Logic
  const calculation = useMemo(() => {
    let basePrice = selectedProjectType.basePrice;
    let baseHours = selectedProjectType.baseHours;

    selectedFeatureIds.forEach((fId) => {
      const feat = ESTIMATOR_FEATURES.find((f) => f.id === fId);

      if (feat) {
        basePrice += feat.price;
        baseHours += feat.hours;
      }
    });

    // Urgency multiplier
    let multiplier = 1.0;
    let timelineText = '3 - 4 Weeks';

    if (urgency === 'fast') {
      multiplier = 1.2;
      timelineText = '2 - 3 Weeks';
    } else if (urgency === 'rush') {
      multiplier = 1.4;
      timelineText = '7 - 12 Days (Priority Sprint)';
    }

    const finalPrice = Math.round(basePrice * multiplier);
    const lowEstimate = Math.round(finalPrice * 0.95);
    const highEstimate = Math.round(finalPrice * 1.15);

    return {
      priceRange: `₹${lowEstimate.toLocaleString(
        'en-IN'
      )} - ₹${highEstimate.toLocaleString(
        'en-IN'
)}`,
      estimatedHours: baseHours,
      timelineText,
      finalPrice,
      lowEstimate,
      highEstimate,
    };
  }, [selectedProjectType, selectedFeatureIds, urgency]);

  const handleSendProposalBrief = () => {
    const selectedFeatureNames = selectedFeatureIds.map(
      (fId) =>
        ESTIMATOR_FEATURES.find((f) => f.id === fId)?.title || fId
    );

    onSendBriefToContact({
      projectType: selectedProjectType.title,
      selectedFeatures: selectedFeatureNames,
      priceRange: calculation.priceRange,
      timeline: calculation.timelineText,
      estimatedHours: calculation.estimatedHours,
    });
  };

  return (
    <section
      id="estimator"
      className="py-16 md:py-24 border-b border-[#DED5CC]/80 bg-[#F8F5F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C97872]/10 text-[#B06A64] border border-[#DED5CC] text-xs font-sans font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>PROJECT ESTIMATE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#3B2F2A] tracking-tight">
            Get a Project Estimate
          </h2>

          <p className="text-[#706B65] text-sm sm:text-base">
            No hidden developer fees or surprises. Select your project
            specifications below for an instant estimated budget range and
            deliverable roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Interactive Selector Options */}
          <div className="lg:col-span-7 space-y-8">

            {/* Step 1: Select Project Core Type */}
            <div className="space-y-4">

              <div className="flex items-center gap-2 font-sans text-xs font-bold text-[#706B65]">
                <span className="w-6 h-6 rounded-full bg-[#C97872] text-white flex items-center justify-center text-xs">
                  1
                </span>

                <span>1. CHOOSE WHAT YOU'RE BUILDING</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_PROJECT_TYPES.map((type) => {
                  const isselected =
                    selectedProjectTypeId === type.id;

                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setselectedProjectTypeId(type.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setselectedProjectTypeId(type.id);
                        }
                      }}
                      aria-pressed={isselected}
                      className={`group w-full text-left p-4 rounded-2xl border cursor-pointer transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30 ${

                        isselected
                          ? 'bg-[#FFFCF8] border-[#C97872] shadow-lg shadow-[#B06A64]/10 -translate-y-1'
                          : 'bg-[#F8F5F0]/80 border-[#DED5CC] hover:border-[#C97872]/50 hover:bg-[#FFFCF8] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1F1D1B]/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">

                        <span className="text-xs font-sans text-[#B06A64] font-bold">
                          Starting at ₹{type.basePrice}
                        </span>

                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isselected
                              ? 'border-[#C97872] bg-[#C97872]'
                              : 'border-[#B9B0A8]'
                          }`}
                        >
                          {isselected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>

                      <h4 className="font-bold text-[#3B2F2A] text-sm">
                        {type.title}
                      </h4>

                      <p className="text-xs text-[#706B65] mt-1 leading-relaxed">
                        {type.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Features & Integrations */}
            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2 font-sans text-xs font-bold text-[#706B65]">
                  <span className="w-6 h-6 rounded-full bg-[#C97872] text-white flex items-center justify-center text-xs">
                    2
                  </span>

                  <span>
                    2. CHOOSE THE FEATURES YOU NEED
                  </span>
                </div>

                <span className="text-xs text-[#706B65] font-sans">
                  {selectedFeatureIds.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {ESTIMATOR_FEATURES.map((feat) => {
                  const isChecked = selectedFeatureIds.includes(
                    feat.id
                  );

                  return (
                    <button
                      type="button"
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      aria-pressed={isChecked}
                      className={`group w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ease-out flex items-start gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30 ${

                        isChecked
                          ? 'bg-[#FFFCF8] border-[#C97872]/80 shadow-md shadow-[#B06A64]/5 -translate-y-0.5'
                          : 'bg-[#F8F5F0]/60 border-[#DED5CC]/80 hover:border-[#C97872]/50'
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 ${
                          isChecked
                            ? 'bg-[#C97872] border-[#C97872] text-white'
                            : 'border-[#B9B0A8]'
                        }`}
                      >
                        {isChecked && (
                          <Check className="w-3 h-3" />
                        )}
                      </div>

                      <div className="space-y-0.5 flex-1">

                        <div className="flex items-center justify-between text-xs gap-2">
                          <span className="font-bold text-[#706B65]">
                            {feat.title}
                          </span>

                          <span className="font-sans text-[#B06A64] font-semibold">
                            +₹{feat.price}
                          </span>
                        </div>

                        <p className="text-[11px] text-[#706B65] leading-tight">
                          {feat.description}
                        </p>

                      </div>
                    </button>
                  );
                })}

              </div>
            </div>

            {/* Step 3: Select Timeline Urgency */}
            <div className="space-y-3">

              <div className="flex items-center gap-2 font-sans text-xs font-bold text-[#706B65]">
                <span className="w-6 h-6 rounded-full bg-[#C97872] text-white flex items-center justify-center text-xs">
                  3
                </span>

                <span>3. CHOOSE YOUR TIMELINE</span>
              </div>

              <div className="grid grid-cols-3 gap-3">

                {/* Standard */}
                <button
                  type="button"
                  onClick={() => setUrgency('standard')}
                  className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                    urgency === 'standard'
                      ? 'bg-[#FFFCF8] border-[#C97872] text-[#B06A64] font-bold'
                      : 'bg-[#F8F5F0] border-[#DED5CC] text-[#706B65] hover:border-[#C97872]/50'
                  }`}
                >
                  <p className="text-xs">Standard Speed</p>

                  <p className="text-[11px] font-sans text-[#706B65] mt-0.5">
                    3 - 4 Weeks
                  </p>
                </button>

                {/* Fast */}
                <button
                  type="button"
                  onClick={() => setUrgency('fast')}
                  className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                    urgency === 'fast'
                      ? 'bg-[#FFFCF8] border-[#C97872] text-[#B06A64] font-bold'
                      : 'bg-[#F8F5F0] border-[#DED5CC] text-[#706B65] hover:border-[#C97872]/50'
                  }`}
                >
                  <p className="text-xs">Fast Track (+20%)</p>

                  <p className="text-[11px] font-sans text-[#706B65] mt-0.5">
                    2 Weeks
                  </p>
                </button>

                {/* Rush */}
                <button
                  type="button"
                  onClick={() => setUrgency('rush')}
                  className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                    urgency === 'rush'
                      ? 'bg-[#FFFCF8] border-[#B06A64] text-[#B06A64] font-bold'
                      : 'bg-[#F8F5F0] border-[#DED5CC] text-[#706B65] hover:border-[#C97872]/50'
                  }`}
                >
                  <p className="text-xs">Priority Rush (+40%)</p>

                  <p className="text-[11px] font-sans text-[#706B65] mt-0.5">
                    7 - 10 Days
                  </p>
                </button>

              </div>
            </div>

          </div>

          {/* Right Column: Live Calculated Summary Card */}
          <div className="lg:col-span-5 sticky top-24">

            <div className="bg-[#FFFCF8] rounded-3xl border border-[#DED5CC] p-6 shadow-xl transition-all duration-500 hover:shadow-2xl shadow-[#1F1D1B]/10 space-y-6">

              <div className="flex items-center justify-between border-b border-[#DED5CC] pb-4 gap-3">

                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#B06A64]" />

                  <h3 className="font-bold text-[#3B2F2A] text-base">
                    Your Project Estimate
                  </h3>
                </div>

                <span className="text-[11px] font-sans text-[#B06A64] bg-[#DED5CC]/70 px-2.5 py-1 rounded border border-[#DED5CC] whitespace-nowrap">
                  Estimate
                </span>

              </div>

              {/* Price Range Display */}
              <div className="bg-[#F8F5F0] p-5 rounded-2xl border border-[#DED5CC]/80 space-y-2">

                <span className="text-xs text-[#706B65] font-sans">
                  ESTIMATED BUDGET
                </span>

                <div className="text-3xl sm:text-4xl font-black font-sans text-[#B06A64] tracking-tight transition-all duration-300">
                  {calculation.priceRange}
                </div>

                <div className="flex items-center justify-between text-xs text-[#706B65] pt-1 border-t border-[#DED5CC]/60">
                  <span>Estimated Work:</span>

                  <strong className="text-[#3B2F2A] font-sans">
                    {calculation.estimatedHours} hrs
                  </strong>
                </div>

                <div className="flex items-center justify-between text-xs text-[#706B65]">
                  <span>Estimated Timeline:</span>

                  <strong className="text-[#B06A64] font-sans">
                    {calculation.timelineText}
                  </strong>
                </div>

              </div>

              {/* selected Items Breakdown */}
              <div className="space-y-3">

                <h4 className="text-xs font-bold text-[#706B65] uppercase tracking-wider font-sans">
                  WHAT'S INCLUDED
                </h4>

                <div className="space-y-2 text-xs">

                  <div className="p-2.5 bg-[#F8F5F0]/60 rounded-xl border border-[#DED5CC] flex items-center justify-between text-[#706B65]">
                    <span className="font-semibold">
                      {selectedProjectType.title}
                    </span>

                    <span className="font-sans text-[#B06A64]">
                      ₹{selectedProjectType.basePrice}
                    </span>
                  </div>

                  {selectedFeatureIds.map((fId) => {
                    const feat = ESTIMATOR_FEATURES.find(
                      (f) => f.id === fId
                    );

                    if (!feat) return null;

                    return (
                      <div
                        key={fId}
                        className="p-2 bg-[#F8F5F0] rounded-lg flex items-center justify-between text-[#706B65]"
                      >
                        <span>+ {feat.title}</span>

                        <span className="font-sans text-[#B06A64]">
                          +₹{feat.price}
                        </span>
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* EVERY PROJECT INCLUDES */}
              <div className="p-3.5 bg-[#F8F5F0]/80 rounded-xl border border-[#DED5CC] space-y-2 text-xs text-[#706B65]">

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B06A64] shrink-0" />

                  <span>
                    Performance-focused, search-friendly build
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B06A64] shrink-0" />

                  <span>
                    30 days of free bug fixes after launch
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B06A64] shrink-0" />

                  <span>
                    Complete source code ownership
                  </span>
                </div>

              </div>

              {/* Send Brief Button */}
              <button
                id="estimator-submit-btn"
                onClick={handleSendProposalBrief}
                className="w-full py-4 rounded-2xl bg-[#C97872] text-white font-semibold text-sm hover:bg-[#B06A64] transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:-translate-y-0.5 hover:shadow-2xl shadow-[#B06A64]/20 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />

                <span>
                  Send These Details & Start a Conversation
                </span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};