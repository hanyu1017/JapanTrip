import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plane, Train, Bus, MapPin, Utensils, Bed,
  ChevronRight, Navigation, Plus, X, Edit,
  Wallet, Users, Calendar, Camera, Coffee, ArrowRight, ArrowDown,
  Clock, Loader, AlertCircle, RefreshCw, Save, Trash2, TrendingUp, TrendingDown,
  Image as ImageIcon
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
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <Loader className="animate-spin text-[#8b6f47] mx-auto mb-4" size={48} />
      <p className="text-stone-600 font-medium">載入中...</p>
    </div>
  </div>
);

// --- Error Display Component ---
const ErrorDisplay = ({ message, onRetry }) => (
  <div className="flex items-center justify-center min-h-screen p-4">
    <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md text-center">
      <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
      <h3 className="text-lg font-bold text-red-900 mb-2">載入失敗</h3>
      <p className="text-red-700 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 mx-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
      <div className="bg-gradient-to-b from-[#faf8f3] to-[#f5f1e8] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 relative border-2 border-[#c9a884]">
        <div className="relative h-64 overflow-hidden group">
          <div className="absolute inset-0 bg-stone-200 animate-pulse" />
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors backdrop-blur-sm z-10"
          >
            <X size={20} />
          </button>

          {/* Japanese-style gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#c44569]/20 via-transparent to-[#8b6f47]/20"></div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-1">
               <span className="bg-gradient-to-r from-[#8b6f47] to-[#6d5436] text-white text-[10px] px-2 py-0.5 rounded shadow-sm font-serif tracking-wider">
                 {item.time}
               </span>
               {item.type === 'meal' && <span className="bg-gradient-to-r from-[#f6b93b] to-[#f39c12] text-white text-[10px] px-2 py-0.5 rounded shadow-sm font-bold">美食</span>}
            </div>
            <h3 className="text-2xl font-black text-white tracking-wide shadow-sm font-serif leading-tight">{item.title}</h3>
            {item.location && (
              <span className="text-stone-200 text-sm flex items-center gap-1.5 mt-2 font-medium">
                <MapPin size={14} className="text-[#f6b93b]" /> {item.location}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-[#5d4037] leading-relaxed text-[15px] font-medium font-sans border-l-4 border-[#c44569] pl-4 bg-white/50 py-2 rounded-r-lg">
            {item.desc || "暫無詳細介紹。"}
          </p>

          {item.type === 'transport' && item.detail && (
            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border-2 border-[#c9a884] shadow-lg relative overflow-hidden">
               <div className="flex items-center gap-2 text-[#8b6f47] font-bold mb-3 pb-2 border-b-2 border-[#c9a884]">
                  <Train size={18} /> 交通詳情
               </div>
               <div className="text-sm text-[#5d4037] whitespace-pre-line leading-relaxed font-mono">
                 {item.detail}
               </div>
               {item.duration && (
                 <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[#8b6f47] bg-[#f5f1e8] px-3 py-1.5 rounded-full w-fit border border-[#c9a884]">
                    <Clock size={12} /> {item.duration}
                 </div>
               )}
            </div>
          )}

          {item.type !== 'transport' && item.detail && (
             <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border-2 border-[#c9a884] text-sm text-[#5d4037] flex items-start gap-3 shadow-md">
                <div className="mt-0.5"><Users size={16} className="text-[#8b6f47]" /></div>
                <span className="leading-relaxed">{item.detail}</span>
             </div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t-2 border-[#c9a884]/30">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#8b6f47] to-[#6d5436] text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] font-serif tracking-wide"
            >
              <Navigation size={18} />
              導航
            </a>
            <button
              onClick={() => { onClose(); onEdit(item); }}
              className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm text-[#8b6f47] border-2 border-[#c9a884] py-3.5 rounded-xl font-bold hover:bg-[#f5f1e8] transition-all active:scale-[0.98] shadow-md"
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-md bg-black/60">
      <div className="bg-gradient-to-b from-[#faf8f3] to-[#f5f1e8] w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 border-t-4 border-[#c44569] max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-black mb-6 text-[#5d4037] flex items-center gap-2 font-serif border-b-2 border-[#c9a884] pb-3">
          {item.id ? <Edit size={24} /> : <Plus size={24} />}
          {item.id ? '行程を編集' : '行程を追加'}
        </h3>

        <div className="space-y-5">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-bold text-[#8b6f47] uppercase tracking-wider mb-2 flex items-center gap-2">
              <ImageIcon size={16} /> 画像
            </label>
            <ImageUpload
              currentImage={formData.imageUrl}
              onImageChange={(imageData) => setFormData({...formData, imageUrl: imageData})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#8b6f47] uppercase tracking-wider mb-2">標題</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 bg-white/90 backdrop-blur-sm border-2 border-[#c9a884] rounded-xl focus:ring-2 focus:ring-[#c44569] outline-none font-serif shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#8b6f47] uppercase tracking-wider mb-2">時間</label>
              <input
                type="time"
                value={formData.time || '12:00'}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full p-3 bg-white/90 backdrop-blur-sm border-2 border-[#c9a884] rounded-xl focus:ring-2 focus:ring-[#c44569] outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#8b6f47] uppercase tracking-wider mb-2">類型</label>
              <select
                value={formData.type || 'spot'}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full p-3 bg-white/90 backdrop-blur-sm border-2 border-[#c9a884] rounded-xl focus:ring-2 focus:ring-[#c44569] outline-none shadow-sm"
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
            <label className="block text-sm font-bold text-[#8b6f47] uppercase tracking-wider mb-2">地點</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full p-3 bg-white/90 backdrop-blur-sm border-2 border-[#c9a884] rounded-xl focus:ring-2 focus:ring-[#c44569] outline-none shadow-sm"
              placeholder="地點名稱"
            />
          </div>

          <div>
             <label className="block text-sm font-bold text-[#8b6f47] uppercase tracking-wider mb-2">詳細說明</label>
             <textarea
                value={formData.detail || ''}
                onChange={e => setFormData({...formData, detail: e.target.value})}
                className="w-full p-3 bg-white/90 backdrop-blur-sm border-2 border-[#c9a884] rounded-xl h-24 text-sm focus:ring-2 focus:ring-[#c44569] outline-none font-mono leading-relaxed shadow-sm"
                placeholder="輸入詳細交通方式、轉乘點或備註..."
              />
          </div>

          <div>
             <label className="block text-sm font-bold text-[#8b6f47] uppercase tracking-wider mb-2">簡述</label>
             <textarea
                value={formData.desc || ''}
                onChange={e => setFormData({...formData, desc: e.target.value})}
                className="w-full p-3 bg-white/90 backdrop-blur-sm border-2 border-[#c9a884] rounded-xl h-16 text-sm focus:ring-2 focus:ring-[#c44569] outline-none shadow-sm"
                placeholder="簡單描述..."
              />
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t-2 border-[#c9a884]/30">
            {item.id && (
              <button
                onClick={() => onDelete(item.id)}
                disabled={saving}
                className="px-4 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-2 border-2 border-red-200 shadow-sm"
              >
                <Trash2 size={16} /> 刪除
              </button>
            )}
            <button
              onClick={() => onSave(formData)}
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-[#8b6f47] to-[#6d5436] text-white py-3 rounded-xl font-bold hover:shadow-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
              {saving ? '儲存中...' : '儲存'}
            </button>
            <button
              onClick={onClose}
              disabled={saving}
              className="px-6 py-3 bg-white/90 backdrop-blur-sm text-[#8b6f47] border-2 border-[#c9a884] rounded-xl font-bold hover:bg-[#f5f1e8] transition-colors disabled:opacity-50 shadow-sm"
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
      // If setting doesn't exist, use default
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
        imageUrl: updatedItem.imageUrl  // Include image URL
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

  // Calculate expenses
  const totalSpent = expenses.reduce((sum, e) => e.payer === '公積金' ? sum + e.amount : sum, 0);
  const remainingFund = publicFundTotal - totalSpent;
  const spentPercentage = Math.min((totalSpent / publicFundTotal) * 100, 100);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} onRetry={loadItinerary} />;

  // ==================== ITINERARY VIEW ====================
  const ItineraryView = () => {
    if (days.length === 0) {
      return (
        <div className="p-8 text-center">
          <Camera className="mx-auto text-stone-300 mb-4" size={64} />
          <p className="text-stone-500 text-lg">尚無行程資料</p>
          <p className="text-stone-400 text-sm mt-2">請聯絡管理員初始化資料庫</p>
        </div>
      );
    }

    const currentDayData = days.find(d => d.day === currentDay);
    if (!currentDayData) return <div>找不到該天行程</div>;

    return (
      <div className="pb-28">
        {/* Day Selector */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-[#faf8f3] to-[#f5f1e8] backdrop-blur-md border-b-2 border-[#c9a884] shadow-lg overflow-x-auto no-scrollbar">
          <div className="flex p-3 gap-2 min-w-max">
            {days.map(d => (
              <button
                key={d.day}
                onClick={() => setCurrentDay(d.day)}
                className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 border-2 ${
                  currentDay === d.day
                  ? 'bg-gradient-to-br from-[#8b6f47] to-[#6d5436] text-white shadow-lg border-transparent scale-105'
                  : 'bg-white/90 backdrop-blur-sm text-stone-500 hover:bg-white border-[#c9a884]'
                }`}
              >
                <span className={`text-[10px] uppercase tracking-wider font-bold mb-0.5 ${currentDay === d.day ? 'text-[#f6b93b]' : 'text-stone-400'}`}>
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
              <h2 className="text-3xl font-black text-[#5d4037] flex items-center gap-2 font-serif">
                Day {currentDay}
              </h2>
               <span className="text-sm font-medium text-[#8b6f47] block mt-1 tracking-wide">
                {currentDayData.title}
              </span>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#c44569] to-[#a83551] text-white px-4 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all shadow-md active:scale-95"
            >
              <Plus size={16} /> 新增
            </button>
          </div>

          {/* Route Visualization Component */}
          <RouteVisualization items={currentDayData.items} />

          {/* Timeline */}
          <div className="relative space-y-6 mt-8">
            {/* Vertical Gradient Line */}
            <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-gradient-to-b from-[#c44569] via-[#c9a884] to-[#8b6f47] rounded-full shadow-md -z-10"></div>

            {currentDayData.items.map((item, idx) => {
              const prevItem = idx > 0 ? currentDayData.items[idx-1] : null;
              const prevLocation = prevItem ? (prevItem.location || prevItem.title) : "";
              const itemWithPrev = { ...item, prevLocation };

              const isTransport = item.type === 'transport';

              // Use custom image if available, otherwise fallback to fixed images
              const imageUrl = item.imageUrl || getFixedImage(item.id);

              return (
                <div key={item.id} className="relative pl-16 group">
                  {/* Enhanced Timeline Dot & Time */}
                  <div className="absolute left-0 top-0 flex flex-col items-center z-10">
                     <div className={`relative w-12 h-12 rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold
                        ${isTransport ? 'bg-gradient-to-br from-[#6d5436] to-[#8b6f47]' :
                          item.type === 'meal' ? 'bg-gradient-to-br from-[#f6b93b] to-[#f39c12]' :
                          'bg-gradient-to-br from-[#c44569] to-[#a83551]'} text-white shadow-lg
                     `}>
                       <div className="text-center">
                         <div className="text-xs leading-none font-black">{item.time.split(':')[0]}</div>
                         <div className="text-[8px] leading-none mt-0.5 opacity-80">:{item.time.split(':')[1]}</div>
                       </div>
                     </div>
                  </div>

                  {/* Card */}
                  {isTransport ? (
                    <div
                      onClick={() => setDetailModalItem(itemWithPrev)}
                      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-[#c9a884] shadow-md hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
                    >
                       <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2 font-bold text-[#5d4037]">
                            <Train size={16} className="text-[#8b6f47]" />
                            <span>{item.title}</span>
                          </div>
                          {item.duration && (
                            <div className="text-xs font-bold bg-[#f5f1e8] text-[#8b6f47] px-2 py-0.5 rounded-full border border-[#c9a884]">
                               {item.duration}
                            </div>
                          )}
                       </div>
                       {item.detail && (
                         <div className="text-sm bg-[#faf8f3] p-3 rounded-lg border border-[#c9a884] font-mono text-[#5d4037] whitespace-pre-line leading-relaxed">
                            {item.detail.length > 100 ? item.detail.substring(0, 100) + '...' : item.detail}
                         </div>
                       )}
                    </div>
                  ) : (
                    <div
                       onClick={() => setDetailModalItem(itemWithPrev)}
                       className="relative h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group-hover:-translate-y-1 duration-300 border-4 border-white"
                    >
                       <img
                         src={imageUrl}
                         alt={item.title}
                         className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         loading="lazy"
                       />

                       {/* Japanese-style gradient overlays */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                       <div className="absolute inset-0 bg-gradient-to-br from-[#c44569]/20 via-transparent to-[#8b6f47]/20"></div>

                       <div className="absolute inset-0 p-5 flex flex-col justify-end">
                          <div className="flex justify-between items-end">
                             <div>
                                {item.type === 'meal' && (
                                   <span className="inline-block px-2 py-0.5 mb-1 bg-gradient-to-r from-[#f6b93b] to-[#f39c12] text-white text-[10px] font-bold rounded backdrop-blur-sm shadow-md">美味しい</span>
                                )}
                                <h3 className="text-xl font-black text-white font-serif leading-tight shadow-lg mb-1">
                                   {item.title}
                                </h3>
                                {item.location && (
                                  <div className="flex items-center gap-1 text-xs text-[#f6b93b] font-bold">
                                     <MapPin size={12} /> {item.location}
                                  </div>
                                )}
                             </div>
                             <ChevronRight className="text-white/80 group-hover:translate-x-1 transition-transform" size={24} />
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
               <button
                 onClick={openAddModal}
                 className="px-6 py-3 border-2 border-dashed border-[#c9a884] rounded-full text-[#8b6f47] hover:border-[#c44569] hover:text-[#c44569] hover:bg-[#faf8f3] transition-all font-bold text-sm flex items-center justify-center gap-2 mx-auto shadow-sm hover:shadow-md"
               >
                  <Plus size={16} /> 新增行程
               </button>
          </div>
        </div>
      </div>
    );
  };

  // ==================== EXPENSE VIEW ====================
  const ExpenseView = () => (
    <div className="p-5 max-w-2xl mx-auto pb-28">
      <h2 className="text-2xl font-black mb-6 text-[#5d4037] flex items-center gap-2 font-serif">
        <Wallet className="text-[#558b2f]" size={24} /> 旅費帳本
      </h2>

      {/* Fund Overview Card */}
      <div className="bg-gradient-to-br from-[#558b2f] to-[#33691e] rounded-2xl p-6 text-white shadow-xl mb-6 relative overflow-hidden border-2 border-white">
        <div className="absolute right-0 top-0 opacity-10"><Wallet size={120} /></div>
        <div className="absolute -right-8 -bottom-8 opacity-5"><Camera size={180} /></div>
        <div className="relative z-10">
           <p className="text-[#dcedc8] text-xs font-bold tracking-wider mb-1">公積金餘額</p>
           <div className="text-4xl font-bold font-mono mb-1">¥{remainingFund.toLocaleString()}</div>
           <div className="flex items-center gap-2 text-[#dcedc8] text-sm mb-4">
             {remainingFund >= publicFundTotal * 0.5 ? (
               <><TrendingUp size={14} /> 充足</>
             ) : remainingFund >= publicFundTotal * 0.2 ? (
               <><TrendingDown size={14} /> 注意</>
             ) : (
               <><AlertCircle size={14} /> 不足</>
             )}
           </div>
           <div className="flex gap-1 h-2 bg-[#33691e]/30 rounded-full overflow-hidden">
              <div
                style={{ width: `${100 - spentPercentage}%` }}
                className={`transition-all duration-500 ${
                  spentPercentage < 50 ? 'bg-[#dcedc8]' :
                  spentPercentage < 80 ? 'bg-yellow-300' :
                  'bg-red-400'
                }`}
              />
           </div>
           <div className="flex justify-between text-[10px] mt-2 text-[#dcedc8]/80 font-mono">
              <span>已用: ¥{totalSpent.toLocaleString()} ({spentPercentage.toFixed(1)}%)</span>
              <span>總額: ¥{publicFundTotal.toLocaleString()}</span>
           </div>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border-2 border-[#c9a884] shadow-md mb-6">
        <h3 className="font-bold text-[#5d4037] mb-3 flex items-center gap-2">
          <Plus size={16} /> 新增支出
        </h3>
        <div className="grid grid-cols-5 gap-3 mb-3">
           <div className="col-span-2">
             <select
               value={expenseForm.payer}
               onChange={(e) => setExpenseForm({...expenseForm, payer: e.target.value})}
               className="w-full p-2.5 bg-[#faf8f3] border-2 border-[#c9a884] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#8b6f47]"
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
                className="w-full p-2.5 bg-[#faf8f3] border-2 border-[#c9a884] rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-[#8b6f47]"
              />
           </div>
        </div>
        <div className="flex gap-2">
           <input
             type="text"
             placeholder="項目 (例: 章魚燒)"
             value={expenseForm.desc}
             onChange={(e) => setExpenseForm({...expenseForm, desc: e.target.value})}
             className="flex-1 p-2.5 bg-[#faf8f3] border-2 border-[#c9a884] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#8b6f47]"
           />
           <button
             onClick={addExpense}
             className="bg-gradient-to-r from-[#558b2f] to-[#33691e] text-white px-5 rounded-lg font-bold text-sm hover:shadow-lg transition-all shadow-md flex items-center gap-2"
           >
             <Plus size={16} /> 記帳
           </button>
        </div>
      </div>

      {/* Expenses List */}
      <div className="space-y-3">
         <h3 className="font-bold text-[#5d4037] flex items-center justify-between">
           <span>支出記錄</span>
           <span className="text-sm text-[#8b6f47] font-mono">{expenses.length} 筆</span>
         </h3>
         {expenses.length === 0 ? (
           <div className="text-center py-8 text-stone-400">
             <Coffee size={48} className="mx-auto mb-2 opacity-50" />
             <p>尚無支出記錄</p>
           </div>
         ) : (
           expenses.map((e) => (
              <div key={e.id} className="flex justify-between items-center p-3 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-[#c9a884] shadow-sm hover:shadow-md transition-all">
                 <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${e.payer === '公積金' ? 'bg-gradient-to-br from-[#dcedc8] to-[#aed581] text-[#33691e]' : 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800'}`}>
                       {e.payer[0]}
                    </div>
                    <div>
                       <div className="font-bold text-[#5d4037] text-sm">{e.desc}</div>
                       <div className="text-[10px] text-[#8b6f47]">{e.date} • {e.payer}</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-[#5d4037]">¥{e.amount.toLocaleString()}</span>
                    <button
                      onClick={() => removeExpense(e.id)}
                      className="text-stone-300 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                 </div>
              </div>
           ))
         )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] to-[#e8dfd6] font-['Noto_Sans_TC'] text-stone-900">

      {/* Header */}
      <header className="bg-gradient-to-r from-[#8b6f47] via-[#6d5436] to-[#8b6f47] text-white shadow-xl sticky top-0 z-50 border-b-4 border-[#c44569]">
        <div className="max-w-2xl mx-auto px-6 py-5 flex justify-between items-center relative overflow-hidden">
           <div className="absolute right-0 top-0 opacity-10">
             <Camera size={140} />
           </div>
           <div className="absolute left-0 bottom-0 opacity-5">
             <MapPin size={100} />
           </div>
           <div className="relative z-10">
             <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 font-serif">
               ⛩️ 京阪奈 <span className="text-[#f6b93b] font-light">冬之旅</span>
             </h1>
             <div className="text-[10px] text-[#f6b93b]/80 font-mono mt-1.5 tracking-[0.25em] uppercase">Kyoto Osaka Nara Trip 2025</div>
           </div>
           <div className="text-right text-xs text-white/90 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/20">
             <div className="font-mono font-bold text-[#f6b93b]">{days.length} Days</div>
             <div className="text-[10px]">Jan 6-12</div>
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-in fade-in duration-500">
        {activeTab === 'itinerary' ? <ItineraryView /> : <ExpenseView />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-gradient-to-r from-[#faf8f3] to-[#f5f1e8] backdrop-blur-md border-t-2 border-[#c9a884] px-6 py-3 pb-safe z-50 shadow-xl">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center gap-1.5 p-2 w-24 transition-all ${activeTab === 'itinerary' ? 'text-[#8b6f47] -translate-y-1' : 'text-stone-400'}`}
          >
            <div className={`${activeTab === 'itinerary' ? 'bg-gradient-to-br from-[#c44569] to-[#a83551] p-2.5 rounded-xl shadow-lg' : ''}`}>
              <MapPin size={24} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} className={activeTab === 'itinerary' ? 'text-white' : ''} />
            </div>
            <span className="text-xs font-bold">行程</span>
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex flex-col items-center gap-1.5 p-2 w-24 transition-all ${activeTab === 'expenses' ? 'text-[#33691e] -translate-y-1' : 'text-stone-400'}`}
          >
            <div className={`${activeTab === 'expenses' ? 'bg-gradient-to-br from-[#558b2f] to-[#33691e] p-2.5 rounded-xl shadow-lg' : ''}`}>
              <Wallet size={24} strokeWidth={activeTab === 'expenses' ? 2.5 : 2} className={activeTab === 'expenses' ? 'text-white' : ''} />
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
  );
}
