import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, QrCode, Eye, Trash2, Download, Printer, Shield } from 'lucide-react';
import { PersonInfo } from '../types';
import { getPersonsData, deletePersonById } from '../utils/storage';
import { useLanguage } from '../contexts/LanguageContext';
import { generateQRCode } from '../utils/qrcode';
import { useAdmin } from '../contexts/AdminContext';

export const PersonListPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { isAdmin } = useAdmin();
  const [persons, setPersons] = useState<PersonInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // همیشه ثابت اجرا بشه
  useEffect(() => {
    if (!isAdmin) return; // فقط وقتی ادمینه دیتا بیار
    const data = getPersonsData();
    setPersons(
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
    );
    setLoading(false);
  }, [isAdmin]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deletePersonById(id);
      setPersons(prev => prev.filter(person => person.id !== id));
    }
  };

  const handlePrintQR = async (person: PersonInfo) => {
    try {
      const qrData = `${window.location.origin}/view/${person.id}`;
      const qrCodeDataURL = await generateQRCode(qrData);

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>QR Code - ${person.name} ${person.lastName}</title></head>
            <body>
              <h2>${person.name} ${person.lastName}</h2>
              <img src="${qrCodeDataURL}" />
            </body>
          </html>
        `);
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 300);
      }
    } catch (error) {
      console.error('Error generating QR code for printing:', error);
      alert('Error generating QR code for printing');
    }
  };

  const handleDownloadQR = async (person: PersonInfo) => {
    try {
      const qrData = `${window.location.origin}/view/${person.id}`;
      const qrCodeDataURL = await generateQRCode(qrData);

      const link = document.createElement('a');
      link.download = `qr-${person.name}-${person.lastName}-${Date.now()}.png`;
      link.href = qrCodeDataURL;
      link.click();
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Error downloading QR code');
    }
  };

  // خروجی‌ها:
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="mb-6">You need admin privileges to view this page</p>
          <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl">
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">{t.list.title}</h1>

      {persons.length === 0 ? (
        <div className="text-center">
          <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-4">{t.list.noData}</h2>
          <Link
            to="/add"
            className="px-6 py-3 bg-green-500 text-white rounded-xl"
          >
            <Plus className="w-5 h-5 inline" /> {t.addPerson}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {persons.map((person) => (
            <div key={person.id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-xl font-bold">
                {person.name} {person.lastName}
              </h3>
              <p>{t.form.personalCode}: {person.personalCode}</p>
              <p>{t.form.phoneNumber}: {person.phoneNumber}</p>
              <p>{t.list.createdAt}: {new Date(person.createdAt).toLocaleDateString()}</p>
              <div className="flex gap-2 mt-4">
                <Link to={`/view/${person.id}`} className="px-4 py-2 bg-blue-500 text-white rounded">
                  <Eye className="w-4 h-4 inline" /> {t.view.title}
                </Link>
                <button onClick={() => handlePrintQR(person)} className="px-4 py-2 bg-green-500 text-white rounded">
                  <Printer className="w-4 h-4 inline" />
                </button>
                <button onClick={() => handleDownloadQR(person)} className="px-4 py-2 bg-teal-500 text-white rounded">
                  <Download className="w-4 h-4 inline" />
                </button>
                <button onClick={() => handleDelete(person.id, `${person.name} ${person.lastName}`)} className="px-4 py-2 bg-red-500 text-white rounded">
                  <Trash2 className="w-4 h-4 inline" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
