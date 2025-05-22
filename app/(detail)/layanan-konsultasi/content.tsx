"use client"
import React, { useEffect, useState } from 'react'
import { User, Mail, Phone, MessageSquare, FileText, Shield, Clock, Headphones, Star, Check, ArrowRight, ChevronDown, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast'; // Pastikan Anda sudah menginstal react-hot-toast
import { saveLayananAduan } from '@/services/layanan'; // Asumsi path dan fungsi ini sudah benar

// Define the type for a single category item
interface KategoriLayananItem {
  id: number;
  namaKategori: string;
}

const ContentLayananPage = ({ kategoriLayanan }: { kategoriLayanan: KategoriLayananItem[] }) => {
  const [loading, setLoading] = useState(false);
  const [dataKategori, setDataKategori] = useState<any[]>([]);
  const [kategoriId, setKategoriId] = useState("");
  const [result, setResult] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showToast, setShowToast] = useState<{ show: boolean, type: 'success' | 'error', message: string }>({
    show: false,
    type: 'success',
    message: ''
  });

  const [formData, setFormData] = useState({
    email: '',
    nik: '',
    nama: '',
    isiAduan: '',
    noTelepon: '',
    kategoriLayananId: '', // Ini akan diisi dari `kategoriId`
    termsOfService: false,
  });

  useEffect(() => {
    let wrapperData: any[] = [];
    setDataKategori([]); // Clear previous data
    if (kategoriLayanan) {
      kategoriLayanan.map((val: any) => {
        wrapperData.push({
          label: val.namaKategori,
          value: val.id.toString()
        })
      })
    }
    setDataKategori(wrapperData);
  }, [kategoriLayanan])

  // Toast component (gunakan react-hot-toast, komponen ini bisa dihapus)
  const Toast = () => {
    // Karena kita sudah menggunakan react-hot-toast, komponen ini tidak lagi diperlukan secara langsung.
    // Toast akan ditampilkan oleh react-hot-toast secara global.
    return null;
  };

  const showToastMessage = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Email validation
    if (!formData.email || !/^\S+@\S+$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }

    // NIK validation
    if (!formData.nik || formData.nik.length !== 16 || !/^\d+$/.test(formData.nik)) {
      newErrors.nik = 'NIK harus 16 digit angka';
    }

    // Nama validation
    if (!formData.nama || formData.nama.length < 3) {
      newErrors.nama = 'Nama harus diisi minimal 3 karakter';
    }

    // Isi Aduan validation
    if (!formData.isiAduan || formData.isiAduan.length < 10) {
      newErrors.isiAduan = 'Isi pengaduan harus diisi minimal 10 karakter';
    }

    // No Telepon validation
    if (!formData.noTelepon || formData.noTelepon.length < 10 || !/^\d+$/.test(formData.noTelepon)) {
      newErrors.noTelepon = 'Nomor telepon tidak valid (minimal 10 digit angka)';
    }

    // Terms of service validation
    if (!formData.termsOfService) {
      newErrors.termsOfService = 'Anda harus menyetujui persyaratan layanan';
    }

    // Kategori validation
    if (!kategoriId) {
      newErrors.kategoriLayananId = 'Pilih kategori layanan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // Khusus untuk checkbox, ambil 'checked'
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah refresh halaman default dari form submission

    // Pastikan kategoriId terbaru masuk ke formData sebelum validasi dan pengiriman
    setFormData(prev => ({ ...prev, kategoriLayananId: kategoriId }));

    if (!validateForm()) {
      showToastMessage('error', 'Harap lengkapi semua kolom yang wajib diisi.');
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await saveLayananAduan({
        nik: formData.nik,
        nama: formData.nama,
        email: formData.email,
        isiAduan: formData.isiAduan,
        noTelepon: formData.noTelepon,
        kategoriLayananId: parseInt(kategoriId), // Pastikan kategoriId sudah dalam bentuk string valid
      });

      if (res.status) {
        showToastMessage('success', "Terima kasih, pengaduan sudah kami terima.");
        setResult(`Berikut merupakan nomor Tiket Anda. Nomor Tiket juga telah kami kirim ke email ${res.data?.email} yang sudah diinputkan. No Tiket: ${res.data?.notiket}`);

        // Reset form setelah berhasil
        setFormData({
          email: '',
          nik: '',
          nama: '',
          isiAduan: '',
          noTelepon: '',
          kategoriLayananId: '',
          termsOfService: false,
        });
        setKategoriId(''); // Reset pilihan kategori
        setErrors({}); // Reset error messages
      } else {
        // Tangani error dari API
        // showToastMessage('error', res.message || "Gagal mengirim pengaduan. Silakan coba lagi.");
        setResult("");
      }
    } catch (error) {
      console.error('Error on form submission:', error);
      setResult("");
      showToastMessage('error', "Terjadi kesalahan jaringan atau server. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const serviceFeatures = [
    { icon: Clock, title: 'Respon Cepat', desc: 'Maksimal 24 jam' },
    { icon: Shield, title: 'Keamanan Data', desc: 'Data terjamin aman' },
    { icon: Headphones, title: 'Support 24/7', desc: 'Bantuan kapan saja' },
    { icon: Star, title: 'Pelayanan Terbaik', desc: 'Rating 4.9/5' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Toast provider dari react-hot-toast perlu ditambahkan di _app.tsx atau layout root */}
      {/* <Toast /> */}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Layanan dan Konsultasi
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Dapatkan layanan terbaik untuk kebutuhan pangan Anda
            </p>
          </div>
        </div>
      </div>

      {/* Service Features */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {serviceFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-br from-green-500 to-lime-500 p-3 rounded-full w-fit mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <div className='flex flex-col gap-2'>
        <div className='p-4 min-h-[400px]'>
          <div className='max-w-4xl mx-auto'>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Formulir Permohonan Layanan</h2>
                <p className="opacity-90">Silakan lengkapi formulir di bawah ini untuk mendapatkan layanan terbaik</p>
              </div>

              {/* Form Body */}
              <div className="p-8">
                {/* Success Message */}
                {result && (
                  <div className='bg-gradient-to-r from-green-50 via-emerald-50 to-lime-50 border border-green-200 p-6 rounded-2xl mb-8'>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500 p-2 rounded-full">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-green-800 mb-2">Pengaduan Berhasil Dikirim!</h3>
                        <p className="text-green-700">{result}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={onSubmit} className='space-y-6'>
                  {/* NIK Field */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-700">NIK <span className="text-red-500">*</span></span>
                    </div>
                    <input
                      type="text"
                      name="nik"
                      value={formData.nik}
                      onChange={handleInputChange}
                      placeholder="Masukkan NIK Anda (16 digit)"
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${
                        errors.nik ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        } focus:ring-2 focus:ring-opacity-20 ${
                        errors.nik ? 'focus:ring-red-500' : 'focus:ring-green-500'
                        }`}
                      maxLength={16} // Tambahkan maxLength
                    />
                    {errors.nik && <p className="text-red-500 text-sm">{errors.nik}</p>}
                  </div>

                  {/* Nama Lengkap Field */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-700">Nama Lengkap <span className="text-red-500">*</span></span>
                    </div>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap Anda"
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${
                        errors.nama ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        } focus:ring-2 focus:ring-opacity-20 ${
                        errors.nama ? 'focus:ring-red-500' : 'focus:ring-green-500'
                        }`}
                    />
                    {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
                  </div>

                  {/* Contact Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-700">No Telp/WhatsApp <span className="text-red-500">*</span></span>
                      </div>
                      <input
                        type="tel"
                        name="noTelepon"
                        value={formData.noTelepon}
                        onChange={handleInputChange}
                        placeholder="08123456789"
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${
                          errors.noTelepon ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                          } focus:ring-2 focus:ring-opacity-20 ${
                          errors.noTelepon ? 'focus:ring-red-500' : 'focus:ring-green-500'
                          }`}
                      />
                      {errors.noTelepon && <p className="text-red-500 text-sm">{errors.noTelepon}</p>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-700">Email <span className="text-red-500">*</span></span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="contoh@email.com"
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                          } focus:ring-2 focus:ring-opacity-20 ${
                          errors.email ? 'focus:ring-red-500' : 'focus:ring-green-500'
                          }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Kategori Layanan */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-700">Pilih Kategori Layanan <span className="text-red-500">*</span></span>
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 text-left flex items-center justify-between ${
                          errors.kategoriLayananId ? 'border-red-500' : 'border-gray-200 hover:border-green-500'
                          }`}
                      >
                        {kategoriId ?
                          dataKategori.find(opt => opt.value === kategoriId)?.label
                          : "Pilih kategori layanan"}
                        <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                      </button>

                      {showDropdown && (
                        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                          {dataKategori.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setKategoriId(option.value);
                                setFormData(prev => ({ ...prev, kategoriLayananId: option.value })); // Pastikan formData diperbarui
                                setShowDropdown(false);
                                if (errors.kategoriLayananId) {
                                  setErrors((prev: any) => ({ ...prev, kategoriLayananId: '' }));
                                }
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.kategoriLayananId && <p className="text-red-500 text-sm">{errors.kategoriLayananId}</p>}
                  </div>

                  {/* Isi Pengaduan */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-700">Isi Pengaduan <span className="text-red-500">*</span></span>
                    </div>
                    <textarea
                      name="isiAduan"
                      value={formData.isiAduan}
                      onChange={handleInputChange}
                      placeholder="Jelaskan detail layanan yang Anda butuhkan atau pengaduan yang ingin disampaikan..."
                      rows={6}
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 resize-none ${
                        errors.isiAduan ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        } focus:ring-2 focus:ring-opacity-20 ${
                        errors.isiAduan ? 'focus:ring-red-500' : 'focus:ring-green-500'
                        }`}
                    />
                    {errors.isiAduan && <p className="text-red-500 text-sm">{errors.isiAduan}</p>}
                  </div>

                  {/* Terms of Service */}
                  <div className="bg-green-50 p-6 rounded-2xl">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="termsOfService"
                        id="termsOfService"
                        checked={formData.termsOfService}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 text-green-600 border-2 border-green-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor="termsOfService" className="text-sm text-gray-700 leading-relaxed">
                        Saya menyatakan bahwa data yang saya kirim benar dan dapat dibuktikan.
                      </label>
                    </div>
                    {errors.termsOfService && <p className="text-red-500 text-sm mt-2">{errors.termsOfService}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6">
                    <button
                      type="submit" // Pastikan type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          Kirim Permohonan
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informasi Penting</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Pastikan data yang diisi sudah benar dan lengkap</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Kami akan menghubungi Anda maksimal 2x24 jam</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Layanan konsultasi gratis untuk masyarakat</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Butuh Bantuan Cepat?</h3>
              <p className="mb-4 opacity-90">
                Hubungi kami langsung melalui Email dinaspangan@bandarlampungkota.go.id untuk konsultasi cepat
              </p>
              <button className="">

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentLayananPage