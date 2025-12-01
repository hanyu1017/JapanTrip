import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plane, Train, Bus, MapPin, Utensils, Bed,
  ChevronRight, Navigation, Plus, X, Edit,
  Wallet, Users, Calendar, Camera, Coffee, ArrowRight, ArrowDown,
  Clock, Loader, AlertCircle, RefreshCw, Save, Trash2, TrendingUp, TrendingDown,
  Image as ImageIcon, Printer, Home, DollarSign
} from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { RouteVisualization } from './components/RouteVisualization';

// API base URL
const API_URL = import.meta.env.VITE_API_URL || '/api';

// --- Real Image Helper ---
const REAL_IMAGE_MAP = {
  // Day 1: Arrival & Kyoto
  'd1-1': 'https://images.unsplash.com/photo-1569154941913-40a215e2f9cc?auto=format&fit=crop&w=800&q=80',
  'd1-2': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
  'd1-3': 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80',
  'd1-4': 'https://images.unsplash.com/photo-1492571350019-22d39348dde8?auto=format&fit=crop&w=800&q=80',
  'd1-5': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  'd1-6': 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
  'd1-7': 'https://images.unsplash.com/photo-1624546524385-063a89047b3e?auto=format&fit=crop&w=800&q=80',

  // Day 2: Nara
  'd2-1': 'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=80',
  'd2-2': 'https://images.unsplash.com/photo-1559846349-d04e4c27a29e?auto=format&fit=crop&w=800&q=80',
  'd2-3': 'https://images.unsplash.com/photo-1607065606497-6a165304675e?auto=format&fit=crop&w=800&q=80',
  'd2-4': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
  'd2-5': 'https://images.unsplash.com/photo-1531986346158-41f9f952a923?auto=format&fit=crop&w=800&q=80',
  'd2-6': 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=800&q=80',
  'd2-7': 'https://images.unsplash.com/photo-1557039750-624263721343?auto=format&fit=crop&w=800&q=80',

  // Day 3: Kimono & Kiyomizu
  'd3-1': 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?auto=format&fit=crop&w=800&q=80',
  'd3-2': 'https://images.unsplash.com/photo-1528643666205-d6023cb36b76?auto=format&fit=crop&w=800&q=80',
  'd3-3': 'https://images.unsplash.com/photo-1595152285199-52d9a6c6df9b?auto=format&fit=crop&w=800&q=80',
  'd3-4': 'https://images.unsplash.com/photo-1585816928006-253c0709d66c?auto=format&fit=crop&w=800&q=80',
  'd3-5': 'https://images.unsplash.com/photo-1632805498357-12c8b746869a?auto=format&fit=crop&w=800&q=80',
  'd3-6': 'https://images.unsplash.com/photo-1626245902462-8e036e5225c8?auto=format&fit=crop&w=800&q=80',

  // Day 4: Arashiyama
  'd4-1': 'https://images.unsplash.com/photo-1624620780283-7c585c575001?auto=format&fit=crop&w=800&q=80',
  'd4-2': 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=800&q=80',
  'd4-3': 'https://images.unsplash.com/photo-1545227891-b3b0d5c4e36d?auto=format&fit=crop&w=800&q=80',
  'd4-4': 'https://images.unsplash.com/photo-1592750942503-455b5d132042?auto=format&fit=crop&w=800&q=80',
  'd4-5': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80',
  'd4-6': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
  'd4-7': 'https://images.unsplash.com/photo-1575267598858-a53b23617154?auto=format&fit=crop&w=800&q=80',
  'd4-8': 'https://images.unsplash.com/photo-1579762189445-562e873919d8?auto=format&fit=crop&w=800&q=80',

  // Day 5: Move to Osaka
  'd5-1': 'https://images.unsplash.com/photo-1590559899731-a3828395a574?auto=format&fit=crop&w=800&q=80',
  'd5-2': 'https://images.unsplash.com/photo-1559062332-2d1780447385?auto=format&fit=crop&w=800&q=80',
  'd5-3': 'https://images.unsplash.com/photo-1560358482596-f033cb245803?auto=format&fit=crop&w=800&q=80',
  'd5-4': 'https://images.unsplash.com/photo-1572528148842-8c105658516d?auto=format&fit=crop&w=800&q=80',

  // Day 6: Katsuo-ji & Onsen
  'd6-1': 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
  'd6-2': 'https://images.unsplash.com/photo-1598428860882-62953282245c?auto=format&fit=crop&w=800&q=80',
  'd6-3': 'https://images.unsplash.com/photo-1616164283849-0d1279a05cb8?auto=format&fit=crop&w=800&q=80',
  'd6-4': 'https://images.unsplash.com/photo-1568283307-55e2d148782a?auto=format&fit=crop&w=800&q=80',

  // Day 7: Return
  'd7-1': 'https://images.unsplash.com/photo-1455642305367-68834a1da7ab?auto=format&fit=crop&w=800&q=80',
  'd7-2': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
  'd7-3': 'https://images.unsplash.com/photo-1520614088037-c8317e335264?auto=format&fit=crop&w=800&q=80',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80';

const getFixedImage = (id) => REAL_IMAGE_MAP[id] || DEFAULT_IMAGE;

const INITIAL_PEOPLE = ["佑瑋", "小白", "旅伴C", "旅伴D", "旅伴E"];

// --- Loading Spinner Component ---
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen jh-bg-paper">
    <div className="text-center">
      <Loader className="animate-spin text-jh-indigo mx-auto mb-4" size={48} />
      <p className="text-jh-text font-medium">載入中...</p>
    </div>
  </div>
);

