"use client"
import React, { useEffect, useState } from 'react'
import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, ChevronRight, Clock, Users, Building, MessageCircle, Send, Star, Globe, Calendar } from 'lucide-react';

const ContentKontakPage = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialStats = [
    { icon: Instagram, count: '220', label: 'Followers', color: 'from-green-500 to-green-700' },
    { icon: Facebook, count: '542', label: 'Likes', color: 'from-green-500 to-green-700' },
    { icon: Youtube, count: '41', label: 'Subscribers', color: 'from-green-500 to-green-700' }
  ];

  const quickStats = [
    { icon: Users, count: '10K+', label: 'Masyarakat Terlayani', color: 'bg-gradient-to-br from-green-400 to-green-600' },
    { icon: Building, count: '150+', label: 'Usaha Pangan', color: 'bg-gradient-to-br from-green-400 to-green-600' },
    { icon: Star, count: '4.8', label: 'Rating Pelayanan', color: 'bg-gradient-to-br from-green-400 to-green-600' },
    { icon: Globe, count: '24/7', label: 'Online Service', color: 'bg-gradient-to-br from-green-400 to-green-600' }
  ];

  return (
    <div className='flex flex-col gap-8 p-4 sm:p-6'>
      {/* Hero Section with Animation */}
      <div className='relative overflow-hidden bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-6 sm:p-8 text-white'>
        <div className='absolute inset-0 bg-black opacity-20'></div>
        <div className='absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16 sm:-translate-y-32 sm:translate-x-32'></div>
        <div className='absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12 sm:translate-y-24 sm:-translate-x-24'></div>
        <div className='relative z-10'>
          <h1 className='text-2xl sm:text-4xl font-bold mb-2 sm:mb-4'>Dinas Pangan Kota Bandar Lampung</h1>
          <p className='text-base sm:text-xl opacity-90 mb-4 sm:mb-6'>Siap melayani Anda dengan sepenuh hati untuk kebutuhan pangan yang aman dan berkualitas</p>
          <div className='flex flex-wrap gap-3 sm:gap-4'>
            <div className='bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-1 sm:px-6 sm:py-2 flex items-center gap-2 text-sm sm:text-base'>
              <Clock className='w-4 h-4 sm:w-5 sm:h-5' />
              <span>Buka Sekarang</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-9'>
        {quickStats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-2xl p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg`}>
            <stat.icon className='w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3' />
            <div className='text-xl sm:text-2xl font-bold mb-1'>{stat.count}</div>
            <div className='text-xs sm:text-sm opacity-90'>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className='bg-white rounded-2xl shadow-xl p-2'>
        <div className='flex flex-wrap justify-center gap-2 mb-4 sm:mb-6'>
          {[
            { id: 'contact', label: 'Kontak Info', icon: Phone },
            { id: 'form', label: 'Kirim Pesan', icon: Send },
            { id: 'location', label: 'Lokasi', icon: MapPin },
            { id: 'social', label: 'Media Sosial', icon: Globe }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className='w-4 h-4 sm:w-5 sm:h-5' />
              <span className='hidden sm:block'>{tab.label}</span> {/* Hide label on small screens */}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className='p-4 sm:p-8 lg:p-12'> {/* Adjusted padding for all screens */}
          {activeTab === 'contact' && (
            <div className='space-y-6'>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8 text-center">Informasi Kontak</h2>
              <div className='grid md:grid-cols-3 gap-4 sm:gap-6'>
                <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 sm:p-6 border border-green-200 hover:shadow-lg transition-all duration-300'>
                  <div className="bg-green-500 p-3 sm:p-4 rounded-full w-fit mb-3 sm:mb-4">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Alamat Kantor</h3>
                  <p className='text-gray-700 leading-relaxed text-sm sm:text-base'>
                    Jalan Doktor Susilo Nomor 2 Sumur Batu, Gedung Satu Atap Lt 10, Bandar Lampung, Lampung 35214
                  </p>
                </div>

                <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 sm:p-6 border border-green-200 hover:shadow-lg transition-all duration-300'>
                  <div className="bg-green-500 p-3 sm:p-4 rounded-full w-fit mb-3 sm:mb-4">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Email Resmi</h3>
                  <a href="mailto:dinaspangan@bandarlampungkota.go.id"
                    className='text-green-600 hover:text-green-800 leading-relaxed text-sm sm:text-base'>
                    dinaspangan@bandarlampungkota.go.id
                  </a>
                </div>

                <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 sm:p-6 border border-green-200 hover:shadow-lg transition-all duration-300'>
                  <div className="bg-green-500 p-3 sm:p-4 rounded-full w-fit mb-3 sm:mb-4">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Jam Operasional</h3>
                  <div className='space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base'>
                    <div className="flex justify-between">
                      <span>Senin - Kamis</span>
                      <span className='font-medium'>08:00 - 15.30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jumat</span>
                      <span className='font-medium'>08:00 - 15.00</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Sabtu - Minggu</span>
                      <span className='font-medium'>Tutup</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'form' && (
            <div className='max-w-full md:max-w-2xl mx-auto'>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8 text-center">Kirim Pesan Kepada Kami</h2>
              <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 sm:p-8 shadow-lg border">
                <div className="space-y-4 sm:space-y-6">
                  <div className='grid md:grid-cols-2 gap-4 sm:gap-6'>
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                        <Users className='w-4 h-4' />
                        Nama Lengkap
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white text-sm sm:text-base"
                        placeholder="Masukkan nama lengkap Anda"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                        <Mail className='w-4 h-4' />
                        Email
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white text-sm sm:text-base"
                        placeholder="contoh@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                      <MessageCircle className='w-4 h-4' />
                      Subjek
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white text-sm sm:text-base"
                      placeholder="Masukkan subjek pesan"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                      <Send className='w-4 h-4' />
                      Pesan
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    //   rows={4} {/* Reduced rows for mobile */}
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white text-sm sm:text-base"
                      placeholder="Tulis pesan lengkap Anda di sini..."
                    ></textarea>
                  </div>
                  <a href="mailto:dinaspangan@bandarlampungkota.go.id" className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                Kirim Pesan Sekarang
                </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8 text-center">Lokasi Kantor Kami</h2>
              <div className='bg-white rounded-2xl shadow-xl overflow-hidden border'>
                <div className="relative">
                  <iframe
                    src="http://maps.google.com/maps?q=Dinas%20Pangan%20Kota%20Bandar%20Lampung&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="300" // Adjusted height for mobile
                    style={{border:0}}
                    loading="lazy"
                    className="w-full"
                  />
                  <div className='absolute top-4 left-4 bg-white rounded-xl p-3 sm:p-4 shadow-lg'>
                    <div className='flex items-center gap-2 text-green-600 font-semibold text-sm sm:text-base'>
                      <MapPin className='w-4 h-4 sm:w-5 sm:h-5' />
                      <span>Dinas Pangan Kota Bandar Lampung</span>
                    </div>
                  </div>
                </div>

                <div className='p-4 sm:p-8'>
                  <div className='grid md:grid-cols-3 gap-4 sm:gap-6'>
                    <div className='text-center'>
                      <div className='bg-green-100 p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4'>
                        <MapPin className='w-6 h-6 sm:w-8 sm:h-8 text-green-600' />
                      </div>
                      <h3 className='font-bold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg'>Mudah Dijangkau</h3>
                      <p className='text-gray-600 text-sm'>Lokasi strategis di pusat kota Bandar Lampung</p>
                    </div>
                    <div className='text-center'>
                      <div className='bg-green-100 p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4'>
                        <Calendar className='w-6 h-6 sm:w-8 sm:h-8 text-green-600' />
                      </div>
                      <h3 className='font-bold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg'>Buka Setiap Hari Kerja</h3>
                      <p className='text-gray-600 text-sm'>Senin - Jumat, siap melayani Anda</p>
                    </div>
                    <div className='text-center'>
                      <div className='bg-green-100 p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4'>
                        <Building className='w-6 h-6 sm:w-8 sm:h-8 text-green-600' />
                      </div>
                      <h3 className='font-bold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg'>Gedung Satu Atap</h3>
                      <p className='text-gray-600 text-sm'>Lantai 10, fasilitas lengkap dan modern</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8 text-center">Ikuti Media Sosial Kami</h2>
              <div className='grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8'>
                {socialStats.map((social, index) => (
                  <div key={index} className={`bg-gradient-to-br ${social.color} rounded-2xl p-6 sm:p-8 text-white text-center transform hover:scale-105 transition-all duration-300 shadow-xl`}>
                    <social.icon className='w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4' />
                    <div className='text-2xl sm:text-3xl font-bold mb-1 sm:mb-2'>{social.count}</div>
                    <div className='text-base sm:text-lg opacity-90'>{social.label}</div>
                    <button className='mt-3 sm:mt-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-5 py-1 sm:px-6 sm:py-2 hover:bg-opacity-30 transition-all duration-300 text-sm sm:text-base'>
                      Follow
                    </button>
                  </div>
                ))}
              </div>

              <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-lg border'>
                <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center'>Dapatkan Update Terbaru</h3>
                <div className='max-w-full md:max-w-md mx-auto'>
                  <div className='flex flex-col sm:flex-row gap-2'>
                    <input
                      type="email"
                      className="flex-1 px-3 py-3 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Masukkan email Anda"
                    />
                    <button onClick={() => window.location.href = 'mailto:dinaspangan@bandarlampungkota.go.id'} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105">
                    Subscribe
                    </button>
                  </div>
                  <p className='text-xs sm:text-sm text-gray-500 mt-2 text-center'>
                    Dapatkan informasi terbaru tentang program dan layanan kami
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentKontakPage;