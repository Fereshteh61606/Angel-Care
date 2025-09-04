import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import { PersonInfo } from '../types';
import { savePersonInfo } from '../utils/storage';
import { useLanguage } from '../contexts/LanguageContext';
import { FormField } from '../components/FormField';

export const AddPersonPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    address: '',
    personalCode: '',
    phoneNumber: '',
    additionalInfo: '',
    diseaseOrProblem: '',
    status: '',
    emergencyNote: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate better unique ID
  const generateUniqueId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  };

  // Generate automatic personal code on component mount
  useEffect(() => {
    const generatePersonalCode = (): string => {
      const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
      const random = Math.random().toString(36).slice(-4).toUpperCase();
      return `PC-${timestamp}-${random}`;
    };

    if (!formData.personalCode) {
      const autoCode = generatePersonalCode();
      setFormData(prev => ({ ...prev, personalCode: autoCode }));
    }
  }, []);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = t.form.required;
    if (!formData.lastName.trim()) newErrors.lastName = t.form.required;
    if (!formData.personalCode.trim()) newErrors.personalCode = t.form.required;
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = t.form.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const newPerson: PersonInfo = {
        id: generateUniqueId(), // Use the better ID generator
        ...formData,
        createdAt: new Date().toISOString(),
      };

      console.log('Saving person with ID:', newPerson.id); // Debug log
      savePersonInfo(newPerson);
      
      // Wait a moment to ensure data is saved
      setTimeout(() => {
        navigate(`/view/${newPerson.id}`);
      }, 100);
    } catch (error) {
      console.error('Error saving person:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-25 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="p-3 bg-white/70 backdrop-blur-sm rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className={`w-5 h-5 text-gray-600 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">{t.addPerson}</h1>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label={t.form.name}
                value={formData.name}
                onChange={(value) => updateField('name', value)}
                required
                error={errors.name}
              />
              
              <FormField
                label={t.form.lastName}
                value={formData.lastName}
                onChange={(value) => updateField('lastName', value)}
                required
                error={errors.lastName}
              />
            </div>

            <FormField
              label={t.form.address}
              value={formData.address}
              onChange={(value) => updateField('address', value)}
              type="textarea"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label={t.form.personalCode}
                value={formData.personalCode}
                onChange={(value) => updateField('personalCode', value)}
                required
                error={errors.personalCode}
                readOnly={true}
              />
              
              <FormField
                label={t.form.phoneNumber}
                value={formData.phoneNumber}
                onChange={(value) => updateField('phoneNumber', value)}
                type="tel"
                required
                error={errors.phoneNumber}
              />
            </div>

            <FormField
              label={t.form.additionalInfo}
              value={formData.additionalInfo}
              onChange={(value) => updateField('additionalInfo', value)}
              type="textarea"
            />

            <FormField
              label={t.form.diseaseOrProblem}
              value={formData.diseaseOrProblem}
              onChange={(value) => updateField('diseaseOrProblem', value)}
              type="textarea"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label={t.form.status}
                value={formData.status}
                onChange={(value) => updateField('status', value)}
              />
              
              <FormField
                label={t.form.emergencyNote}
                value={formData.emergencyNote}
                onChange={(value) => updateField('emergencyNote', value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Saving...' : t.form.save}
              </button>
              
              <Link
                to="/"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-6 py-4 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <X className="w-5 h-5" />
                {t.form.cancel}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};