// --- Error Display Component ---
const ErrorDisplay = ({ message, onRetry }) => (
  <div className="flex items-center justify-center min-h-screen p-4 jh-bg-paper">
    <div className="bg-jh-card rounded-2xl p-8 max-w-md text-center shadow-lg border-jh-card-border">
      <AlertCircle className="text-jh-rose mx-auto mb-4" size={48} />
      <h3 className="text-lg font-bold text-jh-text mb-2">載入失敗</h3>
      <p className="text-jh-sub mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 mx-auto jh-btn-primary px-6 py-3 rounded-xl text-white shadow"
        >
          <RefreshCw size={16} /> 重試
        </button>
      )}
    </div>
  </div>
);

// --- Detail Modal Component ---
const DetailModal = ({ isOpen, onClose, item, onEdit }) => {
  if (!isOpen || !item) return null;

  const origin = item.prevLocation ? `origin=${encodeURIComponent(item.prevLocation)}&` : '';
  const destination = `destination=${encodeURIComponent(item.location || item.title)}`;
  const mapUrl = `https://www.google.com/maps/dir/?api=1&${origin}${destination}&travelmode=transit`;

  // Use custom image if available, otherwise fallback to fixed images
  const imageUrl = item.imageUrl || getFixedImage(item.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 print:hidden">
      <div className="jh-card rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 relative border-4 border-jh-card-border">
        <div className="relative h-64 overflow-hidden group">
          <div className="absolute inset-0 jh-image-overlay" />
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 jh-btn-primary text-white rounded-full z-10 shadow-lg"
          >
            <X size={20} />
          </button>

          {/* Colorful gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-purple-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-transparent to-blue-500/30"></div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-1">
               <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full shadow-md font-bold tracking-wide">
                 {item.time}
               </span>
               {item.type === 'meal' && <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow-md font-bold">美食</span>}
            </div>
            <h3 className="text-2xl font-black text-white tracking-wide shadow-lg font-serif leading-tight">{item.title}</h3>
            {item.location && (
              <span className="text-pink-200 text-sm flex items-center gap-1.5 mt-2 font-medium">
                <MapPin size={14} className="text-yellow-300" /> {item.location}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-purple-900 leading-relaxed text-[15px] font-medium font-sans border-l-4 border-pink-500 pl-4 bg-white/70 py-2 rounded-r-xl shadow-sm">
            {item.desc || "暫無詳細介紹。"}
          </p>

          {item.type === 'transport' && item.detail && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl border-2 border-blue-300 shadow-lg relative overflow-hidden">
               <div className="flex items-center gap-2 text-blue-700 font-bold mb-3 pb-2 border-b-2 border-blue-200">
                  <Train size={18} /> 交通詳情
               </div>
               <div className="text-sm text-blue-900 whitespace-pre-line leading-relaxed font-mono">
                 {item.detail}
               </div>
               {item.duration && (
                 <div className="mt-3 flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100 px-3 py-2 rounded-full w-fit border-2 border-blue-300 shadow-sm">
                    <Clock size={12} /> {item.duration}
                 </div>
               )}
            </div>
          )}

          {item.type !== 'transport' && item.detail && (
             <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl border-2 border-purple-300 text-sm text-purple-900 flex items-start gap-3 shadow-md">
                <div className="mt-0.5"><Users size={16} className="text-purple-600" /></div>
                <span className="leading-relaxed">{item.detail}</span>
             </div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t-2 border-purple-200">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-600 transition-all active:scale-95 font-serif tracking-wide"
            >
              <Navigation size={18} />
              導航
            </a>
            <button
              onClick={() => { onClose(); onEdit(item); }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3.5 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all active:scale-95 shadow-lg"
            >
              <Edit size={18} />
              編輯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Edit Modal Component ---
const EditModal = ({ isOpen, onClose, item, onSave, onDelete, saving }) => {
  const [formData, setFormData] = useState({ ...item });

  useEffect(() => {
    setFormData({ ...item });
  }, [item]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-md bg-black/60 print:hidden">
      <div className="jh-card w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 border-t-4 border-jh-accent max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2 font-serif border-b-2 border-purple-300 pb-3">
          {item.id ? <Edit size={24} className="text-purple-600" /> : <Plus size={24} className="text-purple-600" />}
          {item.id ? '編輯行程' : '新增行程'}
        </h3>

        <div className="space-y-5">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-bold text-purple-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <ImageIcon size={16} /> 圖片
            </label>
            <ImageUpload
              currentImage={formData.imageUrl}
              onImageChange={(imageData) => setFormData({...formData, imageUrl: imageData})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">標題</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 bg-white border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none font-serif shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">時間</label>
              <input
                type="time"
                value={formData.time || '12:00'}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full p-3 bg-white border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">類型</label>
              <select
                value={formData.type || 'spot'}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full p-3 bg-white border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none shadow-sm"
              >
                <option value="spot">📸 景點</option>
                <option value="transport">🚅 交通</option>
                <option value="meal">🍱 餐飲</option>
                <option value="hotel">🏨 住宿</option>
                <option value="flight">✈️ 航班</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">地點</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full p-3 bg-white border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none shadow-sm"
              placeholder="地點名稱"
            />
          </div>

          <div>
             <label className="block text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">詳細說明</label>
             <textarea
                value={formData.detail || ''}
                onChange={e => setFormData({...formData, detail: e.target.value})}
                className="w-full p-3 bg-white border-2 border-purple-300 rounded-xl h-24 text-sm focus:ring-2 focus:ring-pink-500 outline-none font-mono leading-relaxed shadow-sm"
                placeholder="輸入詳細交通方式、轉乘點或備註..."
              />
          </div>

          <div>
             <label className="block text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">簡述</label>
             <textarea
                value={formData.desc || ''}
                onChange={e => setFormData({...formData, desc: e.target.value})}
                className="w-full p-3 bg-white border-2 border-purple-300 rounded-xl h-16 text-sm focus:ring-2 focus:ring-pink-500 outline-none shadow-sm"
                placeholder="簡單描述..."
              />
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t-2 border-purple-200">
            {item.id && (
              <button
                onClick={() => onDelete(item.id)}
                disabled={saving}
                className="px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg"
              >
                <Trash2 size={16} /> 刪除
              </button>
            )}
            <button
              onClick={() => onSave(formData)}
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
              {saving ? '儲存中...' : '儲存'}
            </button>
            <button
              onClick={onClose}
              disabled={saving}
              className="px-6 py-3 bg-white text-purple-700 border-2 border-purple-300 rounded-xl font-bold hover:bg-purple-50 transition-colors disabled:opacity-50 shadow-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [currentDay, setCurrentDay] = useState(1);
  const [days, setDays] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [publicFundTotal, setPublicFundTotal] = useState(150000);

  // New: Flight and Accommodation costs
  const [flightCost, setFlightCost] = useState(0);
  const [accommodationCostPerNight, setAccommodationCostPerNight] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState(6);

  const [expenseForm, setExpenseForm] = useState({
    payer: '公積金',
    amount: '',
    desc: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [detailModalItem, setDetailModalItem] = useState(null);
  const [editModalItem, setEditModalItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load itinerary from API
  const loadItinerary = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/itinerary`);
      setDays(response.data);
    } catch (err) {
      console.error('Error loading itinerary:', err);
      setError(err.response?.data?.error || '無法載入行程資料');
    } finally {
      setLoading(false);
    }
  };

  // Load expenses from API
  const loadExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/expenses`);
      setExpenses(response.data);
    } catch (err) {
      console.error('Error loading expenses:', err);
    }
  };

  // Load settings
  const loadSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/settings/publicFundTotal`);
      setPublicFundTotal(parseInt(response.data.value));
    } catch (err) {
      console.log('Using default public fund total');
    }
  };

  useEffect(() => {
    loadItinerary();
    loadExpenses();
    loadSettings();
  }, []);

  // Handle edit save
  const handleEditSave = async (updatedItem) => {
    try {
      setSaving(true);
      const itemData = {
        id: updatedItem.id,
        day: currentDay,
        time: updatedItem.time,
        type: updatedItem.type,
        title: updatedItem.title,
        location: updatedItem.location,
        desc: updatedItem.desc,
        detail: updatedItem.detail,
        from: updatedItem.from,
        to: updatedItem.to,
        method: updatedItem.method,
        duration: updatedItem.duration,
        imageUrl: updatedItem.imageUrl
      };

      await axios.post(`${API_URL}/itinerary/item`, itemData);
      await loadItinerary();
      setIsEditModalOpen(false);
      setDetailModalItem(null);
    } catch (err) {
      console.error('Error saving item:', err);
      alert('儲存失敗：' + (err.response?.data?.error || '未知錯誤'));
    } finally {
      setSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async (itemId) => {
    if (!window.confirm("確定要刪除此行程嗎？")) return;

    try {
      setSaving(true);
      await axios.delete(`${API_URL}/itinerary/item/${itemId}`);
      await loadItinerary();
      setIsEditModalOpen(false);
      setDetailModalItem(null);
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('刪除失敗：' + (err.response?.data?.error || '未知錯誤'));
    } finally {
      setSaving(false);
    }
  };

  // Handle add expense
  const addExpense = async () => {
    if (!expenseForm.amount || !expenseForm.desc) {
      alert('請填寫金額和項目');
      return;
    }

    try {
      await axios.post(`${API_URL}/expenses`, {
        payer: expenseForm.payer,
        amount: parseInt(expenseForm.amount),
        desc: expenseForm.desc,
        date: expenseForm.date
      });
      await loadExpenses();
      setExpenseForm({
        payer: '公積金',
        amount: '',
        desc: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      console.error('Error adding expense:', err);
      alert('記帳失敗：' + (err.response?.data?.error || '未知錯誤'));
    }
  };

  // Handle remove expense
  const removeExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/expenses/${id}`);
      await loadExpenses();
    } catch (err) {
      console.error('Error removing expense:', err);
      alert('刪除失敗：' + (err.response?.data?.error || '未知錯誤'));
    }
  };

  // Open add modal
  const openAddModal = () => {
    setEditModalItem({
      day: currentDay,
      time: "12:00",
      type: "spot",
      title: "",
      location: "",
      desc: "",
      detail: "",
      imageUrl: ""
    });
    setIsEditModalOpen(true);
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Calculate expenses - NEW ENHANCED VERSION
  const totalSpent = expenses.reduce((sum, e) => e.payer === '公積金' ? sum + e.amount : sum, 0);
  const remainingFund = publicFundTotal - totalSpent;
  const spentPercentage = Math.min((totalSpent / publicFundTotal) * 100, 100);

  // NEW: Calculate total costs including flights and accommodation
  const totalFlightCost = flightCost * INITIAL_PEOPLE.length;
  const totalAccommodationCost = accommodationCostPerNight * numberOfNights;
  const grandTotal = totalSpent + totalFlightCost + totalAccommodationCost;
  const perPersonCost = grandTotal / INITIAL_PEOPLE.length;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} onRetry={loadItinerary} />;

  // ==================== ITINERARY VIEW ====================
  const ItineraryView = () => {
    if (days.length === 0) {
      return (
        <div className="p-8 text-center">
          <Camera className="mx-auto text-purple-300 mb-4" size={64} />
          <p className="text-purple-600 text-lg font-bold">尚無行程資料</p>
          <p className="text-purple-400 text-sm mt-2">請聯絡管理員初始化資料庫</p>
        </div>
      );
    }

    const currentDayData = days.find(d => d.day === currentDay);
    if (!currentDayData) return <div>找不到該天行程</div>;

    return (
      <div className="pb-28">
        {/* Print Button */}
        <div className="print:hidden sticky top-16 z-30 flex justify-end p-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg active:scale-95"
          >
            <Printer size={18} />
            列印行程
          </button>
        </div>

        {/* Day Selector */}
        <div className="sticky top-0 z-40 jh-day-selector backdrop-blur-md border-b shadow-xl overflow-x-auto no-scrollbar print:relative">
          <div className="flex p-3 gap-2 min-w-max">
            {days.map(d => (
              <button
                key={d.day}
                onClick={() => setCurrentDay(d.day)}
                className={`flex flex-col items-center px-5 py-3 rounded-2xl transition-all duration-300 border-3 shadow-md ${
                  currentDay === d.day
                  ? 'jh-active scale-110'
                  : 'bg-white text-jh-accent hover:bg-jh-soft border-jh-muted'
                }`}
              >
                <span className={`text-xs uppercase tracking-wider font-bold mb-0.5 ${currentDay === d.day ? 'text-jh-gold' : 'text-jh-muted'}`}>
                  Day {d.day}
                </span>
                <span className="text-sm font-bold whitespace-nowrap font-serif">{d.date.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 max-w-2xl mx-auto">
          <div className="flex justify-between items-end mb-6 mt-2">
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2 font-serif">
                Day {currentDay}
              </h2>
               <span className="text-base font-bold text-purple-600 block mt-1 tracking-wide">
                {currentDayData.title}
              </span>
            </div>
            <button
              onClick={openAddModal}
              className="print:hidden flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-3 rounded-full text-sm font-bold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg active:scale-95"
            >
              <Plus size={18} /> 新增
            </button>
          </div>

          {/* Route Visualization Component */}
          <RouteVisualization items={currentDayData.items} />

          {/* Timeline */}
          <div className="relative space-y-6 mt-8">
            {/* Vertical Rainbow Gradient Line */}
            <div className="absolute left-[28px] top-4 bottom-4 w-1.5 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-full shadow-lg -z-10"></div>

            {currentDayData.items.map((item, idx) => {
              const prevItem = idx > 0 ? currentDayData.items[idx-1] : null;
              const prevLocation = prevItem ? (prevItem.location || prevItem.title) : "";
              const itemWithPrev = { ...item, prevLocation };

              const isTransport = item.type === 'transport';
              const imageUrl = item.imageUrl || getFixedImage(item.id);

              // Colorful gradient based on type
              const typeGradients = {
                transport: 'jh-grad-transport',
                meal: 'jh-grad-meal',
                hotel: 'jh-grad-hotel',
                flight: 'jh-grad-flight',
                spot: 'jh-grad-spot'
              };

              return (
                <div key={item.id} className="relative pl-20 group">
                  {/* Enhanced Timeline Dot & Time */}
                  <div className="absolute left-0 top-0 flex flex-col items-center z-10">
                     <div className={`relative w-14 h-14 rounded-full border-4 border-white shadow-2xl flex items-center justify-center font-bold ${typeGradients[item.type] || typeGradients.spot} text-white`}>
                       <div className="text-center">
                         <div className="text-sm leading-none font-black">{item.time.split(':')[0]}</div>
                         <div className="text-[10px] leading-none mt-0.5 opacity-90">:{item.time.split(':')[1]}</div>
                       </div>
                       {/* Pulse animation */}
                       <div className={`absolute inset-0 rounded-full ${typeGradients[item.type] || typeGradients.spot} animate-ping opacity-20`}></div>
                     </div>
                  </div>

                  {/* Card */}
                  {isTransport ? (
                    <div
                      onClick={() => setDetailModalItem(itemWithPrev)}
                      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border-3 border-blue-300 shadow-lg hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
                    >
                       <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2 font-bold text-blue-800">
                            <Train size={18} className="text-blue-600" />
                            <span className="text-lg">{item.title}</span>
                          </div>
                          {item.duration && (
                            <div className="text-xs font-bold bg-blue-200 text-blue-800 px-3 py-1 rounded-full border-2 border-blue-400 shadow-sm">
                               {item.duration}
                            </div>
                          )}
                       </div>
                       {item.detail && (
                         <div className="text-sm bg-white p-3 rounded-xl border-2 border-blue-200 font-mono text-blue-900 whitespace-pre-line leading-relaxed shadow-sm">
                            {item.detail.length > 100 ? item.detail.substring(0, 100) + '...' : item.detail}
                         </div>
                       )}
                    </div>
                  ) : (
                    <div
                       onClick={() => setDetailModalItem(itemWithPrev)}
                       className="relative h-56 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group-hover:-translate-y-2 duration-300 border-4 border-white"
                    >
                       <img
                         src={imageUrl}
                         alt={item.title}
                         className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         loading="lazy"
                       />

                       {/* Colorful gradient overlays */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-purple-900/30 to-transparent"></div>
                       <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-transparent to-blue-500/30"></div>
                       <div className="absolute inset-0 bg-gradient-to-tl from-yellow-500/20 via-transparent to-purple-500/20"></div>

                       <div className="absolute inset-0 p-6 flex flex-col justify-end">
                          <div className="flex justify-between items-end">
                             <div>
                                {item.type === 'meal' && (
                                   <span className="inline-block px-3 py-1 mb-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-lg">美食饗宴</span>
                                )}
                                <h3 className="text-2xl font-black text-white font-serif leading-tight shadow-2xl mb-1">
                                   {item.title}
                                </h3>
                                {item.location && (
                                  <div className="flex items-center gap-1.5 text-sm text-yellow-300 font-bold">
                                     <MapPin size={14} /> {item.location}
                                  </div>
                                )}
                             </div>
                             <ChevronRight className="text-white/90 group-hover:translate-x-2 transition-transform" size={28} />
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center print:hidden">
               <button
                 onClick={openAddModal}
                 className="px-8 py-4 border-3 border-dashed border-purple-400 rounded-full text-purple-600 hover:border-pink-500 hover:text-pink-600 hover:bg-pink-50 transition-all font-bold text-base flex items-center justify-center gap-2 mx-auto shadow-md hover:shadow-xl"
               >
                  <Plus size={20} /> 新增行程
               </button>
          </div>
        </div>
      </div>
    );

    // ==================== EXPENSE VIEW ====================
    const ExpenseView = () => (
      <div className="p-5 max-w-3xl mx-auto pb-28">
        {/* Print Button */}
        <div className="print:hidden flex justify-end mb-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg active:scale-95"
          >
            <Printer size={18} />
            列印費用明細
          </button>
        </div>

        <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2 font-serif">
          <Wallet className="text-green-600" size={28} /> 旅費帳本
        </h2>

        {/* Flight Cost Input */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 border-3 border-blue-300 shadow-lg print:hidden">
          <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2 text-lg">
            <Plane size={20} /> 機票費用
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-blue-700 mb-2">每人機票價格 (TWD)</label>
              <input
                type="number"
                value={flightCost}
                onChange={(e) => setFlightCost(parseInt(e.target.value) || 0)}
                className="w-full p-3 bg-white border-2 border-blue-300 rounded-xl text-lg font-mono outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="15000"
              />
            </div>
            <div className="flex items-end">
              <div className="bg-blue-100 p-4 rounded-xl border-2 border-blue-300 w-full shadow-sm">
                <div className="text-xs text-blue-600 font-bold mb-1">總機票費用</div>
                <div className="text-2xl font-black text-blue-800 font-mono">¥{totalFlightCost.toLocaleString()}</div>
                <div className="text-xs text-blue-600 mt-1">{INITIAL_PEOPLE.length} 人 × ¥{flightCost.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Cost Input */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border-3 border-purple-300 shadow-lg print:hidden">
          <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2 text-lg">
            <Home size={20} /> 住宿費用
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-purple-700 mb-2">每晚價格 (TWD)</label>
              <input
                type="number"
                value={accommodationCostPerNight}
                onChange={(e) => setAccommodationCostPerNight(parseInt(e.target.value) || 0)}
                className="w-full p-3 bg-white border-2 border-purple-300 rounded-xl text-lg font-mono outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                placeholder="3000"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-purple-700 mb-2">住宿天數</label>
              <input
                type="number"
                value={numberOfNights}
                onChange={(e) => setNumberOfNights(parseInt(e.target.value) || 0)}
                className="w-full p-3 bg-white border-2 border-purple-300 rounded-xl text-lg font-mono outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                placeholder="6"
              />
            </div>
            <div className="flex items-end">
              <div className="bg-purple-100 p-4 rounded-xl border-2 border-purple-300 w-full shadow-sm">
                <div className="text-xs text-purple-600 font-bold mb-1">總住宿費用</div>
                <div className="text-2xl font-black text-purple-800 font-mono">¥{totalAccommodationCost.toLocaleString()}</div>
                <div className="text-xs text-purple-600 mt-1">{numberOfNights} 晚 × ¥{accommodationCostPerNight.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Grand Total Summary */}
        <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-8 text-white shadow-2xl mb-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-20"><DollarSign size={150} /></div>
          <div className="absolute -left-10 -bottom-10 opacity-10"><Wallet size={200} /></div>
          <div className="relative z-10">
            <p className="text-yellow-100 text-sm font-bold tracking-wider mb-2">旅行總花費</p>
            <div className="text-5xl font-black font-mono mb-4">¥{grandTotal.toLocaleString()}</div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                <div className="text-yellow-100 text-xs font-bold mb-1">人均費用</div>
                <div className="text-3xl font-black">¥{Math.round(perPersonCost).toLocaleString()}</div>
                <div className="text-yellow-100 text-xs mt-1">每人平均</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                <div className="text-yellow-100 text-xs font-bold mb-1">旅行人數</div>
                <div className="text-3xl font-black">{INITIAL_PEOPLE.length} 人</div>
                <div className="text-yellow-100 text-xs mt-1">{INITIAL_PEOPLE.join(', ')}</div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="mt-6 space-y-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/20">
              <div className="text-yellow-100 text-sm font-bold mb-3 border-b border-white/30 pb-2">費用明細</div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-100">機票費用</span>
                <span className="font-mono font-bold">¥{totalFlightCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-100">住宿費用</span>
                <span className="font-mono font-bold">¥{totalAccommodationCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-100">其他支出</span>
                <span className="font-mono font-bold">¥{totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t-2 border-white/30 pt-2 mt-2">
                <span>總計</span>
                <span className="font-mono">¥{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Public Fund Overview Card */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl mb-6 relative overflow-hidden border-4 border-green-300">
          <div className="absolute right-0 top-0 opacity-10"><Wallet size={120} /></div>
          <div className="absolute -right-8 -bottom-8 opacity-5"><Camera size={180} /></div>
          <div className="relative z-10">
           <p className="text-green-100 text-sm font-bold tracking-wider mb-1">公積金餘額</p>
           <div className="text-4xl font-bold font-mono mb-1">¥{remainingFund.toLocaleString()}</div>
           <div className="flex items-center gap-2 text-green-100 text-sm mb-4">
             {remainingFund >= publicFundTotal * 0.5 ? (
               <><TrendingUp size={14} /> 充足</>
             ) : remainingFund >= publicFundTotal * 0.2 ? (
               <><TrendingDown size={14} /> 注意</>
             ) : (
               <><AlertCircle size={14} /> 不足</>
             )}
           </div>
           <div className="flex gap-1 h-3 bg-green-900/30 rounded-full overflow-hidden border-2 border-green-300/50">
              <div
                style={{ width: `${100 - spentPercentage}%` }}
                className={`transition-all duration-500 ${
                  spentPercentage < 50 ? 'bg-green-200' :
                  spentPercentage < 80 ? 'bg-yellow-300' :
                  'bg-red-400'
                }`}
              />
           </div>
           <div className="flex justify-between text-xs mt-2 text-green-100 font-mono">
              <span>已用: ¥{totalSpent.toLocaleString()} ({spentPercentage.toFixed(1)}%)</span>
              <span>總額: ¥{publicFundTotal.toLocaleString()}</span>
           </div>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="print:hidden bg-gradient-to-br from-white to-purple-50 p-6 rounded-2xl border-3 border-purple-300 shadow-lg mb-6">
        <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2 text-lg">
          <Plus size={20} /> 新增支出
        </h3>
        <div className="grid grid-cols-5 gap-3 mb-3">
           <div className="col-span-2">
             <select
               value={expenseForm.payer}
               onChange={(e) => setExpenseForm({...expenseForm, payer: e.target.value})}
               className="w-full p-3 bg-white border-2 border-purple-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
             >
               <option value="公積金">公積金</option>
               {INITIAL_PEOPLE.map(p => <option key={p} value={p}>{p}</option>)}
             </select>
           </div>
           <div className="col-span-3">
              <input
                type="number"
                placeholder="金額"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                className="w-full p-3 bg-white border-2 border-purple-300 rounded-xl text-sm outline-none font-mono focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
           </div>
        </div>
        <div className="flex gap-2">
           <input
             type="text"
             placeholder="項目 (例: 章魚燒)"
             value={expenseForm.desc}
             onChange={(e) => setExpenseForm({...expenseForm, desc: e.target.value})}
             className="flex-1 p-3 bg-white border-2 border-purple-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
           />
           <button
             onClick={addExpense}
             className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 rounded-xl font-bold text-sm hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg flex items-center gap-2"
           >
             <Plus size={16} /> 記帳
           </button>
        </div>
      </div>

      {/* Expenses List */}
      <div className="space-y-3">
         <h3 className="font-bold text-purple-800 flex items-center justify-between text-lg">
           <span>支出記錄</span>
           <span className="text-sm text-purple-600 font-mono bg-purple-100 px-3 py-1 rounded-full">{expenses.length} 筆</span>
         </h3>
         {expenses.length === 0 ? (
           <div className="text-center py-12 text-purple-400 bg-purple-50 rounded-2xl border-2 border-purple-200">
             <Coffee size={56} className="mx-auto mb-3 opacity-50" />
             <p className="font-bold">尚無支出記錄</p>
           </div>
         ) : (
           expenses.map((e) => (
              <div key={e.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-purple-50 rounded-2xl border-2 border-purple-200 shadow-md hover:shadow-lg transition-all">
                 <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
                      e.payer === '公積金'
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                        : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
                    }`}>
                       {e.payer[0]}
                    </div>
                    <div>
                       <div className="font-bold text-purple-900 text-base">{e.desc}</div>
                       <div className="text-xs text-purple-600">{e.date} • {e.payer}</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-purple-900 text-lg">¥{e.amount.toLocaleString()}</span>
                    <button
                      onClick={() => removeExpense(e.id)}
                      className="print:hidden text-purple-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                    >
                      <X size={18} />
                    </button>
                 </div>
              </div>
           ))
         )}
      </div>
    </div>
  );

  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 font-['Noto_Sans_TC'] text-stone-900">

        {/* Header */}
        <header className="jh-header text-white shadow-2xl sticky top-0 z-50 border-b-4 border-jh-gold print:relative">
          <div className="max-w-3xl mx-auto px-6 py-6 flex justify-between items-center relative overflow-hidden">
             <div className="absolute right-0 top-0 opacity-10">
               <Camera size={150} />
             </div>
             <div className="absolute left-0 bottom-0 opacity-10">
               <MapPin size={120} />
             </div>
             <div className="relative z-10">
               <h1 className="text-4xl font-black tracking-tight flex items-center gap-3 font-serif">
                 ⛩️ 京阪奈 <span className="text-yellow-300 font-light">冬之旅</span>
               </h1>
               <div className="text-xs text-yellow-200 font-mono mt-2 tracking-[0.3em] uppercase font-bold">Kyoto Osaka Nara Trip 2025</div>
             </div>
             <div className="text-right text-sm text-white bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl border-2 border-white/30 shadow-xl">
               <div className="font-mono font-bold text-yellow-300 text-lg">{days.length} Days</div>
               <div className="text-xs mt-1">Jan 6-12</div>
             </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="animate-in fade-in duration-500">
          {activeTab === 'itinerary' ? <ItineraryView /> : <ExpenseView />}
        </main>

        {/* Bottom Navigation */}
        <nav className="print:hidden fixed bottom-0 w-full jh-day-selector px-6 py-4 pb-safe z-50 shadow-2xl">
          <div className="max-w-md mx-auto flex justify-around items-center">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`flex flex-col items-center gap-2 p-3 w-28 transition-all rounded-2xl ${activeTab === 'itinerary' ? 'text-jh-accent -translate-y-2 bg-white shadow-lg' : 'text-jh-muted'}`}
            >
              <div className={`${activeTab === 'itinerary' ? 'jh-active p-3 rounded-2xl shadow-xl' : ''}`}>
                <MapPin size={26} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} className={activeTab === 'itinerary' ? 'text-white' : ''} />
              </div>
              <span className="text-xs font-bold">行程</span>
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`flex flex-col items-center gap-2 p-3 w-28 transition-all rounded-2xl ${activeTab === 'expenses' ? 'text-jh-accent -translate-y-2 bg-white shadow-lg' : 'text-jh-muted'}`}
            >
              <div className={`${activeTab === 'expenses' ? 'jh-active p-3 rounded-2xl shadow-xl' : ''}`}>
                <Wallet size={26} strokeWidth={activeTab === 'expenses' ? 2.5 : 2} className={activeTab === 'expenses' ? 'text-white' : ''} />
              </div>
              <span className="text-xs font-bold">費用</span>
            </button>
          </div>
        </nav>

        {/* Modals */}
        <DetailModal
          isOpen={!!detailModalItem}
          item={detailModalItem}
          onClose={() => setDetailModalItem(null)}
          onEdit={(item) => { setDetailModalItem(null); setEditModalItem(item); setIsEditModalOpen(true); }}
        />
        <EditModal
          isOpen={isEditModalOpen}
          item={editModalItem}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditSave}
          onDelete={handleDelete}
          saving={saving}
        />
      </div>
    </>
  );
}
