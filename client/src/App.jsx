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
  <div className="flex items-center justify-center min-h-screen bg-[#F5F1E8]">
    <div className="text-center">
      <Loader className="animate-spin text-[#5A5A5A] mx-auto mb-4" size={40} />
      <p className="text-[#5A5A5A] font-medium text-sm">載入中...</p>
    </div>
  </div>
);

// --- Error Display Component ---
const ErrorDisplay = ({ message, onRetry }) => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-[#F5F1E8]">
    <div className="bg-white border border-[#E0E0E0] rounded-lg p-8 max-w-md text-center">
      <AlertCircle className="text-[#D32F2F] mx-auto mb-4" size={40} />
      <h3 className="text-base font-bold text-[#2C2C2C] mb-2">載入失敗</h3>
      <p className="text-[#5A5A5A] text-sm mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 mx-auto bg-[#2C2C2C] text-white px-6 py-2.5 rounded hover:bg-[#1A1A1A] transition-colors text-sm"
        >
          <RefreshCw size={14} /> 重試
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 print:hidden">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 relative border border-[#E0E0E0]">
        <div className="relative h-56 overflow-hidden group bg-[#F5F5F5]">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/90 text-[#2C2C2C] rounded-full hover:bg-white transition-all z-10 shadow-sm"
          >
            <X size={18} />
          </button>

          {/* Minimal overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-1.5">
               <span className="bg-white/95 text-[#2C2C2C] text-xs px-2.5 py-1 rounded font-medium">
                 {item.time}
               </span>
               {item.type === 'meal' && <span className="bg-[#FFB7C5]/90 text-white text-xs px-2.5 py-1 rounded font-medium">美食</span>}
            </div>
            <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
            {item.location && (
              <span className="text-white/90 text-xs flex items-center gap-1 mt-1.5">
                <MapPin size={12} /> {item.location}
              </span>
            )}
          </div>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-[#5A5A5A] leading-relaxed text-sm border-l-2 border-[#E0E0E0] pl-3">
            {item.desc || "暫無詳細介紹。"}
          </p>

          {item.type === 'transport' && item.detail && (
            <div className="bg-[#F9F9F9] p-4 rounded border border-[#E0E0E0]">
               <div className="flex items-center gap-2 text-[#2C2C2C] font-medium mb-2 pb-2 border-b border-[#E0E0E0] text-sm">
                  <Train size={16} /> 交通詳情
               </div>
               <div className="text-xs text-[#5A5A5A] whitespace-pre-line leading-relaxed">
                 {item.detail}
               </div>
               {item.duration && (
                 <div className="mt-3 flex items-center gap-1.5 text-xs text-[#5A5A5A] bg-white px-2.5 py-1.5 rounded w-fit border border-[#E0E0E0]">
                    <Clock size={12} /> {item.duration}
                 </div>
               )}
            </div>
          )}

          {item.type !== 'transport' && item.detail && (
             <div className="bg-[#F9F9F9] p-3 rounded border border-[#E0E0E0] text-xs text-[#5A5A5A] flex items-start gap-2">
                <div className="mt-0.5"><Users size={14} className="text-[#9E9E9E]" /></div>
                <span className="leading-relaxed">{item.detail}</span>
             </div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-[#E0E0E0]">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#2C2C2C] text-white py-2.5 rounded text-sm font-medium hover:bg-[#1A1A1A] transition-colors"
            >
              <Navigation size={16} />
              導航
            </a>
            <button
              onClick={() => { onClose(); onEdit(item); }}
              className="flex items-center justify-center gap-1.5 bg-white text-[#2C2C2C] border border-[#E0E0E0] py-2.5 rounded text-sm font-medium hover:bg-[#F9F9F9] transition-colors"
            >
              <Edit size={16} />
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 print:hidden">
      <div className="bg-white w-full sm:max-w-md sm:rounded-lg rounded-t-lg p-5 animate-in slide-in-from-bottom duration-200 border-t sm:border border-[#E0E0E0] max-h-[90vh] overflow-y-auto">
        <h3 className="text-base font-bold mb-4 text-[#2C2C2C] flex items-center gap-2 border-b border-[#E0E0E0] pb-3">
          {item.id ? <Edit size={20} className="text-[#5A5A5A]" /> : <Plus size={20} className="text-[#5A5A5A]" />}
          {item.id ? '編輯行程' : '新增行程'}
        </h3>

        <div className="space-y-4">
          {/* Image Upload Section */}
          <div>
            <label className="block text-xs font-medium text-[#5A5A5A] mb-2 flex items-center gap-1.5">
              <ImageIcon size={14} /> 圖片
            </label>
            <ImageUpload
              currentImage={formData.imageUrl}
              onImageChange={(imageData) => setFormData({...formData, imageUrl: imageData})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#2E5C8A] uppercase tracking-wider mb-2">標題</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 bg-white border-2 border-[#D4C4DD] rounded-xl focus:ring-2 focus:ring-[#FFB7C5] focus:border-[#FFB7C5] outline-none font-serif shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#2E5C8A] uppercase tracking-wider mb-2">時間</label>
              <input
                type="time"
                value={formData.time || '12:00'}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full p-3 bg-white border-2 border-[#D4C4DD] rounded-xl focus:ring-2 focus:ring-[#FFB7C5] outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E5C8A] uppercase tracking-wider mb-2">類型</label>
              <select
                value={formData.type || 'spot'}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full p-3 bg-white border-2 border-[#D4C4DD] rounded-xl focus:ring-2 focus:ring-[#FFB7C5] outline-none shadow-sm"
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
            <label className="block text-sm font-bold text-[#2E5C8A] uppercase tracking-wider mb-2">地點</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full p-3 bg-white border-2 border-[#D4C4DD] rounded-xl focus:ring-2 focus:ring-[#FFB7C5] outline-none shadow-sm"
              placeholder="地點名稱"
            />
          </div>

          <div>
             <label className="block text-sm font-bold text-[#2E5C8A] uppercase tracking-wider mb-2">詳細說明</label>
             <textarea
                value={formData.detail || ''}
                onChange={e => setFormData({...formData, detail: e.target.value})}
                className="w-full p-3 bg-white border-2 border-[#D4C4DD] rounded-xl h-24 text-sm focus:ring-2 focus:ring-[#FFB7C5] outline-none font-mono leading-relaxed shadow-sm"
                placeholder="輸入詳細交通方式、轉乘點或備註..."
              />
          </div>

          <div>
             <label className="block text-sm font-bold text-[#2E5C8A] uppercase tracking-wider mb-2">簡述</label>
             <textarea
                value={formData.desc || ''}
                onChange={e => setFormData({...formData, desc: e.target.value})}
                className="w-full p-3 bg-white border-2 border-[#D4C4DD] rounded-xl h-16 text-sm focus:ring-2 focus:ring-[#FFB7C5] outline-none shadow-sm"
                placeholder="簡單描述..."
              />
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t-2 border-[#D4C4DD]">
            {item.id && (
              <button
                onClick={() => onDelete(item.id)}
                disabled={saving}
                className="px-4 py-3 bg-gradient-to-r from-[#C9171E] to-[#E83828] text-white rounded-xl font-bold hover:from-[#A01318] hover:to-[#C02820] transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg"
              >
                <Trash2 size={16} /> 刪除
              </button>
            )}
            <button
              onClick={() => onSave(formData)}
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-[#2E5C8A] to-[#A99BBD] text-white py-3 rounded-xl font-bold hover:from-[#165E83] hover:to-[#8A7B9D] shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
              {saving ? '儲存中...' : '儲存'}
            </button>
            <button
              onClick={onClose}
              disabled={saving}
              className="px-6 py-3 bg-white text-[#2E5C8A] border-2 border-[#D4C4DD] rounded-xl font-bold hover:bg-[#FFF0F3] transition-colors disabled:opacity-50 shadow-sm"
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
  const [isEditingFund, setIsEditingFund] = useState(false);
  const [tempFundTotal, setTempFundTotal] = useState(publicFundTotal);

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
      const total = parseInt(response.data.value);
      setPublicFundTotal(total);
      setTempFundTotal(total);
    } catch (err) {
      console.log('Using default public fund total');
    }
  };

  // Save public fund total
  const savePublicFundTotal = async () => {
    try {
      await axios.post(`${API_URL}/settings/publicFundTotal`, { value: tempFundTotal });
      setPublicFundTotal(tempFundTotal);
      setIsEditingFund(false);
    } catch (err) {
      console.error('Error saving public fund total:', err);
      alert('儲存失敗：' + (err.response?.data?.error || '未知錯誤'));
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
      <div className="pb-20">
        {/* Print Button */}
        <div className="print:hidden sticky top-14 z-30 flex justify-end px-4 py-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-white border border-[#E0E0E0] text-[#2C2C2C] px-4 py-2 rounded text-xs font-medium hover:bg-[#F5F5F5] transition-colors"
          >
            <Printer size={14} />
            列印
          </button>
        </div>

        {/* Day Selector */}
        <div className="sticky top-14 z-40 bg-white border-b border-[#E0E0E0] overflow-x-auto no-scrollbar print:relative">
          <div className="flex px-4 py-2 gap-1.5 min-w-max">
            {days.map(d => (
              <button
                key={d.day}
                onClick={() => setCurrentDay(d.day)}
                className={`flex flex-col items-center px-4 py-2 rounded transition-all ${
                  currentDay === d.day
                  ? 'bg-[#2C2C2C] text-white'
                  : 'bg-[#F5F5F5] text-[#5A5A5A] hover:bg-[#EEEEEE]'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wide font-medium mb-0.5">
                  Day {d.day}
                </span>
                <span className="text-xs whitespace-nowrap">{d.date.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-6 max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#2C2C2C]">
                Day {currentDay}
              </h2>
               <span className="text-sm text-[#5A5A5A] block mt-0.5">
                {currentDayData.title}
              </span>
            </div>
            <button
              onClick={openAddModal}
              className="print:hidden flex items-center gap-1.5 bg-[#2C2C2C] text-white px-4 py-2 rounded text-xs font-medium hover:bg-[#1A1A1A] transition-colors"
            >
              <Plus size={14} /> 新增
            </button>
          </div>

          {/* Route Visualization Component */}
          <RouteVisualization items={currentDayData.items} />

          {/* Timeline */}
          <div className="relative space-y-3 mt-6">
            {/* Vertical Dashed Line */}
            <div className="absolute left-[18px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#E0DDD5] via-[#D0C9BA] to-[#E0DDD5] -z-10" style={{backgroundImage: 'repeating-linear-gradient(0deg, #D0C9BA, #D0C9BA 8px, transparent 8px, transparent 16px)'}}></div>

            {currentDayData.items.map((item, idx) => {
              const prevItem = idx > 0 ? currentDayData.items[idx-1] : null;
              const prevLocation = prevItem ? (prevItem.location || prevItem.title) : "";
              const itemWithPrev = { ...item, prevLocation };

              const isTransport = item.type === 'transport';
              const imageUrl = item.imageUrl || getFixedImage(item.id);

              return (
                <div key={item.id} className="relative pl-14 group">
                  {/* Timeline Dot & Time */}
                  <div className="absolute left-0 top-2 flex items-center gap-3 z-10">
                     <div className="w-9 h-9 rounded-full border-2 border-[#F5F1E8] bg-[#2C2C2C] shadow-md flex items-center justify-center">
                       <div className="text-[10px] leading-none text-white font-medium">{item.time.split(':')[0]}:{item.time.split(':')[1]}</div>
                     </div>
                  </div>

                  {/* Card */}
                  {isTransport ? (
                    <div
                      onClick={() => setDetailModalItem(itemWithPrev)}
                      className="relative bg-white rounded-lg p-3 border-l-4 border-[#8B7355] shadow-sm hover:shadow-md transition-all cursor-pointer ml-2"
                    >
                       <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8B7355] text-white">
                            <Train size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-[#2C2C2C] text-sm">{item.title}</div>
                            {item.duration && (
                              <div className="text-[10px] text-[#8B7355] mt-0.5">所需時間: {item.duration}</div>
                            )}
                          </div>
                       </div>
                       {item.detail && (
                         <div className="text-xs bg-[#FAF8F5] p-2.5 rounded text-[#5A5A5A] whitespace-pre-line leading-relaxed border border-[#E8E4DC]">
                            {item.detail.length > 80 ? item.detail.substring(0, 80) + '...' : item.detail}
                         </div>
                       )}
                       <div className="absolute -left-[2px] top-1/2 -translate-y-1/2 w-1 h-8 bg-[#8B7355]"></div>
                    </div>
                  ) : (
                    <div
                       onClick={() => setDetailModalItem(itemWithPrev)}
                       className="relative h-44 rounded overflow-hidden border border-[#E0E0E0] hover:border-[#9E9E9E] transition-all cursor-pointer bg-[#F5F5F5]"
                    >
                       <img
                         src={imageUrl}
                         alt={item.title}
                         className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                         loading="lazy"
                       />

                       {/* Minimal overlay */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                       <div className="absolute inset-0 p-4 flex flex-col justify-end">
                          <div className="flex justify-between items-end">
                             <div>
                                {item.type === 'meal' && (
                                   <span className="inline-block px-2 py-0.5 mb-1.5 bg-[#FFB7C5] text-white text-[10px] font-medium rounded">美食</span>
                                )}
                                <h3 className="text-base font-bold text-white leading-tight mb-1">
                                   {item.title}
                                </h3>
                                {item.location && (
                                  <div className="flex items-center gap-1 text-xs text-white/90">
                                     <MapPin size={10} /> {item.location}
                                  </div>
                                )}
                             </div>
                             <ChevronRight className="text-white/80 group-hover:translate-x-1 transition-transform" size={20} />
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center print:hidden">
               <button
                 onClick={openAddModal}
                 className="px-6 py-2.5 border border-dashed border-[#E0E0E0] rounded text-[#5A5A5A] hover:border-[#2C2C2C] hover:text-[#2C2C2C] hover:bg-[#F9F9F9] transition-all text-sm flex items-center justify-center gap-1.5 mx-auto"
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
    <div className="p-5 max-w-3xl mx-auto pb-28">
      {/* Print Button */}
      <div className="print:hidden flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gradient-to-r from-[#93AA6D] to-[#C5D8A4] text-white px-6 py-3 rounded-full font-bold hover:from-[#7A9154] hover:to-[#93AA6D] transition-all shadow-lg active:scale-95"
        >
          <Printer size={18} />
          列印費用明細
        </button>
      </div>

      <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-[#93AA6D] to-[#C5D8A4] bg-clip-text text-transparent flex items-center gap-2 font-serif">
        <Wallet className="text-[#93AA6D]" size={28} /> 旅費帳本
      </h2>

      {/* Flight Cost Input */}
      <div className="bg-white rounded-lg p-5 mb-4 border border-[#E0DDD5] shadow-sm print:hidden">
        <h3 className="font-bold text-[#2C2C2C] mb-4 flex items-center gap-2 text-base">
          <Plane size={18} /> 機票費用
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#5A5A5A] mb-2">每人機票價格 (JPY)</label>
            <input
              type="number"
              inputMode="decimal"
              value={flightCost}
              onChange={(e) => setFlightCost(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2.5 bg-white border border-[#E0E0E0] rounded text-base font-mono outline-none focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355]"
              placeholder="15000"
            />
          </div>
          <div className="flex items-end">
            <div className="bg-[#FAF8F5] p-3 rounded border border-[#E8E4DC] w-full">
              <div className="text-[10px] text-[#5A5A5A] font-medium mb-1">總機票費用</div>
              <div className="text-xl font-bold text-[#2C2C2C] font-mono">¥{totalFlightCost.toLocaleString()}</div>
              <div className="text-[10px] text-[#5A5A5A] mt-1">{INITIAL_PEOPLE.length} 人 × ¥{flightCost.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Accommodation Cost Input */}
      <div className="bg-white rounded-lg p-5 mb-4 border border-[#E0DDD5] shadow-sm print:hidden">
        <h3 className="font-bold text-[#2C2C2C] mb-4 flex items-center gap-2 text-base">
          <Home size={18} /> 住宿費用
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#5A5A5A] mb-2">每晚價格 (JPY)</label>
            <input
              type="number"
              inputMode="decimal"
              value={accommodationCostPerNight}
              onChange={(e) => setAccommodationCostPerNight(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2.5 bg-white border border-[#E0E0E0] rounded text-base font-mono outline-none focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355]"
              placeholder="3000"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#5A5A5A] mb-2">住宿天數</label>
            <input
              type="number"
              inputMode="decimal"
              value={numberOfNights}
              onChange={(e) => setNumberOfNights(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2.5 bg-white border border-[#E0E0E0] rounded text-base font-mono outline-none focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355]"
              placeholder="6"
            />
          </div>
          <div className="flex items-end">
            <div className="bg-[#FAF8F5] p-3 rounded border border-[#E8E4DC] w-full">
              <div className="text-[10px] text-[#5A5A5A] font-medium mb-1">總住宿費用</div>
              <div className="text-xl font-bold text-[#2C2C2C] font-mono">¥{totalAccommodationCost.toLocaleString()}</div>
              <div className="text-[10px] text-[#5A5A5A] mt-1">{numberOfNights} 晚 × ¥{accommodationCostPerNight.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grand Total Summary */}
      <div className="bg-gradient-to-br from-[#F39C6B] via-[#FFB997] to-[#FFB7C5] rounded-3xl p-8 text-white shadow-2xl mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-20"><DollarSign size={150} /></div>
        <div className="absolute -left-10 -bottom-10 opacity-10"><Wallet size={200} /></div>
        <div className="relative z-10">
          <p className="text-[#FFF8E7] text-sm font-bold tracking-wider mb-2">旅行總花費</p>
          <div className="text-5xl font-black font-mono mb-4">¥{grandTotal.toLocaleString()}</div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
              <div className="text-[#FFF8E7] text-xs font-bold mb-1">人均費用</div>
              <div className="text-3xl font-black">¥{Math.round(perPersonCost).toLocaleString()}</div>
              <div className="text-[#FFF8E7] text-xs mt-1">每人平均</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
              <div className="text-[#FFF8E7] text-xs font-bold mb-1">旅行人數</div>
              <div className="text-3xl font-black">{INITIAL_PEOPLE.length} 人</div>
              <div className="text-[#FFF8E7] text-xs mt-1">{INITIAL_PEOPLE.join(', ')}</div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mt-6 space-y-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/20">
            <div className="text-[#FFF8E7] text-sm font-bold mb-3 border-b border-white/30 pb-2">費用明細</div>
            <div className="flex justify-between text-sm">
              <span className="text-[#FFF8E7]">機票費用</span>
              <span className="font-mono font-bold">¥{totalFlightCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#FFF8E7]">住宿費用</span>
              <span className="font-mono font-bold">¥{totalAccommodationCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#FFF8E7]">其他支出</span>
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
      <div className="bg-white rounded-lg p-5 mb-4 border border-[#E0DDD5] shadow-sm print:hidden">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-[#2C2C2C] flex items-center gap-2 text-base">
            <Wallet size={18} /> 公積金餘額
          </h3>
          {!isEditingFund ? (
            <button
              onClick={() => setIsEditingFund(true)}
              className="text-xs text-[#8B7355] hover:text-[#2C2C2C] transition-colors flex items-center gap-1"
            >
              <Edit size={12} /> 設定
            </button>
          ) : null}
        </div>

        {isEditingFund ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#5A5A5A] mb-2">公積金總額 (JPY)</label>
              <input
                type="number"
                inputMode="decimal"
                value={tempFundTotal}
                onChange={(e) => setTempFundTotal(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2.5 bg-white border border-[#E0E0E0] rounded text-base font-mono outline-none focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355]"
                placeholder="150000"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={savePublicFundTotal}
                className="flex-1 bg-[#2C2C2C] text-white py-2 rounded text-sm font-medium hover:bg-[#1A1A1A] transition-colors"
              >
                儲存
              </button>
              <button
                onClick={() => { setIsEditingFund(false); setTempFundTotal(publicFundTotal); }}
                className="px-4 py-2 bg-white text-[#2C2C2C] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F9F9F9] transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold font-mono text-[#2C2C2C] mb-3">¥{remainingFund.toLocaleString()}</div>
            <div className="flex items-center gap-2 text-xs text-[#5A5A5A] mb-3">
              {remainingFund >= publicFundTotal * 0.5 ? (
                <><TrendingUp size={12} className="text-[#93AA6D]" /> <span className="text-[#93AA6D]">充足</span></>
              ) : remainingFund >= publicFundTotal * 0.2 ? (
                <><TrendingDown size={12} className="text-[#F39C6B]" /> <span className="text-[#F39C6B]">注意</span></>
              ) : (
                <><AlertCircle size={12} className="text-[#D32F2F]" /> <span className="text-[#D32F2F]">不足</span></>
              )}
            </div>
            <div className="h-2 bg-[#F5F1E8] rounded-full overflow-hidden">
               <div
                 style={{ width: `${100 - spentPercentage}%` }}
                 className={`h-full transition-all duration-500 ${
                   spentPercentage < 50 ? 'bg-[#93AA6D]' :
                   spentPercentage < 80 ? 'bg-[#F39C6B]' :
                   'bg-[#D32F2F]'
                 }`}
               />
            </div>
            <div className="flex justify-between text-[10px] mt-2 text-[#5A5A5A] font-mono">
               <span>已用: ¥{totalSpent.toLocaleString()} ({spentPercentage.toFixed(1)}%)</span>
               <span>總額: ¥{publicFundTotal.toLocaleString()}</span>
            </div>
          </>
        )}
      </div>

      {/* Add Expense Form */}
      <div className="print:hidden bg-white rounded-lg p-5 border border-[#E0DDD5] shadow-sm mb-6">
        <h3 className="font-bold text-[#2C2C2C] mb-4 flex items-center gap-2 text-base">
          <Plus size={18} /> 新增支出
        </h3>
        <div className="grid grid-cols-5 gap-3 mb-3">
           <div className="col-span-2">
             <select
               value={expenseForm.payer}
               onChange={(e) => setExpenseForm({...expenseForm, payer: e.target.value})}
               className="w-full px-3 py-2.5 bg-white border border-[#E0E0E0] rounded text-sm outline-none focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355]"
             >
               <option value="公積金">公積金</option>
               {INITIAL_PEOPLE.map(p => <option key={p} value={p}>{p}</option>)}
             </select>
           </div>
           <div className="col-span-3">
              <input
                type="number"
                inputMode="decimal"
                placeholder="金額 (JPY)"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                className="w-full px-3 py-2.5 bg-white border border-[#E0E0E0] rounded text-sm outline-none font-mono focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355]"
              />
           </div>
        </div>
        <div className="flex gap-2">
           <input
             type="text"
             placeholder="項目 (例: 章魚燒)"
             value={expenseForm.desc}
             onChange={(e) => setExpenseForm({...expenseForm, desc: e.target.value})}
             className="flex-1 px-3 py-2.5 bg-white border border-[#E0E0E0] rounded text-sm outline-none focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355]"
           />
           <button
             onClick={addExpense}
             className="bg-[#2C2C2C] text-white px-6 rounded font-medium text-sm hover:bg-[#1A1A1A] transition-colors flex items-center gap-2"
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

      <div className="min-h-screen bg-[#F5F1E8] font-['Noto_Sans_TC'] text-[#2C2C2C]">

        {/* Header */}
        <header className="bg-white border-b border-[#E0E0E0] sticky top-0 z-50 print:relative">
          <div className="max-w-4xl mx-auto px-5 py-3 flex justify-between items-center">
             <div>
               <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                 京阪奈 <span className="text-[#9E9E9E] font-normal text-base">冬之旅</span>
               </h1>
               <div className="text-[10px] text-[#9E9E9E] mt-0.5 tracking-wide">Kyoto Osaka Nara | Jan 6-12</div>
             </div>
             <div className="text-xs text-[#5A5A5A] bg-[#F5F5F5] px-3 py-1.5 rounded">
               <span className="font-medium">{days.length}</span> 天
             </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="animate-in fade-in duration-500">
          {activeTab === 'itinerary' ? <ItineraryView /> : <ExpenseView />}
        </main>

        {/* Bottom Navigation */}
        <nav className="print:hidden fixed bottom-0 w-full bg-white border-t border-[#E0E0E0] px-4 py-2 pb-safe z-50">
          <div className="max-w-md mx-auto flex justify-around items-center">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`flex flex-col items-center gap-1 py-2 px-6 transition-all ${activeTab === 'itinerary' ? 'text-[#2C2C2C]' : 'text-[#9E9E9E]'}`}
            >
              <MapPin size={22} strokeWidth={activeTab === 'itinerary' ? 2 : 1.5} />
              <span className="text-[10px] font-medium">行程</span>
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`flex flex-col items-center gap-1 py-2 px-6 transition-all ${activeTab === 'expenses' ? 'text-[#2C2C2C]' : 'text-[#9E9E9E]'}`}
            >
              <Wallet size={22} strokeWidth={activeTab === 'expenses' ? 2 : 1.5} />
              <span className="text-[10px] font-medium">費用</span>
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
