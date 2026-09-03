import React, { useState, useMemo } from 'react';
import { ESTIMATOR_PROJECT_TYPES, ESTIMATOR_FEATURES } from '../data/portfolioData';
import { 
  Calculator, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  DollarSign, 
  FileText, 
  Send, 
  Plus, 
  Check, 
  HelpCircle,
  Cpu,
  ShieldCheck,
  Zap,
  Layout,
  ShoppingBag,
  ArrowRight
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
  const [selectedProjectTypeId, setSelectedProjectTypeId] = useState<string>('saas-webapp');
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([
    'stripe-payments',
    'user-auth',
    'performance-guarantee'
  ]);
  const [urgency, setUrgency] = useState<'standard' | 'fast' | 'rush'>('standard');

  const selectedProjectType = useMemo(() => {
    return ESTIMATOR_PROJECT_TYPES.find(p => p.id === selectedProjectTypeId) || ESTIMATOR_PROJECT_TYPES[0];
  }, [selectedProjectTypeId]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatureIds(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Calculation Logic
  const calculation = useMemo(() => {
    let basePrice = selectedProjectType.basePrice;
    let baseHours = selectedProjectType.baseHours;

    selectedFeatureIds.forEach(fId => {
      const feat = ESTIMATOR_FEATURES.find(f => f.id === fId);
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

    const lowUSD = Math.round(lowEstimate / 83);
    const highUSD = Math.round(highEstimate / 83);

    return {
      priceRange: `₹${lowEstimate.toLocaleString('en-IN')} - ₹${highEstimate.toLocaleString('en-IN')} (~$${lowUSD} - $${highUSD})`,
      estimatedHours: baseHours,
      timelineText,
      finalPrice,
      lowEstimate,
      highEstimate
    };
  }, [selectedProjectType, selectedFeatureIds, urgency]);

  const handleSendProposalBrief = () => {
    const selectedFeatureNames = selectedFeatureIds.map(
      fId => ESTIMATOR_FEATURES.find(f => f.id === fId)?.title || fId
    );

    onSendBriefToContact({
      projectType: selectedProjectType.title,
      selectedFeatures: selectedFeatureNames,
      priceRange: calculation.priceRange,
      timeline: calculation.timelineText,
      estimatedHours: calculation.estimatedHours
    });
  };

  return (
    <section id="estimator" className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE PROJECT ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            Calculate Scope, Price & Timeline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No hidden developer fees or surprises. Select your project specifications below for an instant estimated budget range and deliverable roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Selector Options */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Project Core Type */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-300">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
                <span>SELECT PROJECT TYPE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_PROJECT_TYPES.map((type) => {
                  const isSelected = selectedProjectTypeId === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedProjectTypeId(type.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          Starting at ${type.basePrice}
                        </span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-emerald-400 bg-emerald-400' : 'border-slate-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-slate-950" />}
                        </div>
                      </div>

                      <h4 className="font-bold text-slate-100 text-sm">{type.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{type.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Features & Integrations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
                  <span>SELECT ADD-ON FEATURES & INTEGRATIONS</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedFeatureIds.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_FEATURES.map((feat) => {
                  const isChecked = selectedFeatureIds.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'bg-slate-900 border-indigo-500/80'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-600'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-200">{feat.title}</span>
                          <span className="font-mono text-indigo-400 font-semibold">+${feat.price}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">{feat.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Select Timeline Urgency */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-300">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
                <span>SELECT DELIVERY TIMELINE URGENCY</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setUrgency('standard')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    urgency === 'standard'
                      ? 'bg-slate-900 border-emerald-500 text-emerald-400 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-xs">Standard Speed</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">3 - 4 Weeks</p>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('fast')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    urgency === 'fast'
                      ? 'bg-slate-900 border-emerald-500 text-emerald-400 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-xs">Fast Track (+20%)</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">2 Weeks</p>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('rush')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    urgency === 'rush'
                      ? 'bg-slate-900 border-amber-500 text-amber-400 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-xs">Priority Rush (+40%)</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">7 - 10 Days</p>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Live Calculated Summary Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-base">Estimated Scope Brief</h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
                  Fixed Price Guarantee
                </span>
              </div>

              {/* Price Range Display */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 space-y-2">
                <span className="text-xs text-slate-400 font-mono">ESTIMATED BUDGET RANGE</span>
                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tracking-tight">
                  {calculation.priceRange}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                  <span>Estimated Engineering Hours:</span>
                  <strong className="text-slate-200 font-mono">{calculation.estimatedHours} Hours</strong>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Estimated Delivery Time:</span>
                  <strong className="text-indigo-400 font-mono">{calculation.timelineText}</strong>
                </div>
              </div>

              {/* Selected Items Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Scope Deliverables Included
                </h4>
                
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-slate-200">
                    <span className="font-semibold">{selectedProjectType.title}</span>
                    <span className="font-mono text-emerald-400">${selectedProjectType.basePrice}</span>
                  </div>

                  {selectedFeatureIds.map(fId => {
                    const feat = ESTIMATOR_FEATURES.find(f => f.id === fId);
                    if (!feat) return null;
                    return (
                      <div key={fId} className="p-2 bg-slate-950/40 rounded-lg flex items-center justify-between text-slate-300">
                        <span>+ {feat.title}</span>
                        <span className="font-mono text-indigo-400">+${feat.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Included Standard Guarantees */}
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100/100 PageSpeed Performance & SEO Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30 Days Free Warranty & Bug-Fix Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full Source Code Ownership & Git Repo</span>
                </div>
              </div>

              {/* Send Brief Button */}
              <button
                id="estimator-submit-btn"
                onClick={handleSendProposalBrief}
                className="w-full py-4 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Send Proposal Request with this Brief</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
